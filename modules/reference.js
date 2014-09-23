javascripture.modules.reference = {
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
//			reference.rightVersion = 'kjv'; // Backup
			if ( localStorage.rightVersion ) {
				reference.rightVersion = localStorage.rightVersion;
			}
		}

		reference.leftVersion = $('#versionSelectorLeft').val();


		if ( reference.leftVersion === 'original' ) {
//			reference.leftVersion = 'hebrew'; // Backup
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
			if ( $anchorVerse.length ) {
				offset = $bodyOffset - $anchorVerse.offset().top + $('#dock').height();
			} else {
				offset = $bodyOffset + $('#dock').height();
			}
		}

		return [offset, anchorPointSelector];
	},
	anchorReference: function ( anchoringData ) {
		var anchorPointSelector = anchoringData[1],
			offset = anchoringData[0],
			$anchorPoint = $( anchorPointSelector ),
			verseHeight;

		if ( anchorPointSelector === '.current-verse' ) {
			verseHeight = $anchorPoint.height();
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
			reference.book = hashArray[0].split('=')[1];
			reference.chapter = parseInt(hashArray[1].split('=')[1], 10);
			reference.verse = 1;
			if ( hashArray[2] ) {
				reference.verse = parseInt(hashArray[2].split('=')[1], 10);
			}
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
	getChapterText: function ( result, reference, chapterData ) {
		var self = this,
			book = reference.book,
			chapter = reference.chapter,
			verse = reference.verse,
			chapterInArray = chapter - 1,
			verseInArray = verse - 1,
			context = false;

		var chapterText = '<div class="reference frequencyAnalysis" data-book="' + book + '" data-chapter="' + chapter + '"><h1>' + book + ' ' + chapter + '</h1>';
		chapterText += '<ol class="wrapper">';

		if ( chapterData && chapterData.right ) {
			chapterData.right.forEach( function( verseText, verseNumber ) {
				chapterText += self.getVerseString( result, reference, chapterData, book, chapter, verseText, verseNumber, verseInArray );
			});
		}

		chapterText += '</ol>';
		chapterText += '</div>';
		return chapterText;
	},
	getVerseString: function( result, reference, chapterData, book, chapter, verseText, verseNumber, verseInArray ) {
		var self = this,
			chapterText = '';
		chapterText += '<li id="' + book.replace( / /gi, '_' ) + '_' + chapter + '_' + ( verseNumber + 1 ) + '"';
		if ( verseNumber === verseInArray ) {
			chapterText += ' class="current"';
		}
		chapterText += 'data-verse="' + ( verseNumber + 1 ) + '">';
		chapterText += '<div class="wrapper"';
		if ( verseNumber === verseInArray ) {
			chapterText += ' id="current"';
		}
		if ( verseNumber === verseInArray-5 ) {
			chapterText += ' id="context"';
			context = true;
		}
		chapterText += '>';
		chapterText += '<div class="right ' + result.rightVersion + ' ' + result.testament + '">';
			chapterData.right[verseNumber].forEach( function( wordObject, wordNumber ) {
				if ( wordObject ) {
					chapterText += self.createWordString( wordObject, result.testament, result.rightVersion );
				}
			});
		chapterText += "</div>";

		//Load left
		if(	chapterData.left && chapterData.left[verseNumber] ) {
			chapterText += "<div class='left " + result.leftVersion + ' ' + result.testament + "'>";
			chapterData.left[verseNumber].forEach( function( wordObject, wordNumber ) {
				if ( wordObject ) {
					chapterText += self.createWordString( wordObject, result.testament, result.leftVersion );
				}
			});
			chapterText += "</div>";
		}
		chapterText += '</div>';
		chapterText += '</li>';
		return chapterText;
	},
	createWordString: function ( wordArray, testament, version ) {
		var self = this,
			wordString = '',
			families = [],
			wordDisplay,// = wordArray[0].replace(/\//g, ''),
			lemma,
			lemmaString = '';
		if ( typeof wordArray[ 1 ] === 'undefined' ) {
			return '<span>' + wordArray[0] + '</span> ';
		}

		// Don't split out words for english
		if ( version === 'original' || version === 'lc' ) {
			wordDisplayArray = wordArray[0].split( /\//g );
		} else {
			wordDisplayArray = [ wordArray[0] ];
		}

		lemma = wordArray[1].split( /\//g );
		morph = [];
		if ( wordArray[2] ) {
			morph = wordArray[2].split( / |\//g );
		}
		wordDisplayArray.forEach( function( wordDisplay, key ) {
			families = [];
			var morphLanguage = '';
			var lemmaValue, morphValue;
			if ( lemma && lemma[ key ] ) {
				lemmaValue = lemma[ key ];
				// Add families
				families.push( javascripture.api.word.getFamily( lemmaValue ) );
			}

			wordString += '<span';
			wordString += ' class="' + families.join( ' ' ) + '-family ' + lemmaValue + ' searchable' + '"';
			wordString += ' title="' + lemmaValue;
			if ( morph ) {
				wordString += ' ' + morph;
			}
			wordString += '"';
			wordString += ' data-word="' + wordDisplay + '"';
			if ( lemmaValue ) {
				wordString += ' data-lemma="' + lemmaValue + '"';
			}
			wordString += ' data-language="' + testament + '"';
			wordString += ' data-range="verse"';
			wordString += ' data-family="' + families.join( ' ' ) + '"';
			if ( morph && 'undefined' !== typeof morph[ key ] ) {
				if ( testament === 'hebrew' && ( version === 'original' || version === 'lc' ) && 'H' !== morph[ key ].charAt(0) ) {
					morphLanguage = 'H';
				}
				morphValue = morphLanguage + morph[ key ].replace( /\-/g, '');
				wordString += ' data-morph="' + morphValue + '"';
			}
			wordString += '>';

			if ( version === 'lc' ) {
				wordString += javascripture.modules.translateLiterally.getByLemmaAndMorph( lemmaValue, morphValue );
			} else {
				wordString += wordDisplay;
			}
			wordString += '</span>';
			if ( version === 'lc' ) {
				wordString += ' ';
			}
		} );
		return '<span class="word">' + wordString + '</span> ';
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
		var startDate = new Date();
		javascripture.modules.reference.loadReferenceFromHash();
		var endDate = new Date();
		timer(startDate, endDate);
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
				chapterText += javascripture.modules.reference.getChapterText( e.data.result, e.data.result.prev, e.data.result.chapters[0] );
				chapterText += javascripture.modules.reference.getChapterText( e.data.result, reference, e.data.result.chapters[1] );
				if ( e.data.result.next ) {
					chapterText += javascripture.modules.reference.getChapterText( e.data.result, e.data.result.next, e.data.result.chapters[2] );
				}
			} else {
				chapterText += javascripture.modules.reference.getChapterText( e.data.result, reference, e.data.result.chapters[0] );
				if ( e.data.result.next ) {
					chapterText += javascripture.modules.reference.getChapterText( e.data.result, e.data.result.next, e.data.result.chapters[1] );
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
		}
	} );

	worker.addEventListener('message', function(e) {
		if( e.data.task === 'loading' ) {
			$( '.loading' ).html( e.data.html );
		}
	} );

} )( jQuery );