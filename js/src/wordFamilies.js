/*global define, debug*/
define(['jquery', 'strongsObjectWithFamilies', 'strongsFamilies'], function ($, strongsObjectWithFamilies, strongsFamilies) {
	"use strict";
	var wordFamilies = {
		getFamily: function (lemma) {
			var familyArray = [];
			if (lemma === "added") {
				return '';
			}
			$.each(lemma.split(' '), function (index, term) {
				if (strongsObjectWithFamilies[term] !== undefined) {
					familyArray.push(strongsObjectWithFamilies[term].family);
				} else {
					debug.debug('why isnt there a family for ' + term);
				}				
			});
			return familyArray.join(' ');
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