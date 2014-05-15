/*globals Backbone javascripture, bible, worker, _ */

var WordModel = Backbone.Model.extend( {

} );


var WordView = Backbone.View.extend({

	model: WordModel,

	tagName: "span",

	template: _.template( $("#word-template").html() ),

	render: function( wordArray, language, testament, version ) {
		var self = this,
		    wordString = '',
		    families = [];

		lemma = wordArray[ 1 ];
		if ( lemma ) {
			lemmaArray = lemma.split( ' ' );
			lemmaArray.forEach( function( lemmaValue, key ) {
				families.push( javascripture.api.word.getFamily( lemmaValue ) );
			} );
		}
		wordDisplay = wordArray[0];
		if ( version === 'lc' && language === 'english' ) {
			wordDisplay += javascripture.modules.translateLiterally.getWord( wordArray );
		}

		var familyClass = '',
		    className = '';
		if ( families.length > 0 ) {
			familyClass = families.join( ' ' ) + '-family';
			className += families.join( ' ' ) + '-family';
		}
		if ( lemma ) {
			className += ' ' + lemma;
		}

		return this.template( {
			className: className,
			families: familyClass,
			lemma: lemma,
			morph: wordArray[2],
			word: wordArray[0],
			wordDisplay: wordDisplay,
			testament: testament,
			range: 'verse'
		} );
	}

});

javascripture.modules.reference = {
	wordTemplate: _.template( $("#word-template").html() ),
	verseTemplate: _.template( $("#verse-template").html() ),
	chapterTemplate: _.template( $("#chapter-template").html() ),
	load: function( reference ) {
		var self = this,
		    book = reference.book,
		    chapter = reference.chapter,
		    verse = reference.verse;

		if ( 'undefined' == typeof verse ) {
			reference.verse = 1;
		}

		reference.rightVersion = $('#versionSelectorRight').val();
		if ( reference.rightVersion === 'original' ) {
			reference.rightVersion = 'kjv'; // Backup
			if ( localStorage.rightVersion ) {
				reference.rightVersion = localStorage.rightVersion;
			}
		}

		reference.leftVersion = $('#versionSelectorLeft').val();
		if ( reference.leftVersion === 'original' ) {
			reference.leftVersion = 'kjv'; // Backup
			if ( localStorage.leftVersion ) {
				reference.leftVersion = localStorage.leftVersion;
			}
		}

		worker.postMessage( {
			task: 'reference',
			parameters: reference
		} ); // Send data to our worker.

		return this; //makes it chainable

	},
	scrollToVerse: function ( verse, offset ) {
		if ( undefined === offset ) {
			offset = 0;
		}
		$( document ).scrollTop( 0 );
		offset = offset - $('#dock').height();

		//there must be a better way to do this, but the problem is that the top animation hasn't happened by this point
		if ( $( 'html' ).hasClass( 'reading-mode' ) ) {
			offset = offset - 50;
		}

		if(verse.length > 0) {
//				$('#verse').closest('.panel').scrollTop(verse.offset().top - $('.dock').height() - $('h1').height() );
			$( document ).scrollTo( verse, { offset: offset } );
		}

		$( document ).trigger( 'createWayPoint' );
	},
	getAnchoringData: function ( direction ) {
		//anchor to current verse
		var anchorPointSelector = '#current',
			offset = 0,
			$bodyOffset = $( document ).scrollTop(),
			$anchorVerse;

		//anchor to scrollstop point
		if ( direction ) {
			if ( direction === 'prev' ) {
				$anchorVerse = $('.reference:first-child ol.wrapper li:first-child');
			}

			if ( direction === 'next' ) {
				$anchorVerse = $('.reference:last-child ol.wrapper li:last-child');
			}
			anchorPointSelector = '#' + $anchorVerse.attr('id');
			offset = $bodyOffset - $anchorVerse.offset().top + $('#dock').height();
		}

		return [offset, anchorPointSelector];
	},
	anchorReference: function ( anchoringData ) {
		var anchorPointSelector = anchoringData[1],
		    offset = anchoringData[0],
		    $anchorPoint = $( anchorPointSelector ),
		    verseHeight;

		if ( anchorPointSelector === '.current-verse' ) {
			verseHeight = $anchorPoint.height(),
			offset = -$(window).height() / 2 + verseHeight;
		}

		//anchor to a chapter
		if ( $anchorPoint.length === 0 ) {
			$anchorPoint = $( '#' + anchoringData.currentId );
			offset = - $('[data-role=header]').height();// - 10;
		}

		this.scrollToVerse( $anchorPoint, offset );
	},
	getReferenceFromCurrentUrl: function () {
		return this.getReferenceFromUrl( window.location.hash );
	},
	getReferenceFromUrl: function ( url ) {
		var hashArray = url.split('&'),
			reference = {};

		if ( hashArray.length > 1 ) {
			reference.book = hashArray[0].split('=')[1],
			reference.chapter = parseInt(hashArray[1].split('=')[1], 10),
			reference.verse = 1;
	        if ( hashArray[2] )
	            reference.verse = parseInt(hashArray[2].split('=')[1], 10);
		}
		return reference;
	},
	loadReferenceFromHash: function () {
	    var hash = window.location.hash;
	    if( hash.indexOf( 'search' ) > -1 ) {
	        var word = hash.split( '=' )[ 1 ];
	        setTimeout( function () {
		        createSearchReferencesPanel( { lemma: word } );
		    } );
	    } else if( hash.indexOf( 'reference' ) > -1 ) {
	        var referenceObject = this.getReferenceFromHash();
			if ( localStorage ) {
				localStorage.reference = JSON.stringify( referenceObject );
			}
			referenceObject.anchoringData = javascripture.modules.reference.getAnchoringData( null );
			javascripture.modules.reference.load( referenceObject );
	    }
	},
	getReferenceFromHash: function () {
		var reference = window.location.hash.split( '=' )[1].split(':'),
		    book = reference[0],
		    chapter = parseInt(reference[1], 10),
		    verse = 1;
	    if ( reference[2] ) {
	        verse = parseInt(reference[2], 10);
	    }
		return { book: book, chapter: chapter, verse: verse };
	},
	createReferenceLink: function( reference ) {
		return 'reference=' + reference.book + ':' + reference.chapter + ':' + reference.verse;
	},
	getChapterText: function ( reference, chapterData, testament ) {
		var self = this,
		    book = reference.book,
		    chapter = reference.chapter,
		    verse = reference.verse,
			chapterInArray = chapter - 1,
			verseInArray = verse - 1,
			context = false,
			verses = '';

		if ( chapterData && chapterData.right ) {
			chapterData.right.forEach( function( verseText, verseNumber ) {
				verses += self.getVerseString( reference, chapterData, verseText, verseNumber, verseInArray, testament );
			});
		}

		return this.chapterTemplate( {
			book: book,
			chapter: chapter,
			verses: verses
		} );

	},
	getVerseString: function( reference, chapterData, verseText, verseNumber, verseInArray, testament ) {
		var self = this,
		    className = '',
		    wrapperId = '',
		    rightString = '',
		    leftString = '';
//		chapterText += '<li id="' + reference.book.replace( / /gi, '_' ) + '_' + reference.chapter + '_' + ( verseNumber + 1 ) + '"';
		if(verseNumber === verseInArray) {
			className = 'current';
		}
		if(verseNumber === verseInArray) {
			wrapperId = 'current';
		}
		if(verseNumber === verseInArray-5) {
			wrapperId = 'context';
			context = true;
		}
		if ( reference.rightVersion === 'lc' ) {
			//same as below
			chapterData.left[verseNumber].forEach( function( wordObject, wordNumber ) {
				if ( wordObject ) {
					rightString += self.createWordString( wordObject, 'english', testament, reference.rightVersion );
				}
			});
		} else {
			chapterData.right[verseNumber].forEach( function( wordObject, wordNumber ) {
				if ( wordObject ) {
					rightString += self.createWordString( wordObject, 'english', testament, reference.rightVersion );
				}
			});
		}

		//Load hebrew
		if(	chapterData.left[verseNumber] ) {
			chapterData.left[verseNumber].forEach( function( wordObject, wordNumber ) {
				if ( wordObject ) {
					leftString += self.createWordString( wordObject, testament, testament );
				}
			});
		}

		return this.verseTemplate( {
			verseId: reference.book.replace( / /gi, '_' ) + '_' + reference.chapter + '_' + ( verseNumber + 1 ),
			wrapperId: wrapperId,
			className: className,
			verseNumber: verseNumber,
			rightString: rightString,
			testament: testament,
			leftString: leftString
		} );
	},
	createWordString: function ( wordArray, language, testament, version ) {
		var word = new WordModel( {
			word: wordArray[0],
			lemma: wordArray[ 1 ],
			morph: wordArray[2]
		} );
		var wordView = new WordView( {
			model: word
		} );
		return wordView.render( wordArray, language, testament, version );
	}
};


/*globals javascripture*/
;( function ( $ ) {
	var english = javascripture.data.english;
	$.fn.scrollStopped = function(callback) {
	    $(this).scroll( function () {
	        var self = this, $this = $(self);
	        if ($this.data('scrollTimeout')) {
	          clearTimeout($this.data('scrollTimeout'));
	        }
	        $this.data('scrollTimeout', setTimeout(callback,250,self));
	    });
	};

	javascripture.modules.reference.loadReferenceFromHash();

	$(window).bind( 'hashchange', function() {
	    startDate = new Date();
	    javascripture.modules.reference.loadReferenceFromHash();
	});

	$( window ).scrollStopped( function() {
		var scrollTop = $( document ).scrollTop(),
			verseHeight = $( '.referencePanel' ).height() - $( window ).height(),// + $( '.dock' ).height(),
			anchoringData;
		if ( scrollTop <= 0 ) {
			var prev = $( '.three-references' ).data( 'prev' );
			if ( prev ) {
				prev.anchoringData = javascripture.modules.reference.getAnchoringData( 'prev' );
				javascripture.modules.reference.load( prev );
			}
		}
		if ( scrollTop >= verseHeight ) {
			var next = $( '.three-references' ).data( 'next' );
			if ( next ) {
				next.anchoringData = javascripture.modules.reference.getAnchoringData( 'next' );
				javascripture.modules.reference.load( next );
			}
		}
	});

	$('.goToReference').submit(function (event) {
		event.preventDefault();
		var reference = bible.parseReference( $('#goToReference').val() ),
			referenceObject = {
				book: bible.Data.books[reference.bookID - 1][0],
				chapter: reference.chapter,
				verse: reference.verse
			};
		var hash = javascripture.modules.reference.createReferenceLink( referenceObject );
		window.location.hash = hash;
		$( this ).closest( '.popup' ).popup( 'close' );
		$('#goToReference').blur();
		if ( $( 'html' ).hasClass( 'reading-mode' ) ) {
			hideDock();
		}
		return false;
	});

	worker.addEventListener('message', function(e) {
		if( e.data.task === 'reference' ) {
			var reference = e.data.result.reference;

			var chapterText = '<div class="three-references"';

			if ( e.data.result.prev ) {
				chapterText += ' data-prev=\'' + JSON.stringify( e.data.result.prev ) + '\'';
			}
			if ( e.data.result.next ) {
				chapterText += ' data-next=\'' + JSON.stringify( e.data.result.next ) + '\'';
			}
			chapterText += '>';

			// This is a bit messy
			if ( e.data.result.prev ) {
				chapterText += javascripture.modules.reference.getChapterText( e.data.result.prev, e.data.result.chapters[0], e.data.result.testament );
				chapterText += javascripture.modules.reference.getChapterText( reference, e.data.result.chapters[1], e.data.result.testament );
				if ( e.data.result.next ) {
					chapterText += javascripture.modules.reference.getChapterText( e.data.result.next, e.data.result.chapters[2], e.data.result.testament );
				}
			} else {
				chapterText += javascripture.modules.reference.getChapterText( reference, e.data.result.chapters[0], e.data.result.testament );
				if ( e.data.result.next ) {
					chapterText += javascripture.modules.reference.getChapterText( e.data.result.next, e.data.result.chapters[1], e.data.result.testament );
				}
			}

			chapterText += '</div>';

			$('#verse').html( chapterText );

			var title = reference.book;
			if ( typeof reference.chapter !== 'undefined' ) {
				title += ' ' + reference.chapter;
			}

			if ( typeof reference.verse !== 'undefined' ) {
				title += ':' + reference.verse;
			}

			$( 'head title' ).text( title );

			if ( $.fn.waypoint ) {
				$('.reference').waypoint('destroy');
			}
			javascripture.modules.reference.anchorReference( e.data.parameters.anchoringData );
			maintainState( reference );
			var endDate = new Date();
			timer(startDate, endDate);
		}
	} );

	worker.addEventListener('message', function(e) {
		if( e.data.task === 'loading' ) {
			$( '.loading' ).html( e.data.html );
		}
	} );

} )( jQuery );