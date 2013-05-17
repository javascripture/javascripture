/*global define, debug*/
define(['jquery', 'literalTranslation'], function ($, literalTranslation) {
	"use strict";
	var translateLiterally = {
		getWord: function (word) {
			var literalWord;
			if (typeof(word) === 'object') {
				if (word.morph) {
					var morph = word.morph.replace(/-/gi, ''); 
					literalWord = literalTranslation[word.lemma][morph];
				} else {
					literalWord = literalTranslation[word.lemma];
				}
			} else {
				literalWord = literalTranslation[word];
			}
			if (literalWord !== undefined && typeof(literalWord) === 'object') { //need better way to test if is an object
				//get first item in object
				$.each(literalWord, function (morph, translation) {
					literalWord = translation;
					var first;
					for (var i in literalWord) {
					    if (literalWord.hasOwnProperty(i) && typeof(i) !== 'function') {
							first = literalWord[i];
							break;
						}
					}
					//stop loop here;
				});
			}
			if (literalWord === undefined) {
				literalWord = '';
			}
			return literalWord;
		}
	};
	return translateLiterally;
});