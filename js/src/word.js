/*global define, require, debug*/
define(['jquery', 'strongsDictionary', 'strongObjectRoots', 'english', 'hebrew', 'greek', 'jquery-mobile', 'ba-debug'], function ($, strongsDictionary, strongObjectRoots, english, hebrew, greek) {
	"use strict";
	$.widget('javascripture.word', {
		options: {
			word: 'beginning',
			lemma: 'H1254',
			morph: 'TH8804',
			searchFor: 'all',
			language: 'english',
			range: 'word',
			strict: false,
			terms: {},
			termArray: [],
			testObject: [],
			referenceObject: {}
		},
		_create: function () {
			$('#results').append('<div class="panel-inner"></div>');
		},
		_init: function () {
			debug.debug(this.options);
			var self = this,
				$this = this.element,
				word = this.options.word,
				lemma = this.options.lemma,
				morph = this.options.morph,
				language = this.options.language,
				range = this.options.range,
				markup = '',
				wordArray = [],
				lemmaArray = [],
				morphArray = [],
				wordCount = 0,
				searchObject,
				term,
				termId = word + '_' + lemma + '_' + morph, //term is used to identify the combination of things that are being searched for
				termReadable = word + ' ' + lemma + ' ' + morph, //term is used to identify the combination of things that are being searched for
				matchArray = [];
			termId = termId.replace(/ /gi, '_');
			if (lemma !== '') {
				term = lemma;
			} else if (morph !== '') {
				term += ' ' + morph;
			}
			if (language === "hebrew") {
				searchObject = hebrew;
				word = self.standarizeWordEndings(word);
			} else if (language === "greek") {
				searchObject = greek;
			} else {
				searchObject = english;
			}
			//set up array
			self.options.terms = {};
			self.options.termArray = [];
			if (word !== '') {
				wordArray = word.split(' ');
				$.each(wordArray, function (key, value) {
					self.options.terms[value] = {
						type: 'word',
						references: []
					};
				});
				self.options.termArray = self.options.termArray.concat(wordArray);// this doesn't remove duplicates
			}
			if (lemma !== '') {
				lemmaArray = lemma.split(' ');
				$.each(lemmaArray, function (key, value) {
					self.options.terms[value] = {
						type: 'lemma',
						references: []
					};
				});
				self.options.termArray = self.options.termArray.concat(lemmaArray);// this doesn't remove duplicates
			}
			if (morph !== '') {
				morphArray = morph.split(' ');
				$.each(morphArray, function (key, value) {
					self.options.terms[value] = {
						type: 'morph',
						references: []
					};
				});
				self.options.termArray = self.options.termArray.concat(morphArray);// this doesn't remove duplicates
			}
			//loop over the terms first, and build up a reference array for each term
			//then we can compare those arrays to see the overlap.
			//could cache the results
			$.each(self.options.terms, function (term, termDetails) {
				$.each(searchObject, function (bookName, bookContent) {
					$.each(bookContent, function (chapterNumber, chapterContent) {
						$.each(chapterContent, function (verseNumber, verseContent) {
							if (language === 'english') {
								//range can't apply in here
								//old way if (self.findArrayElementsInString(term, verseContent, wordCount)) {
								if (self.findTermInString(term, verseContent)) {
									self.options.terms[term].references.push([bookName, chapterNumber + 1, verseNumber + 1, wordCount, language, verseContent]);
								}
							} else {
								//loop through each word in the verse doing a match on our terms
								$.each(verseContent, function (wordNumber, wordObject) {
									//if the term is a match
									if (self.isWordValueInWordObject(term, termDetails, wordObject)) {
										//then add the key to our references
										self.options.terms[term].references.push([bookName, chapterNumber + 1, verseNumber + 1, wordCount, language, wordObject, wordNumber]);
									}
								});
							}
						});
					});
				});
			});
			self.combineTerms();
			self.addTermsToPage();
		},
		addTermsToPage: function () {
			var self = this,
				markup = '';
			$.each(self.options.terms, function (term, termDetails) {
				markup = '';
				if ($('#' + term).length === 0) {
					markup += '<div class="collapsible-wrapper" id="' + term + '">';
					markup += '<div data-role="collapsible" class="word-list" data-collapsed="false" data-inset="false">';
					markup += '<h3';
					if (termDetails.type === 'lemma') {
						markup += ' class="transparent ' + term + '"';
					}
					markup += '>' + term + ' ';
					markup += '</h3>';
					markup += self.createMarkup(termDetails.references);
					markup += '</div>';
					markup += '<div class="controlgroup ui-li-has-count">';
					markup += '<a data-role="button" data-icon="delete" data-iconpos="notext" data-word="' + term + '" class="deleteWord">Delete</a>';
					markup += '<span class="ui-li-count ui-btn-up-c ui-btn-corner-all">' + termDetails.references.length + '</span>';
					markup += '</div>';
					markup += '</div>';
					self.element.find('.panel-inner').append(markup);
					$('#' + term).find('[data-role=collapsible]').collapsible();
					$('#' + term).find(':jqmData(role=listview)').listview();/* makes things very slow*/
					$('#' + term).find('[data-role=button]').button();
					$('html').addClass(term);
				}
			});
		},
		createMarkup: function (referenceArray) {
			var markup = '<ol data-role="listview" data-mini="true">'; //take out split list data-split-icon="info" data-split-theme="d">';
			$.each(referenceArray, function (key, reference) {
				markup += '<li>';
				markup += '<a href="#reference?book=' + reference[0] + '&chapter=' + reference[1] + '&verse=' + reference[2] + '" class="referenceLink" data-transition="none">' + reference[0] + ' ' + reference[1] + ':' + reference[2] + '</a>';
				/* take out the info for split lists markup += '<a data-language="' + reference[4] + '"';
				if (reference[5] !== undefined) {
					if (reference[5].lemma !== undefined) {
						markup += ' data-lemma="' + reference[5].lemma + '"';
					}
					if (reference[5].morph !== undefined) {
						markup += ' data-lemma="' + reference[5].morph + '"';
					}
				}
				markup += ' class="wordDetails">Info</a>';*/
				markup += '</li>';
			});
			markup += '</ol>';
			return markup;
		},
		findTermInString: function (term, string) {
			var termIsInString = false;
			if (string.toLowerCase().indexOf(term.toLowerCase()) !== -1) {
				termIsInString = true;
			}
			return termIsInString;
		},
		findArrayElementsInString: function (array, string, wordCount) {
			var	self = this,
				elementInString = false,
				searchTypeStrongs,
				nextCharacterPosition,
				nextCaracter,
				previousCharacterPosition,
				previousCharacter;
			string = string.toString(); //just in case ;)
			$.each(array, function (index, value) {
				if (parseFloat(value.substring(1, value.length)) > 0) { //this is a number
					searchTypeStrongs = true;
				}
				var valuePosition = string.toLowerCase().indexOf(value.toLowerCase());
				if (valuePosition > 0) {
					if (searchTypeStrongs) {
						//if next character is a number then it's not a match...
						if (parseInt(nextCaracter, 10).toString() === "NaN") {
							wordCount = wordCount + 1;
						}
					} else { //this is a word
						if (self.options.strict) {
							nextCharacterPosition = valuePosition + value.length;
							nextCaracter = string.substring(nextCharacterPosition, nextCharacterPosition + 1);
							previousCharacterPosition = valuePosition - 1;
							previousCharacter = string.substring(previousCharacterPosition, previousCharacterPosition + 1);
							if ((nextCaracter === " " || nextCaracter === "<") && (previousCharacter === " " || previousCharacter === "<")) {
								wordCount = wordCount + 1;
							}
						} else {
							wordCount = wordCount + 1;
						}
					}
				}
			});
			if ((wordCount > 0 && self.options.searchFor === 'any') || (wordCount > array.length - 1 && self.options.searchFor === 'all')) {
				elementInString = true;
			}
			return elementInString;
		},
		standarizeWordEndings: function (word) {
			return word.replace(/ם/gi, 'מ');
		},
		isWordValueInWordObject: function (term, termDetails, wordObject) {
			var wordValueIsInWordObject = false;
			if (wordObject !== undefined) {
				if (term === '' || wordObject[termDetails.type] !== undefined) {
					if (termDetails.type === 'word') {
						//for words
						if (wordObject[termDetails.type].indexOf(term) >= 0) {
							wordValueIsInWordObject = true;
						}
					} else {
						if (wordObject[termDetails.type] === term) {
							wordValueIsInWordObject = true;
						}
					}
				} else {
					wordValueIsInWordObject = false;
				}
			}
			return wordValueIsInWordObject;
		},
		combineTerms: function () {
			var self = this,
				combinedString = self.options.termArray.join('_', self.options.terms),
				combinedTermDetails = {};
			if (self.options.terms[combinedString] === undefined) {
				combinedTermDetails = {
					'type': 'combined'
				};
				combinedTermDetails.references = [];
				combinedTermDetails.references = self.combineReferences();
				self.options.terms[combinedString] = combinedTermDetails;
			}
		},
		combineReferences: function () {
			var self = this,
				allReferences = {},
				referenceString = '',
				combinedReferences = [];
			$.each(this.options.terms, function (term, termDetails) {
				$.each(termDetails.references, function (key, reference) {
					referenceString = reference[0] + '_' + reference[1] + '_' + reference[2]; //this will match across a verse not across a word
					if (allReferences[referenceString] !== undefined && allReferences[referenceString].terms !== undefined) {
						if (allReferences[referenceString].terms.toString().indexOf(term) === -1) { //term isn't already in array
							allReferences[referenceString].terms.push(term);
						}
					} else {
						allReferences[referenceString] = {};
						allReferences[referenceString].terms = [];
						allReferences[referenceString].terms.push(term);
						allReferences[referenceString].referenceObject = reference;
					}
				});
			});
			$.each(allReferences, function (key, object) {
				if (object.terms.length >= self.options.termArray.length) {
					combinedReferences.push(object.referenceObject);
				}
			});
			return combinedReferences;
		}
	});
	$.fn.serializeObject = function () {
		var o = {},
			a = this.serializeArray();
		$.each(a, function () {
			if (o[this.name] !== undefined) {
				if (!o[this.name].push) {
					o[this.name] = [o[this.name]];
				}
				o[this.name].push(this.value || '');
			} else {
				o[this.name] = this.value || '';
			}
		});
		return o;
	};
	$(document).on('click', '.deleteWord', function (event) {
		event.preventDefault();
		event.stopPropagation();
		var word = $(this).data('word');
		$(this).closest('.collapsible-wrapper').remove();
		$('html').removeClass(word);
	});
	var words = '#reference-panel .word';
	$(document).on('vmouseover', words, function (event) {
		var word = $(this).data('lemma');
		$('body').addClass(word);
	});
	$(document).on('vmouseout', words, function () {
		var word = $(this).attr('class');
		$('body').removeClass(word);
	});
	$(document).on('vclick', words, function (event) {
		var data = $(this).data();
		if (event.altKey) {
			$('#wordDetails').wordDetails(data);
		} else {
			data.word = '';
			data.morph = '';
			$('#results').word(data);
		}
	});
	$(document).on('vclick', '#wordDetails .word', function (event) {
		var data = $(this).data();
		$('#results').word(data);
	});
	$('form.search').submit(function (event) {
		event.preventDefault();
		$('.search-button').text('Searching...');
		$('#results').word($(this).serializeObject());
		return false;
	});
});