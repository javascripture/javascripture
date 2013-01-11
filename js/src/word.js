/*global define, debug*/
define(['jquery', 'strongsDictionary', 'strongsObjectWithFamilies', 'strongsFamilies', 'english', 'hebrew', 'greek', 'jquery-mobile', 'ba-debug'], function ($, strongsDictionary, strongsObjectWithFamilies, strongsFamilies, english, hebrew, greek) {
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
			familyArray: [],
			referenceObject: {},
			referenceThatTriggeredSearch: ''
		},
		_create: function () {
			$('#results').append('<div class="panel-inner"></div>');
		},
		_init: function () {
			var self = this,
				word = this.options.word,
				lemma = this.options.lemma,
				morph = this.options.morph,
				term,
				termId = word + '_' + lemma + '_' + morph; //term is used to identify the combination of things that are being searched for
			termId = termId.replace(/ /gi, '_');
			if (lemma !== '') {
				term = lemma;
			} else if (morph !== '') {
				term += ' ' + morph;
			}
			if (this.options.language === "hebrew") {
				word = self.standarizeWordEndings(word);
			}

			//replace the lemma terms with their roots
			self.addWholeFamilyToLemmaTerms();

			//set up array
			self.options.terms = {};
			self.options.termArray = [];
			
			//add terms to array
			this.addTermsToTermArray('word');
			this.addTermsToTermArray('lemma');
			this.addTermsToTermArray('morph');
			this.removeDuplicatesFromTermArray();
			//loop over the terms first, and build up a reference array for each term
			//then we can compare those arrays to see the overlap.
			//could cache the results
			$.each(self.options.terms, function (term, termDetails) {
				self.searchForTerm(term, termDetails);
			});
			self.combineTerms();
			self.addTermsToPage();
		},
		searchForTerm: function (term, termDetails) {
			var self = this,
				wordCount = 0,
				searchObject;
			if (this.options.language === "hebrew") {
				searchObject = hebrew;
			} else if (this.options.language === "greek") {
				searchObject = greek;
			} else {
				searchObject = english;
			}
			$.each(searchObject, function (bookName, bookContent) {
				$.each(bookContent, function (chapterNumber, chapterContent) {
					$.each(chapterContent, function (verseNumber, verseContent) {
						if (self.options.language === 'english') {
							//range can't apply in here
							//old way if (self.findArrayElementsInString(term, verseContent, wordCount)) {
							if (self.findTermInString(term, verseContent)) {
								self.options.terms[term].references.push([bookName, chapterNumber + 1, verseNumber + 1, wordCount, self.options.language, verseContent]);
							}
						} else {
							//loop through each word in the verse doing a match on our terms
							$.each(verseContent, function (wordNumber, wordObject) {
								//if the term is a match
								if (self.isWordValueInWordObject(term, termDetails, wordObject)) {
									//then add the key to our references
									self.options.terms[term].references.push([bookName, chapterNumber + 1, verseNumber + 1, wordCount, self.options.language, wordObject, wordNumber]);
								}
							});
						}
					});
				});
			});
		},
		removeDuplicatesFromTermArray: function () {
			var termObject = {},
				newTermArray = [];
			$.each(this.options.termArray, function (index, value) {
				termObject[value] = 0;
			});
			$.each(termObject, function(term) {
				newTermArray.push(term);
			});
			this.options.termArray = newTermArray;
		},
		addTermsToTermArray: function (type) {
			var self = this,
				termArray,
				terms = this.options[type];
			if (terms !== '') {
				termArray = terms.split(' ');
				$.each(termArray, function (key, value) {
					self.options.terms[value] = self.createTermDetails(type, value, []);
				});
				self.options.termArray = self.options.termArray.concat(termArray);// this doesn't remove duplicates
			}
		},
		combineTerms: function () {
			var self = this,
				combinedString = self.options.termArray.join('_', self.options.terms),
				combinedHeadingText = self.options.termArray.join(' & ', self.options.terms) + ' (' + self.options.range + ')';
			if (self.options.terms[combinedString] === undefined) {
				self.options.terms[combinedString] = self.createTermDetails('combined', combinedHeadingText, self.combineReferences());
			}
		},
		createTermDetails: function (type, headingText, references) {
			return {
				type: type,
				headingText: headingText,
				references: references
			};
		},
		addTermsToPage: function () {
			var self = this,
				parentElement = self.element.find('.panel-inner'),
				referenceThatTriggeredSearchLink;
			$.each(self.options.terms, function (term, termDetails) {
				if ($('#' + term).length === 0) {
					//add collapsible to page
					setTimeout(function () {
						parentElement.append(self.createCollapsible(term, termDetails));
						parentElement.find('[data-role=collapsible]').trigger('collapse');
						$('#' + term).find('[data-role=collapsible]').collapsible();
						//$('#' + term).find(':jqmData(role=listview)').listview();/* makes things very slow*/
						$('#' + term).find('[data-role=button]').button();
						referenceThatTriggeredSearchLink = self.getReferenceLinkObject(self.options.referenceThatTriggeredSearch);
						referenceThatTriggeredSearchLink.click().closest('ol').scrollTo(referenceThatTriggeredSearchLink);
						$('html').addClass(term);
					}, 10);
				}
			});
		},
		getReferenceLinkObject: function (reference) {
			return $('#' + this.getReferenceLinkId(reference));
		},
		getReferenceLinkId: function (reference) {
			return reference + '_link';
		},
		getReferenceLinkIdFromArray: function (referenceArray) {
			var referenceId = referenceArray[0] + '_' + referenceArray[1] + '_' + referenceArray[2];
			return this.getReferenceLinkId(referenceId);
		},
		createCollapsible: function (term, termDetails) {
			var self = this,
				markup = '';
			markup += '<div class="collapsible-wrapper" id="' + term + '">';
			markup += '<div data-role="collapsible" class="word-list" data-collapsed="false" data-inset="false">';
			markup += '<h3';
			if (termDetails.type === 'lemma') {
				markup += ' class="transparent ' + term + '"';
			}
			markup += '>' + termDetails.headingText + ' ';
			markup += '</h3>';
			markup += self.createListView(termDetails.references);
			markup += '</div>';
			markup += '<div class="controlgroup ui-li-has-count">';
			markup += '<a data-role="button" data-icon="delete" data-iconpos="notext" data-word="' + term + '" class="deleteWord">Delete</a>';
			markup += '<span class="ui-li-count ui-btn-up-c ui-btn-corner-all">' + termDetails.references.length + '</span>';
			markup += '</div>';
			markup += '</div>';
			return markup;
		},
		createListView: function (references) {
			var self = this,
				markup = '';
			markup += '<ol data-role="listview" data-mini="true">'; //take out split list data-split-icon="info" data-split-theme="d">';
			$.each(references, function (key, reference) {
				markup += '<li>';
				markup += '<a href="#reference?book=' + reference[0] + '&chapter=' + reference[1] + '&verse=' + reference[2] + '" class="referenceLink" data-transition="none" id="' + self.getReferenceLinkIdFromArray(reference) + '">' + reference[0] + ' ' + reference[1] + ':' + reference[2] + '</a>';
				/* hide split view markup += '<a data-language="' + reference[4] + '"';
				if (reference[5] !== undefined) {
					if (reference[5].lemma !== undefined) {
						markup += ' data-lemma="' + reference[5].lemma + '"';
					}
					if (reference[5].morph !== undefined) {
						markup += ' data-lemma="' + reference[5].morph + '"';
					}
				}
				markup += ' class="wordDetails" data-icon="info">Info</a>';*/
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
		combineReferences: function () {
			var self = this,
				allReferences = {},
				referenceString = '',
				combinedReferences = [];
			$.each(this.options.terms, function (term, termDetails) {
				$.each(termDetails.references, function (key, reference) {
					referenceString = reference[0]; //range === book
					if(self.options.range === 'chapter' || self.options.range === 'verse' || self.options.range === 'word') {
						referenceString += '_' + reference[1]; //range === chapter
						if (self.options.range === 'verse' || self.options.range === 'word') {
							referenceString += '_' + reference[2]; //range === verse
						}
						//to do range === word
					}
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
		},
		addWholeFamilyToLemmaTerms: function () {
			var self = this,
				root,
				family,
				lemmaArray = self.options.lemma.split(' ');
			$.each(self.options.lemma.split(' '), function (index, term) {
				if (strongsObjectWithFamilies[term] !== undefined && strongsObjectWithFamilies[term].family !== undefined) {
					root = strongsObjectWithFamilies[term].family;
				} else {
					root = term;
				}
				self.options.familyArray.push(root);
				family = strongsFamilies[root];
				lemmaArray = lemmaArray.concat(family);
			});
			self.options.lemma = lemmaArray.join(' ');
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
	$(document).on('vmouseover', words, function () {
		var word = $(this).data('lemma');
		$('body').addClass(word);
	});
	$(document).on('vmouseout', words, function () {
		var word = $(this).attr('class');
		$('body').removeClass(word);
	});
	$(document).on('vclick', words, function () {
		var data = $(this).data();
		if (event.altKey) {
			$('#wordDetails').wordDetails(data);
		} else {
			data.word = '';
			data.morph = '';
			data.referenceThatTriggeredSearch = $(this).closest('li').attr('id');
			$('#results').word(data);
		}
	});
	$(document).on('taphold', words, function () {
		var data = $(this).data();
		$('#wordDetails').wordDetails(data);
	});

	$(document).on('vclick', '#wordDetails .word', function () {
		var data = $(this).data();
		$('#results').word(data);
	});
	$('form.search').submit(function (event) {
		event.preventDefault();
		$('.search-button').text('Searching...');
		$('#results').word($(this).serializeObject());
		return false;
	});
	debug.debug('word module loaded');
});