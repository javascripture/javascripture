/*global define, require, debug*/
define(['jquery', 'strongsDictionary', 'morphology', 'wordFamilies', 'ba-debug'], function ($, strongsDictionary, morphology, wordFamilies) {
	"use strict";
	$.widget('javascripture.wordDetails', {
		_init: function () {
			var self = this,
				$this = this.element,
				language = this.options.language,
				word = this.options.word,
				lemmaArray = this.options.lemma.split(' '),
				morph = this.options.morph,
				markup = '',
				morphArray,
				partOfSpeech,
				Case,
				tense,
				voice,
				mood,
				person,
				number,
				gender,
				case2;
			$.each(lemmaArray, function (key, lemma) {
				markup += '<div class="word-details-inner">';
				markup += '<div class="' + wordFamilies.getFamily(lemma) + '"><h3 class="' + wordFamilies.getFamily(lemma) + '">' + lemma + ' ' + word + '</h3></div><br />';
				markup += '<strong>Lemma:</strong> ' + strongsDictionary[lemma].lemma + '<br />';
				markup += '<strong>Derivation:</strong> ' + strongsDictionary[lemma].derivation + '<br />';
				markup += '<strong>KJV usage:</strong> ' + self.getUses( strongsDictionary[lemma].kjv_def, lemma ) + '<br />';
				markup += '<strong>Pronounciation:</strong> ' + strongsDictionary[lemma].pron + '<br />';
				markup += '<strong>Strongs definition:</strong> ' + strongsDictionary[lemma].strongs_def + '<br />';
				markup += '<strong>Language:</strong> ' + language + '<br />';
				markup += '<strong>Transliteration:</strong> ' + strongsDictionary[lemma].xlit + '<br />';
				if (morph !== undefined) {
					markup += '<strong>Morphology:</strong> ' + morph + '<br />';
					markup += morphology.get(morph, 'withLinks');
				}
				markup += '<br /><label>Search on</label>';
				markup += '<div data-role="controlgroup" data-type="horizontal">';
				markup += '<a class="word" data-role="button" data-language="' + language + '" data-word="' + word + '" data-lemma="" data-morph="">' + word + '</a>';
				markup += '<a class="word" data-role="button" data-language="' + language + '" data-word="" data-lemma="' + lemma + '" data-morph="">' + lemma + '</a>';
				if (morph !== undefined) {
					markup += '<a class="word" data-role="button" data-language="' + language + '" data-word="" data-lemma="" data-morph="' + morph + '">' + morph + '</a>';
					markup += '<a class="word" data-role="button" data-language="' + language + '" data-word="" data-lemma="' + lemma + '" data-morph="' + morph + '" data-combine-terms="on">' + lemma + ' and ' + morph + '</a>';
				}
				markup += '</div>';
				markup += '</div>';
			});
			$this.find('.content').html(markup).find('[data-role=button]').button();
			$this.find('[data-role=controlgroup]').controlgroup();
			$this.popup('open');
		},
		getUses: function ( uses, lemma ) {
			var returnString = '';
			if ( typeof uses !== 'undefined' ) {
				$.each( uses.split( ', ' ), function ( index, use ) {
					returnString += '<span href="#" class="word" data-word="' + use + '" data-lemma="' + lemma + '" data-language="english" data-clusivity="exclusive">' + use + '</span>, ';
				});
			}
			return returnString;

		}
	});
	$(document).on('vclick', '.wordDetails', function (event) {
		var data = $(this).data();
		$('#wordDetails').wordDetails(data);
	});
});