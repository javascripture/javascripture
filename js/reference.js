var reference;
( function ( $ ) {
	$.fn.scrollStopped = function(callback) {
	    $(this).scroll( function () {
	        var self = this, $this = $(self);
	        if ($this.data('scrollTimeout')) {
	          clearTimeout($this.data('scrollTimeout'));
	        }
	        $this.data('scrollTimeout', setTimeout(callback,250,self));
	    });
	};

	reference = {
		load: function( reference ) {
			var book = reference.book,
			    chapter = reference.chapter,
			    verse = reference.verse;

			if ( 'undefined' == typeof verse ) {
				reference.verse = 1;				
			}

			$('head title').text(book + ' ' + (chapter) + ':' + (verse));
	
			var $threeChapters = $('<div class="three-references" />'),
				prev = getOffsetChapter( reference, -1 ),
				next = getOffsetChapter( reference, 1 );

			//add the previous chapter if it exists
			if ( prev.book ) {
				$threeChapters.data( 'prev', prev );
				$threeChapters.append( getChapterText( prev ) );				
			}
			
			$threeChapters.append( getChapterText( reference ) );
			
			//add the next chapter if it exists
			if ( next.book ) {
				$threeChapters.data( 'next', next );
				$threeChapters.append( getChapterText( next ) );
			}

			if ( $.fn.waypoint ) {
				$('.reference').waypoint('destroy');				
			}

			$('#verse').html( $threeChapters );
	
			maintainState(book,chapter,verse);

			return this; //makes it chainable

		},
		scrollToVerse: function ( verse, offset ) {
			if ( undefined === offset ) {
				offset = 0;
			}
			$('body').scrollTop(0);
			offset = offset - $('.dock').height();
			if(verse.length > 0) {
//				$('#verse').closest('.panel').scrollTop(verse.offset().top - $('.dock').height() - $('h1').height() );
				$('body').scrollTo( verse, { offset: offset } );
			}
			
			$( document ).trigger( 'createWayPoint' );				
		},
		getAnchoringData: function ( direction ) {
			//anchor to current verse
			var anchorPointSelector = '#current',
				offset = 0,
				$bodyOffset = $('body').scrollTop(),
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
				offset = $bodyOffset - $anchorVerse.offset().top + $('.dock').height();
			}

			return [offset, anchorPointSelector];
		},
		anchorReference: function ( anchoringData ) {

			var anchorPointSelector = anchoringData[1],
			    offset = anchoringData[0],
			    $anchorPoint = $( anchorPointSelector );

			if ( anchorPointSelector === '.current-verse' ) {
				verseHeight = $anchorPoint.height(),
				offset = -$(window).height() / 2 + verseHeight;				
			}

			//anchor to a chapter
			if ( $anchorPoint.length === 0 ) {
				$anchorPoint = $( '#' + jsonCollection.currentId );
				offset = - $('[data-role=header]').height();// - 10;
			}
			
			this.scrollToVerse( $anchorPoint, offset );
		},
		getFamily: function ( strongsNumber ) {
			if ( strongsObjectWithFamilies[ strongsNumber ] ) {
				return strongsObjectWithFamilies[ strongsNumber ].family;
			} else {
				return strongsNumber;
			}
		}
	};
	
	function getChapterText ( reference ) {
		var book = reference.book,
		    chapter = reference.chapter,
		    verse = reference.verse,
			chapterInArray = chapter - 1,
			verseInArray = verse - 1,
			context = false;

		var chapterText = '<div class="reference frequencyAnalysis" data-book="' + book + '" data-chapter="' + chapter + '"><h1>' + book + ' ' + chapter + '</h1>';
		chapterText += '<ol class="wrapper">';
	
		var originalText, language;
		if( javascripture.data.hebrew[book] ) {
			originalText = javascripture.data.hebrew;
			language = 'hebrew';
		} else {
			originalText = javascripture.data.greek;
			language = 'greek';
		}

		$.each( javascripture.data.kjv[book][chapterInArray], function(verseNumber, verseText ) {
			chapterText += '<li id="' + book.replace( / /gi, '_' ) + '_' + chapter + '_' + ( verseNumber + 1 ) + '" data-verse="' + ( verseNumber + 1 ) + '">';
			chapterText += '<div class="wrapper"';
			if(verseNumber === verseInArray) {
				chapterText += ' id="current"';
			}
			if(verseNumber === verseInArray-5) {
				chapterText += ' id="context"';
				context = true;
			}
			chapterText += '>';
			chapterText += '<div class="english">';
				$.each( javascripture.data.kjv[book][chapterInArray][verseNumber], function( wordNumber, wordObject ) {
					if ( wordObject ) {
						chapterText += createWordString( wordObject, language );
					}
				});
			chapterText += "</div>";

			//Load hebrew
			if(originalText[book] && originalText[book][chapterInArray][verseNumber]) {
				chapterText += "<div class='original " + language + "'>";
				$.each( originalText[book][chapterInArray][verseNumber], function( wordNumber, wordObject ) {
					chapterText += createWordString( wordObject, language );
				});
				chapterText += "</div>";
			}
			chapterText += '</div>';
			chapterText += '</li>';
		});
	
		chapterText += '</ol>';
		chapterText += '</div>';
		return chapterText;
	}
	
	function createWordString( wordArray, language ) {
		var self = this,
		    wordString = '',
		    families = [],
		    lemma = wordArray[ 1 ];
		if ( lemma ) {
			lemmaArray = lemma.split( ' ' );
			$.each( lemmaArray, function( key, lemmaValue ) {
				families.push( reference.getFamily( lemmaValue ) );
			} );
		}
		wordString += '<span'; 
		wordString += ' class="' + families.join( ' ' ) + '"';
		wordString += ' title="' + lemma;
		if ( wordArray[2] ) {
			wordString += ' ' + wordArray[2];
		}
		wordString += '"';
		wordString += ' data-word="' + wordArray[0] + '"';
		wordString += ' data-lemma="' + wordArray[1] + '"';
		wordString += ' data-language="' + language + '"';
		wordString += ' data-range="verse"';
		wordString += ' data-family="' + families.join( ' ' ) + '"';
		if ( wordArray[2] ) {
			wordString += ' data-morph="' + wordArray[2] + '"';
		}
		wordString += '>' + wordArray[0] + '</span> ';
		return wordString;
	}
	
	function getOffsetChapter( reference, offset) {
		var book = reference.book,
		    chapter = reference.chapter,
		    offsetChapter = {},
			offsetChapterNumber = parseInt(chapter, 10) + offset,
			offsetNumberJavascript = offsetChapterNumber - 1,
			offsetBook;
		if (javascripture.data.kjv[book] && javascripture.data.kjv[book][offsetNumberJavascript] !== undefined) {
			offsetChapter.book = book;
			offsetChapter.chapter = offsetChapterNumber;
		} else {
			//get the offset book
			$.each(bible.Data.books, function (index, loopBookArray) {
				if (loopBookArray[0] === book) {
					offsetBook = index + offset;
					if (bible.Data.books[offsetBook] !== undefined) {
						offsetChapter.book = bible.Data.books[offsetBook][0];
						//only supports offsets of 1 or -1. to make it work with bigger values this will have to change
						if (offset > 0) {
							offsetChapter.chapter = 1;
						} else {
							offsetChapter.chapter = bible.Data.verses[offsetBook].length;
						}
					}
				}
			});
		}
		return offsetChapter;
	}

	function loadReferenceFromHash() {
	    var hash = window.location.hash;
	    if(hash.indexOf('search') > -1){
	        var word = hash.split('=')[1];
	        searchByStrongsNumber(word);
	    } else {
	        var parameterPairArray = hash.split('&');
	        //this is bad
	        if ( parameterPairArray.length > 1 ) {
				var book = parameterPairArray[0].split('=')[1];
		        var chapter = parseInt(parameterPairArray[1].split('=')[1], 10);
		        var verse = 1;
		        if ( parameterPairArray[2] ) {
		            verse = parseInt(parameterPairArray[2].split('=')[1], 10);
		        }
		        reference.load( {
			        book: book,
			        chapter: chapter,
			        verse: verse
		        } ).scrollToVerse($('#current'));
	        }
	    }
	}
	loadReferenceFromHash();

	$(window).bind( 'hashchange', function(e) {
	    var startDate = new Date();
	    loadReferenceFromHash();
	    var endDate = new Date();
	    timer(startDate, endDate);
	});
	
	$( window ).scrollStopped( function() {
		var scrollTop = $( 'body' ).scrollTop(),
		    verseHeight = $( '.referencePanel' ).height() - $( window ).height() + $( '.dock' ).height(),
		    anchoringData;
		if ( scrollTop <= 0 ) {
			console.log('prev');
			var prev = $( '.three-references' ).data( 'prev' );
			anchoringData = reference.getAnchoringData( 'prev' );
			reference.load( prev ).anchorReference( anchoringData );
		}
		if ( scrollTop >= verseHeight ) {
			console.log('next');
			var next = $( '.three-references' ).data( 'next' );
			anchoringData = reference.getAnchoringData( 'next' );
			reference.load( next ).anchorReference( anchoringData );
		}
	});
	
	$('.goToReference').submit(function (event) {
		event.preventDefault();
		console.log($('#goToReference').val());
		var reference = bible.parseReference( $('#goToReference').val() );

		var hash = 'book=' + bible.Data.books[reference.bookID - 1][0] + '&chapter=' + reference.chapter + '&verse=' + reference.verse;
		console.log(hash);
		window.location.hash = hash;
		$( this ).closest( '.popup' ).popup( 'close' );
		return false;
	});

} )( jQuery );