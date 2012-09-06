/*global define, require, debug*/
define(['jquery', 'strongsDictionary', 'morphology', 'ba-debug'], function ($, strongsDictionary, morphology) {
	"use strict";
	$.widget('javascripture.wordDetails', {
		_init: function () {
			var self = this,
				$this = this.element,
				language = this.options.language,
				word = this.options.lemma,
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
				gender;
			markup += '<div class="word-details-inner">';
			markup += '<div class="' + word + '"><h3 class="' + word + '">' + word + ' ' + strongsDictionary[word].lemma + '</h3></div>';
			markup += '<strong>Derivation:</strong> ' + strongsDictionary[word].derivation + '<br />';
			markup += '<strong>KJV usage:</strong> ' + strongsDictionary[word].kjv_def + '<br />';
			markup += '<strong>Pronounciation:</strong> ' + strongsDictionary[word].pron + '<br />';
			markup += '<strong>Strongs definition:</strong> ' + strongsDictionary[word].strongs_def + '<br />';
			markup += '<strong>Language:</strong> ' + language + '<br />';
			markup += '<strong>Transliteration:</strong> ' + strongsDictionary[word].xlit + '<br />';
			if (morph !== undefined) {
				markup += '<strong>Morphology:</strong> ' + morph + '<br />';
				if (language === 'hebrew') {
					language = 'english'; //because the morph data for hebrew is actually in the english text
					markup += morphology.hebrew[morph] + ' ';
				}
				if (language === 'greek') {
					morphArray = morph.split('-');
					partOfSpeech = morphArray[0];
					markup += morphology.greek.partOfSpeech[partOfSpeech] + ' ';
					Case = morphArray[1];
					if (partOfSpeech === 'V') { //for verbs
						if (Case !== undefined) {
							if (morphology.greek.Case[Case] !== undefined) {
								markup += morphology.greek.Case[Case] + ' ';
							} else {
								tense = Case[0];
								markup += morphology.greek.Case.tense[tense] + ' ';
								voice = Case[1];
								markup += morphology.greek.Case.voice[voice] + ' ';
								mood = Case[2];
								markup += morphology.greek.Case.mood[mood] + ' ';
							}
						}
						if (morphArray[2] !== undefined) {
							person = morphArray[2][0];
							markup += morphology.greek.person[person] + ' ';
							number = morphArray[2][1];
							markup += morphology.greek.number[number] + ' ';
							gender = morphArray[2][2];
							if (gender !== undefined) {
								markup += morphology.greek.gender[gender] + ' ';
							}
						}
					} else {
						Case = morphArray[1][0];
						markup += morphology.greek.Case[Case] + ' ';
						number = morphArray[1][1];
						markup += morphology.greek.number[number] + ' ';
						gender = morphArray[1][2];
						markup += morphology.greek.gender[gender] + ' ';
					}
				}
			}
			markup += '<button class="word" data-role="button" data-language="' + language + '" data-lemma="' + word + '" data-type="lemma">Search for ' + word + '</button>';
			if (morph !== undefined) {
				markup += '<button class="word" data-role="button" data-language="' + language + '" data-lemma="' + morph + '" data-type="morph">Search for ' + morph + '</button>';
			}
			markup += '</div>';
			$this.find('.content').html(markup).find('[data-role=button]').button();
			$this.popup('open');
		}
	});
	$(document).on('vclick', '.wordDetails', function (event) {
		var data = $(this).data();
		$('#wordDetails').wordDetails(data);
	});
});