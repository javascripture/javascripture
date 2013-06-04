// Category Model
// ==============

// Includes file dependencies
define(['jquery', 'backbone', 'bible', 'english', 'hebrew', 'greek', 'strongsDictionary', 'wordFamilies', 'translateLiterally', 'ba-debug'], function ($, Backbone, bible, english, hebrew, greek, strongsDictionary, wordFamilies, translateLiterally) {

	// The Model constructor
    var Model = Backbone.Model.extend( {
		getReference: function ( offset ) {
			var self = this,
				referenceObject = this.getOffsetChapter( offset ),
				book = referenceObject.book,
				chapter = referenceObject.chapter,
				verse = parseInt( this.get( 'verse' ), 10 ),
				jsonChapter = parseInt( chapter, 10 ) - 1, //because javascript arrays count from 0
				jsonVerse = verse - 1; //because javascript arrays count from 0
//console.log(book);
//console.log(jsonChapter);
				var translatedText = english[ book ][ jsonChapter ],
				originalObject,
				language;

			if (hebrew[book] !== undefined) {
				originalObject = hebrew;
				language = 'hebrew';
			} else {
				originalObject = greek;
				language = 'greek';
			}

			var referenceCollection = {
				chapterWrapperId: this.getReferenceId( book, chapter, 0 ),
				book: book,
				chapter: chapter,
				references: []
			}

			$.each(translatedText, function (verseNumber, verseObject) {
				var reference = {
					referenceId: self.getReferenceId( book, chapter, verseNumber + 1 ),
					language: language,
					english: self.createReferencesArray( verseObject ),
					original: self.createReferencesArray( originalObject[ book ][ jsonChapter ][ verseNumber ] )
				};
				
				//create a class for the current verse
				if ( verseNumber + 1 === verse && offset === 0 ) {
					reference.className = 'current-verse'; //should be in html?
				}
				referenceCollection.references.push( reference );
			});
			return referenceCollection;
		},

		getReferenceId: function ( book, chapter, verse ) {
			var referenceId = '';
			if ( book === undefined ) {
				book = this.get( 'book' );
			}
			if ( chapter === undefined ) {
				chapter = this.get( 'chapter' );
			}
			if ( verse === undefined ) {
				verse = this.get( 'verse' );
			}
			if ( book && chapter ) {
				referenceId = book.replace(/ /g, '_') + '_' + chapter;
			}
			if ( verse ) {
				referenceId += '_' + verse;
			}
			return referenceId;
		},
		
		createReferencesArray: function ( verseObject ) {
			var references = [];
			$.each(verseObject, function ( wordNumber, wordObject ) {
				wordObject.className = 'word';
				if ( wordObject.lemma !== undefined ) {
					wordObject.className = wordObject.className + ' ' + wordObject.lemma + ' ' + wordFamilies.getFamily( wordObject.lemma );
					wordObject.title = wordObject.lemma;
					wordObject.family = wordFamilies.getFamily( wordObject.lemma );
				}
				if ( wordObject.morph !== undefined ) {
					wordObject.morph = ' ' + wordObject.morph;
					wordObject.title = wordObject.title + ' ' + wordObject.morph;
				}
				references.push(wordObject);
			});
			return references;
		},
		
        getOffsetChapter: function( offsetNumber ) {
	        var book = this.get( 'book' ),
	        	chapter = this.get( 'chapter' ),
	        	offsetChapter = {},
				offsetChapterNumber = parseInt(chapter, 10) + offsetNumber,
				offsetNumberJavascript = offsetChapterNumber - 1,
				offsetBook;
			if (english[book] && english[book][offsetNumberJavascript] !== undefined) {
				offsetChapter.book = book;
				offsetChapter.chapter = offsetChapterNumber;
			} else {
				//get the offset book
				$.each( bible.Data.books, function ( index, loopBookArray ) {
					if ( loopBookArray[0] === book ) {
						offsetBook = index + offsetNumber;
						if (bible.Data.books[offsetBook] !== undefined) {
							offsetChapter.book = bible.Data.books[offsetBook][0];
							//only supports offsets of 1 or -1. to make it work with bigger values this will have to change
							if ( offsetNumber > 0 ) {
								offsetChapter.chapter = 1;
							} else {
								offsetChapter.chapter = bible.Data.verses[ offsetBook ].length;
							}
						}
					}
				});
			}
			return offsetChapter;
		}

    } );

    // Returns the Model class
    return Model;

} );