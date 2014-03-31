/*globals javascripture bible*/
javascripture.api.reference = {
	getThreeChapters: function( reference ) {
		var self = this,
		    book = reference.book,
		    chapter = reference.chapter,
		    verse = reference.verse,
			prev = self.getOffsetChapter( reference, -1 ),
			next = self.getOffsetChapter( reference, 1 ),
		    threeChapters = '<div class="three-references"';

		if ( prev.book ) {
			threeChapters += ' data-prev=\'' + JSON.stringify( prev ) + '\'';
		}
		if ( next.book ) {
			threeChapters += ' data-next=\'' + JSON.stringify( next ) + '\'';
		}
		threeChapters += '>';

		//add the previous chapter if it exists
		if ( prev.book ) {
//			$threeChapters.data( 'prev', prev );
//			$threeChapters.append( javascripture.api.reference.getChapterText( prev ) );
			threeChapters += javascripture.api.reference.getChapterText( prev );
		}

		//$threeChapters.append( javascripture.api.reference.getChapterText( reference ) );
		threeChapters += javascripture.api.reference.getChapterText( reference );

		//add the next chapter if it exists
		if ( next.book ) {
//			$threeChapters.data( 'next', next );
			threeChapters += javascripture.api.reference.getChapterText( next );
		}
		threeChapters += '</div>';
		return threeChapters;
	},
	getChapterData: function( reference ) {
		var self = this,
		    book = reference.book,
		    chapter = reference.chapter,
		    verse = reference.verse,
			chapterInArray = chapter - 1,
			result = {};

		if( javascripture.data.hebrew[book] ) {
			testament = 'hebrew';
		} else {
			testament = 'greek';
		}

		if ( javascripture.data[reference.version][book][chapterInArray] ) {
			 result.translation = javascripture.data[reference.version][book][chapterInArray];
			 if( javascripture.data[testament][book] && javascripture.data[testament][book][chapterInArray] ) {
			 	result.original = javascripture.data[testament][book][chapterInArray];
			 }
		}
		return result;
	},
	getChapterText: function ( reference ) {
		var self = this,
		    book = reference.book,
		    chapter = reference.chapter,
		    verse = reference.verse,
			chapterInArray = chapter - 1,
			verseInArray = verse - 1,
			context = false;

		var chapterText = '<div class="reference frequencyAnalysis" data-book="' + book + '" data-chapter="' + chapter + '"><h1>' + book + ' ' + chapter + '</h1>';
		chapterText += '<ol class="wrapper">';

		if( javascripture.data.hebrew[book] ) {
			testament = 'hebrew';
		} else {
			testament = 'greek';
		}

		var chapterData = self.getChapterData( reference );

		if ( chapterData.translation ) {
			chapterData.translation.forEach( function( verseText, verseNumber ) {
				chapterText += '<li id="' + book.replace( / /gi, '_' ) + '_' + chapter + '_' + ( verseNumber + 1 ) + '"';
				if(verseNumber === verseInArray) {
					chapterText += ' class="current"';
				}
				chapterText += 'data-verse="' + ( verseNumber + 1 ) + '">';
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
					if ( reference.version === 'lc' ) {
						//same as below
						chapterData.original[verseNumber].forEach( function( wordObject, wordNumber ) {
							if ( wordObject ) {
								chapterText += self.createWordString( wordObject, 'english', testament, reference.version );
							}
						});
					} else {
						chapterData.translation[verseNumber].forEach( function( wordObject, wordNumber ) {
							if ( wordObject ) {
								chapterText += self.createWordString( wordObject, 'english', testament, reference.version );
							}
						});
					}
				chapterText += "</div>";

				//Load hebrew
				if(	chapterData.original[verseNumber] ) {
					chapterText += "<div class='original " + testament + "'>";
					chapterData.original[verseNumber].forEach( function( wordObject, wordNumber ) {
						if ( wordObject ) {
							chapterText += self.createWordString( wordObject, testament, testament );
						}
					});
					chapterText += "</div>";
				}
				chapterText += '</div>';
				chapterText += '</li>';
			});
		}

		chapterText += '</ol>';
		chapterText += '</div>';
		return chapterText;
	},
	createWordString: function ( wordArray, language, testament, version ) {
		var self = this,
		    wordString = '',
		    families = [];
		if ( typeof wordArray[ 1 ] === 'undefined' )
			return '<span>' + wordArray[0] + '</span> ';

		lemma = wordArray[ 1 ];
		if ( lemma ) {
			lemmaArray = lemma.split( ' ' );
			lemmaArray.forEach( function( lemmaValue, key ) {
				families.push( javascripture.api.word.getFamily( lemmaValue ) );
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
		wordString += ' data-language="' + testament + '"';
		wordString += ' data-range="verse"';
		wordString += ' data-family="' + families.join( ' ' ) + '"';
		if ( wordArray[2] ) {
			wordString += ' data-morph="' + wordArray[2] + '"';
		}
		wordString += '>';
		if ( version === 'lc' && language === 'english' ) {
			 wordString += javascripture.modules.translateLiterally.getWord( wordArray );
		} else {
			wordString += wordArray[0];
		}
		wordString += '</span> ';
		return wordString;
	},
	getOffsetChapter: function ( reference, offset) {
		var book = reference.book,
		    chapter = reference.chapter,
		    offsetChapter = { version: reference.version },
			offsetChapterNumber = parseInt(chapter, 10) + offset,
			offsetNumberJavascript = offsetChapterNumber - 1,
			offsetBook;
		if ( javascripture.data[reference.version][book] && javascripture.data[reference.version][book][offsetNumberJavascript] !== undefined) {
			offsetChapter.book = book;
			offsetChapter.chapter = offsetChapterNumber;
		} else {
			//get the offset book
			bible.Data.books.forEach( function ( loopBookArray, index ) {
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
			} );
		}
		return offsetChapter;
	}
};
