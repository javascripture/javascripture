/*globals javascripture*/
javascripture.api.reference = {
	getThreeChapters: function( reference ) {
		var self = this,
		    book = reference.book,
		    chapter = reference.chapter,
		    verse = reference.verse,
			prev = self.getOffsetChapter( reference, -1 ),
			next = self.getOffsetChapter( reference, 1 );
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
			threeChapters +=  javascripture.api.reference.getChapterText( prev );
		}

		//$threeChapters.append( javascripture.api.reference.getChapterText( reference ) );
		threeChapters +=  javascripture.api.reference.getChapterText( reference );

		//add the next chapter if it exists
		if ( next.book ) {
//			$threeChapters.data( 'next', next );
			threeChapters +=  javascripture.api.reference.getChapterText( next );
		}
		threeChapters += '</div>';
		console.log( threeChapters );
		return threeChapters;
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

		var originalText, language;
		if( javascripture.data.hebrew[book] ) {
			originalText = javascripture.data.hebrew;
			testament = 'hebrew';
		} else {
			originalText = javascripture.data.greek;
			testament = 'greek';
		}

		if ( javascripture.data.english[book][chapterInArray] ) {
			$.each( javascripture.data.english[book][chapterInArray], function(verseNumber, verseText ) {
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
					if ( javascripture.modules.versionSelector.getVersion() === 'lc' ) {
						//same as below
						$.each( originalText[book][chapterInArray][verseNumber], function( wordNumber, wordObject ) {
							if ( wordObject ) {
								chapterText += self.createWordString( wordObject, 'english', testament );
							}
						});
					} else {
						$.each( javascripture.data.english[book][chapterInArray][verseNumber], function( wordNumber, wordObject ) {
							if ( wordObject ) {
								chapterText += self.createWordString( wordObject, 'english', testament );
							}
						});
					}
				chapterText += "</div>";

				//Load hebrew
				if(originalText[book] && originalText[book][chapterInArray][verseNumber]) {
					chapterText += "<div class='original " + testament + "'>";
					$.each( originalText[book][chapterInArray][verseNumber], function( wordNumber, wordObject ) {
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
	createWordString: function ( wordArray, language, testament ) {
		var self = this,
		    wordString = '',
		    families = [];
		if ( typeof wordArray[ 1 ] === 'undefined' )
			return '<span>' + wordArray[0] + '</span> ';

		lemma = wordArray[ 1 ];
		if ( lemma ) {
			lemmaArray = lemma.split( ' ' );
			$.each( lemmaArray, function( key, lemmaValue ) {
				families.push( javascripture.modules.reference.getFamily( lemmaValue ) );
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
		if ( javascripture.modules.versionSelector.getVersion() === 'lc' && language === 'english' ) {
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
		    offsetChapter = {},
			offsetChapterNumber = parseInt(chapter, 10) + offset,
			offsetNumberJavascript = offsetChapterNumber - 1,
			offsetBook;
		if ( javascripture.data.english[book] && javascripture.data.english[book][offsetNumberJavascript] !== undefined) {
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
};
