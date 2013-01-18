/*global define, debug*/
define(['jquery', 'strongsObjectWithFamilies', 'strongsFamilies'], function ($, strongsObjectWithFamilies, strongsFamilies) {
	"use strict";
	var wordFamilies = {
		getFamily: function (lemma) {
			var family = lemma;
			if (strongsObjectWithFamilies[lemma] !== undefined) {
				family = strongsObjectWithFamilies[lemma].family;
			} else {
				debug.debug('why isnt there a family for ' + lemma);
			}
			return family;
		}/*,
		getWordFamily: function (term) {
			debug.debug(term);
			if (term !== undefined) {
				var lemmaArray = term.split(' '),
					familyArray = [];
				$.each(lemmaArray, function (index, lemma) {
					if (strongsObjectWithFamilies[lemma] !== undefined) {
						familyArray.push(strongsObjectWithFamilies[lemma].family);
					} else {
						debug.debug('why isnt there a family for ' + lemma);
					}
				});
				debug.debug(familyArray.join(' '));
				return familyArray.join(' ');
			} else {
				return '';
			}
		}*/
	};
	return wordFamilies;
});