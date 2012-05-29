/*global define, require, debug*/
define(['jquery', 'english', 'jquery-mobile', 'ba-debug'], function ($, english) {
	"use strict";
	$.widget('javascripture.search', {
		options: {
			term: 'God'
		},
		_init: function () {
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
		},
		createMarkup: function (referenceArray) {
			var markup = '<ol data-role="listview">';
			$.each(referenceArray, function (key, reference) {
				markup += ('<li><a href="#reference?book=' + reference[0] + '&chapter=' + reference[1] + '&verse=' + reference[2] + '">' + reference[0] + ' ' + reference[1] + ':' + reference[2] + '</a></li>');
			});
			markup += '</ol>';
			return markup;
		}
	});
	$('form.search').submit(function (event) {
		event.preventDefault();
		var term = $('#term').val();
		$('.ui-dialog').dialog('close');
		$.mobile.changePage('#search?term=' + term);
		return false;
	});
});