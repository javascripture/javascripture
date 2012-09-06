/*global define, require, debug*/
define(['jquery', 'strongsDictionary', 'strongObjectRoots', 'english', 'hebrew', 'greek', 'jquery-mobile', 'ba-debug'], function ($, strongsDictionary, strongObjectRoots, english, hebrew, greek) {
	"use strict";
	$.widget('javascripture.word', {
		options: {
			term: 'H1234',
			searchFor: 'all',
			language: 'english',
			type: 'lemma',
			strict: false
		},
		_init: function () {
			debug.debug(this.options);
			var self = this,
				$this = this.element,
				word = this.options.term,
				language = this.options.language,
				type = this.options.type,
				markup = '',
				referenceArray = [],
				wordCount = 0,
				searchObject;
			if (language === "hebrew") {
				searchObject = hebrew;
			} else if (language === "greek") {
				searchObject = greek;
			} else {
				searchObject = english;
			}
			$.each(searchObject, function (bookName, bookContent) {
				$.each(bookContent, function (chapterNumber, chapterContent) {
					$.each(chapterContent, function (verseNumber, verseContent) {
						$.each(verseContent, function (wordNumber, wordContent) { //not working for english!
							//this doesn't let you search for V-A
							if (word === wordContent[type]) {
								referenceArray.push([bookName, chapterNumber + 1, verseNumber + 1, wordCount, language, wordContent.lemma, wordContent.morph]);
							}
						});
					});
				});
			});
			if ($('#' + word).length === 0) {
				markup += '<div class="collapsible-wrapper" id="' + word + '">';
				markup += '<div data-role="collapsible" class="word-list" data-collapsed="false">';
				markup += '<h3 class="' + word + '">' + word + ' ';
				if (strongsDictionary[word] !== undefined) {
					markup += strongsDictionary[word].lemma;
				}
				markup += '</h3>';
				markup += self.createMarkup(referenceArray, word);
				markup += '</div>';
				markup += '<div class="controlgroup ui-li-has-count">';
				markup += '<a data-role="button" data-icon="delete" data-iconpos="notext" data-word="' + word + '" class="deleteWord">Delete</a>';
				markup += '<span class="ui-li-count ui-btn-up-c ui-btn-corner-all">' + referenceArray.length + '</span>';
				markup += '</div>';
				markup += '</div>';
				self.element.find('.panel-inner').append(markup);
				$('#' + word).find('[data-role=collapsible]').collapsible();
				$('#' + word).find(':jqmData(role=listview)').listview();
				$('#' + word).find('[data-role=button]').button();
				$('html').addClass(word);
			}
		},
		/*_init: function () {
			var self = this,
				$this = this.element,
				terms = this.options.term.split(' '),
				referenceArray = [],
				wordCount = 0;
			$.each(english, function (bookName, bookContent) {
				$.each(bookContent, function (chapterNumber, chapterContent) {
					$.each(chapterContent, function (verseNumber, verseContent) {
						if (self.findArrayElementsInString(terms, verseContent, 'all', wordCount)) {
							referenceArray.push([bookName, chapterNumber + 1, verseNumber + 1, wordCount]);
						}
					});
				});
			});
			$this.find('[data-role=content]').html(self.createMarkup(referenceArray)).find(':jqmData(role=listview)').listview();
		},
		//duplicated from search
		findArrayElementsInString: function (array, string, searchType, wordCount) {
			var	elementInString = false,
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
					nextCharacterPosition = valuePosition + value.length;
					nextCaracter = string.substring(nextCharacterPosition, nextCharacterPosition + 1);
					previousCharacterPosition = valuePosition - 1;
					previousCharacter = string.substring(previousCharacterPosition, previousCharacterPosition + 1);
					if (searchTypeStrongs) {
						//if next character is a number then it's not a match...
						if (parseInt(nextCaracter, 10).toString() === "NaN") {
							wordCount = wordCount + 1;
						}
					} else { //this is a word
						if ($('#strictSearch:checked').length > 0) { //coulb be passed as parameter
							if ((nextCaracter === " " || nextCaracter === "<") && (previousCharacter === " " || previousCharacter === "<")) {
								wordCount = wordCount + 1;
							}
						} else {
							wordCount = wordCount + 1;
						}
					}
				}
			});
			if ((wordCount > 0 && searchType === 'any') || (wordCount > array.length - 1 && searchType === 'all')) {
				elementInString = true;
			}
			return elementInString;
		},*/
		createMarkup: function (referenceArray, word) {
			var markup = '<ol data-role="listview" data-mini="true" data-split-icon="info" data-split-theme="d">';
			$.each(referenceArray, function (key, reference) {
				markup += '<li>';
				markup += '<a href="#reference?book=' + reference[0] + '&chapter=' + reference[1] + '&verse=' + reference[2] + '" class="referenceLink" data-transition="none">' + reference[0] + ' ' + reference[1] + ':' + reference[2] + '</a>';
				markup += '<a data-language="' + reference[4] + '" data-lemma="' + reference[5] + '" data-morph="' + reference[6] + '" class="wordDetails">Info</a>';
				markup += '</li>';
			});
			markup += '</ol>';
			return markup;
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
		$('#' + word).remove();
		$('html').removeClass(word);
	});
	var words = '.word';
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
		data.term = data.lemma; //sometimes this isn't the case, for other uses of the word widget
		if (event.altKey) {
			$('#wordDetails').wordDetails(data);
		} else {
			$('#word').word(data);
		}
	});
	$('form.search').submit(function (event) {
		event.preventDefault();
		$('.search-button').text('Searching...');
		$('#word').word($(this).serializeObject());
		return false;
	});
});