/*global define, debug*/
define(['jquery', 'strongsDictionary', 'strongsObjectWithFamilies', 'strongsFamilies', 'wordFamilies', 'translateLiterally', 'english', 'hebrew', 'greek', 'jquery-mobile', '../external/jquery.sloweach', 'ba-debug'], function ($, strongsDictionary, strongsObjectWithFamilies, strongsFamilies, wordFamilies, translateLiterally, english, hebrew, greek) {
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
			referenceThatTriggeredSearch: '',
			termThatTriggeredSearch: '',
			combineTerms: false,
			searchObject: english
		},
		_create: function () {
			$('#results').append('<div class="panel-inner"></div>');
			if (this.options.language === "hebrew") {
				this.options.searchObject = hebrew;
			} else if (this.options.language === "greek") {
				this.options.searchObject = greek;
			} else {
				this.options.searchObject = english;
			}
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

			//set up array
			self.options.terms = {};
			self.options.termArray = [];
			self.options.familyArray = [];

			//add the root and family for the lemma terms
			self.addWholeFamilyToLemmaTerms();
			
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
			if (self.options.combineTerms === "on") {
				self.combineTerms();
			}
			self.addTermsToPage();
		},
		searchForTerm: function (term, termDetails) { //should depreciate this
			var self = this,
				wordCount = 0;
			$.each(self.options.searchObject, function (bookName, bookContent) {
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
		searchForSpecificWord: function() { //use this instead of above
			var self = this,
				references = [];
			$.each(self.options.searchObject, function (bookName, bookContent) {
				$.each(bookContent, function (chapterNumber, chapterContent) {
					$.each(chapterContent, function (verseNumber, verseContent) {
						if (self.options.language === 'english') {
							//range can't apply in here
							//old way if (self.findArrayElementsInString(term, verseContent, wordCount)) {
							//TODOif (self.findTermInString(term, verseContent)) {
							//TODO	self.options.terms[term].references.push([bookName, chapterNumber + 1, verseNumber + 1, wordCount, self.options.language, verseContent]);
							//TODO}
						} else {
							//loop through each word in the verse doing a match on our terms
							$.each(verseContent, function (wordNumber, wordObject) {
								//if the term is a match
								if (self.doWordsMatch(self.options, wordObject)) {
									references.push([bookName, chapterNumber + 1, verseNumber + 1]);
								}
							});
						}
					});
				});
			});
			return references;
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
			$.each(self.options.familyArray, function (index, value) {
				var content = '',
					collapsibleElement = self.createCollapsible(value, self.options.terms[value], content, value + '_family', value + ' ' + translateLiterally.getWord(value) + ' family');//self.createCollapsible(value + '_family', value + ' family');
				self.addCollapsibleToPage(parentElement, collapsibleElement);
				$('html').addClass(value);
			});
			/*this.element.slowEach(self.options.terms, 10, function (term, termDetails) {
				console.log(term);
			});*/
			$.each(self.options.terms, function (term, termDetails) {
				if ($('#' + term).length === 0) { //don't re-add it to the page
					if (termDetails.type === 'lemma' && strongsObjectWithFamilies[term] && strongsObjectWithFamilies[term].family) {
						//add it to the family collapsible
						parentElement = $('#' + strongsObjectWithFamilies[term].family + '_family').find('.ui-collapsible-content');
					}
					//add collapsible to page
					//setTimeout(function () {
						var content = self.createListView(termDetails.references, term),
							collapsibleElement = self.createCollapsible(term, self.options.terms[term], content, term, termDetails.headingText + ' ' + translateLiterally.getWord(term), termDetails.references.length);//self.createCollapsible(value + '_family', value + ' family');
						self.addCollapsibleToPage(parentElement, collapsibleElement);
						$('html').addClass(term);
					//}, 10);
				}
			});
			setTimeout(function () {//use deferred and promise
				referenceThatTriggeredSearchLink = self.getReferenceLinkObject(self.options.referenceThatTriggeredSearch, self.options.termThatTriggeredSearch);
				referenceThatTriggeredSearchLink.closest('[data-role=collapsible]').trigger('expand');
				referenceThatTriggeredSearchLink.click().closest('ol').scrollTo(referenceThatTriggeredSearchLink);				
			}, 1000);
		},
		addCollapsibleToPage: function (parentElement, collapsibleElement) {
			parentElement.find('[data-role=collapsible]').trigger('collapse');
			var $collapsibleElement = $(collapsibleElement).appendTo(parentElement);
			$collapsibleElement.find('[data-role=collapsible]').collapsible();
			//$collapsibeElement.find(':jqmData(role=listview)').listview();/* makes things very slow*/
			$collapsibleElement.find('[data-role=button]').button();

		},
		getReferenceLinkObject: function (reference, term) {
			var id = this.getReferenceLinkId(reference, term);
			return $('#' + id);
		},
		getReferenceLinkId: function (reference, term) {
			return reference + '_link_' + term;
		},
		getReferenceLinkIdFromArray: function (referenceArray, term) {
			var referenceId = referenceArray[0] + '_' + referenceArray[1] + '_' + referenceArray[2];
			return this.getReferenceLinkId(referenceId, term);
		},
		createCollapsible: function (term, termDetails, content, id, headingText, number) {
			var self = this,
				markup = '';
			markup += '<div class="collapsible-wrapper" id="' + id + '">';
			markup += '<div data-role="collapsible" class="word-list" data-collapsed="false" data-inset="false" data-collapsed-icon="arrow-r" data-expanded-icon="arrow-d">';
			markup += '<h3';
			if (termDetails.type === 'lemma') {
				markup += ' class="transparent ' + wordFamilies.getFamily(term) + '"';
			}
			markup += '>' + headingText + ' ';
			markup += '</h3>';
			markup += content;
			markup += '</div>';
			markup += '<div class="controlgroup ui-li-has-count">';
			markup += '<a data-role="button" data-icon="delete" data-iconpos="notext" data-word="' + id + '" class="deleteWord">Delete</a>';
			if (number !== undefined) {
				markup += '<span class="ui-li-count ui-btn-up-c ui-btn-corner-all">' + number + '</span>';
			}
			markup += '</div>';
			markup += '</div>';
			return markup;
		},
		createListView: function (references, term) {
			var self = this,
				markup = '';
			markup += '<ol data-role="listview" data-mini="true">'; //take out split list data-split-icon="info" data-split-theme="d">';
			$.each(references, function (key, reference) {
				markup += '<li>';
				markup += '<a href="#reference?book=' + reference[0] + '&chapter=' + reference[1] + '&verse=' + reference[2] + '" class="referenceLink" data-transition="none" id="' + self.getReferenceLinkIdFromArray(reference, term) + '">' + reference[0] + ' ' + reference[1] + ':' + reference[2] + '</a>';
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
		isWordValueInWordObject: function (term, termDetails, wordObject) { //depreciate this in favour of the below
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
		doWordsMatch: function (wordToSearchFor, wordObject) { //use this to replace the functon above
			if (this.doesTypeMatch(wordToSearchFor, wordObject, 'word') && this.doesTypeMatch(wordToSearchFor, wordObject, 'morph') && this.doesTypeMatch(wordToSearchFor, wordObject, 'lemma')) {
				return true;
			}
			return false;
		},
		doesTypeMatch: function(wordToSearchFor, wordObject, type) {
			if (wordToSearchFor[type] === '' || wordToSearchFor[type] === wordObject[type]) {
				return true;
			}
			return false;			
		},
		combineReferences: function () {
			var self = this,
				allReferences = {},
				referenceString = '',
				combinedReferences = [];
			if (self.options.range === 'word') {
				combinedReferences = self.searchForSpecificWord();
			} else {
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
			}
			return combinedReferences;
		},
		addWholeFamilyToLemmaTerms: function () {
			var self = this,
				root,
				family,
				lemmaArray = self.options.lemma.split(' ');
			if (self.options.lemma.length > 0 ) {
				$.each(self.options.lemma.split(' '), function (index, term) {
					if (strongsObjectWithFamilies[term] !== undefined && strongsObjectWithFamilies[term].family !== undefined) {
						root = strongsObjectWithFamilies[term].family;
					} else {
						root = term;
					}
					self.options.familyArray.push(root);
					family = strongsFamilies[root];
					family.push(root);
					lemmaArray = lemmaArray.concat(family);
				});
			}
			if (self.options.combineTerms !== "on") { //don't add all the family if we are combining terms
				self.options.lemma = lemmaArray.join(' ');
			}
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
		var $this = $(this),
			word = $this.data('word'),
			$parent = $this.closest('.collapsible-wrapper')
		$parent.find('.collapsible-wrapper').each(function (index, element) {
			var id = $(element).attr('id');
			$('html').removeClass(id);
		})
		$parent.remove();
		$('html').removeClass(word);
	});
	var words = '#reference-panel .word';
	$(document).on('vmouseover', words, function () {
		var word = $(this).data('family');
		$('body').addClass(word);
	});
	$(document).on('vmouseout', words, function () {
		var word = $(this).data('family');
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
			data.termThatTriggeredSearch = $(this).data('lemma');
			$('#results').word(data);
		}
	});
	$(document).on('taphold', words, function () {
		var data = $(this).data();
		console.log(data);
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
