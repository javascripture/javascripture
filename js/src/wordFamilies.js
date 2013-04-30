/*global define, debug*/
define(['jquery', 'strongsObjectWithFamilies', 'strongsFamilies'], function ($, strongsObjectWithFamilies, strongsFamilies) {
	"use strict";
	var wordFamilies = {
		getFamily: function (lemma) {
			var familyArray = [];
			if (lemma === "added" || lemma === undefined) {
				return '';
			}
			$.each(lemma.split(' '), function (index, term) {
				if ( term !== 'added' && term !== 'dwyer-added' ) {
					if (strongsObjectWithFamilies[term] !== undefined ) {
						familyArray.push(strongsObjectWithFamilies[term].family);
					} else {
						debug.debug('why isnt there a family for ' + term);
					}				
				}
			});
			return familyArray.join(' ');
		}
	};
	return wordFamilies;
});