/*global define, require, debug*/
define(['jquery', 'strongsDictionary', 'strongObjectRoots', 'english', 'hebrew', 'greek', 'jquery-mobile', 'ba-debug'], function ($, strongsDictionary, strongObjectRoots, english, hebrew, greek) {
	"use strict";
	$.widget('javascripture.word', {
		options: {
			lemma: 'H1234'
		},
		_init: function () {
			var self = this,
				$this = this.element,
				word = this.options.lemma,
				type = this.options.type,
				markup = '',
				referenceArray = [],
				wordCount = 0,
				searchObject;
			if (type === "hebrew") {
				searchObject = hebrew;
			} else if (type === "greek") {
				searchObject = greek;
			} else {
				searchObject = english;
			}
			$.each(searchObject, function (bookName, bookContent) {
				$.each(bookContent, function (chapterNumber, chapterContent) {
					$.each(chapterContent, function (verseNumber, verseContent) {
						$.each(verseContent, function (wordNumber, wordContent) {
							if (word === wordContent.lemma) {
								referenceArray.push([bookName, chapterNumber + 1, verseNumber + 1, wordCount]);
							}
						});
					});
				});
			});
			if ($('#' + word).length === 0) {
				markup += '<div data-role="collapsible" data-collapsed="false" id="' + word + '">';
				markup += '<h3 class="' + word + '">' + word + ' ';
				if (strongsDictionary[word] !== undefined) {
					markup += strongsDictionary[word].lemma;
				}
				markup += '</h3>';
				markup += '<a data-lemma="' + word + '" class="wordDetails">Details</a>';
				markup += self.createMarkup(referenceArray);
				markup += '</div>';
				self.element.find('[data-role=collapsible-set]').append(markup).collapsibleset('refresh');
				self.element.find(':jqmData(role=listview)').listview();
				self.element.find('h3.' + word).append('<a data-role="button" data-icon="delete" data-iconpos="notext" data-word="' + word + '" class="deleteWord">Delete</a><span class="ui-count">' + referenceArray.length + '</span>');
				self.element.find('[data-role=button]').button();
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
		createMarkup: function (referenceArray) {
			var markup = '<ol data-role="listview" data-mini="true">';
			$.each(referenceArray, function (key, reference) {
				markup += ('<li><a href="#reference?book=' + reference[0] + '&chapter=' + reference[1] + '&verse=' + reference[2] + '" class="referenceLink" data-transition="none">' + reference[0] + ' ' + reference[1] + ':' + reference[2] + '</a></li>');
			});
			markup += '</ol>';
			return markup;
		}
	});
	/*$('#word').bind('click', '.deleteWord', function (event) {
		debug.debug('g');
		event.preventDefault();
		event.stopPropagation();
		var word = $(this).data('word');
		$('#' + word).remove();
		$('html').removeClass(word);
	});*/
	var words = '.word';
	$(document).on('vmouseover', words, function (event) {
		var word = $(this).attr('class');
		$('body').addClass(word);
	});
	$(document).on('vmouseout', words, function () {
		var word = $(this).attr('class');
		$('body').removeClass(word);
	});
	$(document).on('vclick', words, function (event) {
		var word = $(this).attr('class'),
			$this = $(this);
		$('html').addClass(word);
		$('#word').word($this.data());
	});

});