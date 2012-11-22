/*global define, require, debug*/
define(['jquery', 'strongsDictionary', 'morphology', 'ba-debug'], function ($, strongsDictionary, morphologyDictionary) {
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
				markup += '<div class="' + lemma + '"><h3 class="' + lemma + '">' + lemma + ' ' + word + '</h3></div><br />';
				markup += '<strong>Lemma:</strong> ' + strongsDictionary[lemma].lemma + '<br />';
				markup += '<strong>Derivation:</strong> ' + strongsDictionary[lemma].derivation + '<br />';
				markup += '<strong>KJV usage:</strong> ' + strongsDictionary[lemma].kjv_def + '<br />';
				markup += '<strong>Pronounciation:</strong> ' + strongsDictionary[lemma].pron + '<br />';
				markup += '<strong>Strongs definition:</strong> ' + strongsDictionary[lemma].strongs_def + '<br />';
				markup += '<strong>Language:</strong> ' + language + '<br />';
				markup += '<strong>Transliteration:</strong> ' + strongsDictionary[lemma].xlit + '<br />';
				if (morph !== undefined) {
					markup += '<strong>Morphology:</strong> ' + morph + '<br />';
					if (language === 'hebrew') {
						language = 'english'; //because the morph data for hebrew is actually in the english text
						markup += morphologyDictionary.hebrew[morph] + ' ';
					}
					if (language === 'greek') {
						morphArray = morph.split('-');
						partOfSpeech = morphArray[0];
						markup += morphologyDictionary.greek.partOfSpeech[partOfSpeech] + ' ';
						Case = morphArray[1];
						if (partOfSpeech === 'V') { //for verbs
							if (Case !== undefined) {
								if (morphologyDictionary.greek.Case[Case] !== undefined) {
									markup += morphologyDictionary.greek.Case[Case] + ' ';
								} else {
									if (parseInt(Case[0], 10) > 0) { // second future, second aorist and second perfect
										tense = Case[0] + Case[1];
										voice = Case[2];
										mood = Case[3];
									} else {
										tense = Case[0];
										voice = Case[1];
										mood = Case[2];
									}
									markup += morphologyDictionary.greek.Case.tense[tense] + ' ';
									markup += morphologyDictionary.greek.Case.voice[voice] + ' ';
									markup += morphologyDictionary.greek.Case.mood[mood] + ' ';
								}
							}
							if (morphArray[2] !== undefined) {
								if (mood === "P" || mood === "R") {
									case2 = morphArray[2][0];
									markup += morphologyDictionary.greek.Case[case2] + ' ';
									number = morphArray[2][1];
									markup += morphologyDictionary.greek.number[number] + ' ';
									gender = morphArray[2][2];
									markup += morphologyDictionary.greek.gender[gender] + ' ';
								} else {
									person = morphArray[2][0];
									markup += morphologyDictionary.greek.person[person] + ' ';
									number = morphArray[2][1];
									markup += morphologyDictionary.greek.number[number] + ' ';
								}
							}
						} else {
							if (morphArray[1] !== undefined) {
								Case = morphArray[1][0];
								markup += morphologyDictionary.greek.Case[Case] + ' ';
								number = morphArray[1][1];
								markup += morphologyDictionary.greek.number[number] + ' ';
								gender = morphArray[1][2];
								markup += morphologyDictionary.greek.gender[gender] + ' ';
							}
						}
					}
				}
				markup += '<br /><label>Search on</label>';
				markup += '<div data-role="controlgroup" data-type="horizontal">';
				markup += '<a class="word" data-role="button" data-language="' + language + '" data-word="' + word + '" data-lemma="" data-morph="">' + word + '</a>';
				markup += '<a class="word" data-role="button" data-language="' + language + '" data-word="" data-lemma="' + lemma + '" data-morph="">' + lemma + '</a>';
				if (morph !== undefined) {
					markup += '<a class="word" data-role="button" data-language="' + language + '" data-word="" data-lemma="" data-morph="' + morph + '">' + morph + '</a>';
					markup += '<a class="word" data-role="button" data-language="' + language + '" data-word="" data-lemma="' + lemma + '" data-morph="' + morph + '">' + lemma + ' and ' + morph + '</a>';
				}
				markup += '</div>';
				markup += '</div>';
			});
			$this.find('.content').html(markup).find('[data-role=button]').button();
			$this.find('[data-role=controlgroup]').controlgroup();
			$this.popup('open');
		}
	});
	$(document).on('vclick', '.wordDetails', function (event) {
		var data = $(this).data();
		$('#wordDetails').wordDetails(data);
	});
});