// Category Model
// ==============

// Includes file dependencies
define(['jquery', 'backbone', 'bible', 'english', 'hebrew', 'greek', 'strongsDictionary', 'wordFamilies', 'translateLiterally', 'jquery-mobile', 'ba-debug'], function ($, Backbone, bible, english, hebrew, greek, strongsDictionary, wordFamilies, translateLiterally) {

	// The Model constructor
    var Model = Backbone.Model.extend( {
		getReference: function () {
			var self = this,
				book = this.get( 'book' ),
				chapter = this.get( 'chapter' ),
				verse = this.get('verse'),
				jsonChapter = chapter - 1, //because javascript arrays count from 0
				jsonVerse = verse - 1, //because javascript arrays count from 0
				chapterWrapperId = this.getReferenceId( book, chapter ),
				translatedText = english[book][jsonChapter],
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
				chapterWrapperId: chapterWrapperId,
				book: book,
				chapter: chapter,
				references: []
			}
			
			$.each(translatedText, function (verseNumber, verseObject) {
				var reference = {
					referenceId: self.getReferenceId( book, chapter, verseNumber + 1 ),
					className: '', //un;ess it\s current-verse
					language: language,
					english: self.createReferencesArray( verseObject ),
					original: self.createReferencesArray( originalObject[book][jsonChapter][verseNumber] )
				};
				referenceCollection.references.push(reference);
			});
			console.log(referenceCollection);
			return referenceCollection;
		},

		getReferenceId: function () {
			var referenceId = this.get('book').replace(/ /g, '_') + '_' + this.get('chapter');
			if (this.get('verse') != '') {
				referenceId += '_' + this.get('verse');
			}
			return referenceId;
		},
		
		createReferencesArray: function ( verseObject ) {
			var references = [];
			$.each(verseObject, function (wordNumber, wordObject) {
				wordObject.className = 'word';
				if (wordObject.lemma !== undefined) {
					wordObject.className = wordObject.className + ' ' + wordObject.lemma + ' ' + wordFamilies.getFamily(wordObject.lemma);
					wordObject.title = wordObject.lemma;
					wordObject.family = wordFamilies.getFamily(wordObject.lemma);
				}
				if (wordObject.morph !== undefined) {
					wordObject.morph = ' ' + wordObject.morph;
					wordObject.title = wordObject.title + ' ' + wordObject.morph;
				}
				references.push(wordObject);
			});
			return references;
		}
    } );

    // Returns the Model class
    return Model;

} );