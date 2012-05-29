/*global define, require, debug*/
define(['jquery', 'bible', 'english', 'hebrew', 'greek', 'strongsDictionary', 'strongObjectRoots', 'jquery-mobile', 'ba-debug'], function ($, bible, english, hebrew, greek, strongsDictionary, strongObjectRoots) {
	"use strict";
	$.widget('javascripture.reference', {
		options: {
			book: 'Genesis',
			chapter: 1,
			verse: 1,
			originalSelector: 'original',
			translationSelector: 'translation'
		},
		_init: function () {
			var self = this,
				markup = '',
				book = this.options.book,
				chapter = parseInt(this.options.chapter, 10),
				verse = parseInt(this.options.verse, 10),
				$content = this.element.find('[data-role=content]'),
				verseSelector,
				contentHeight,
				contentTop,
				books = bible.Data.books,
				previousBook,
				previousBookLastChapter,
				next,
				nextBook,
				nextBookFirstChapter,
				i;
			if (typeof (english[book]) === 'undefined') {
				$.each(books, function (bookNameArrayIndex, bookNameArray) {
					$.each(bookNameArray, function (bookNameIndex, bookName) {
						if (bookName === book) {
							book = bookNameArray[0]; //we always use the first name in the array
							//should break the loops here
						}
					});
				});
			}
			if (typeof (english[book]) === 'undefined') {
				$content.html('Cannot find: ' + book + ' ' + chapter + ' ' + verse);
			}
			if (isNaN(chapter)) {
				chapter = 1;
			}
			if (isNaN(verse)) {
				verse = 1;
			}
			verseSelector = '#' + book + '_' + chapter + '_' + verse;
			if (!$(verseSelector).length) {
				$content.html('Loading ' + book + ' ' + chapter + ' ' + verse);
				if (typeof (english[book][chapter - 2]) !== 'undefined') {
					markup += self.createMarkup(book, chapter - 1, verse); //get the chapter before				
				} else {
					//get the previous book
					for (i in books) {
						if (books[i][0] === book) {
							previousBook = books[i - 1][0];
							previousBookLastChapter = bible.Data.verses[i - 1].length;
							markup += self.createMarkup(previousBook, previousBookLastChapter, verse);
							break;
						}
					}
				}
				markup += self.createMarkup(book, chapter, verse);
				if (typeof (english[book][chapter]) !== 'undefined') {
					markup += self.createMarkup(book, chapter + 1, verse); //get the chapter after
				} else {
					//get the next book
					for (i in books) {
						if (books[i][0] === book) {
							next = parseInt(i, 10) + 1;
							nextBook = books[next][0];
							nextBookFirstChapter = 1;
							markup += self.createMarkup(nextBook, nextBookFirstChapter, verse);
							break;
						}
					}

				}
				$content.html(markup);
			}
			contentHeight = $content.height();
			$content.scrollTop(0); //set it back to the top before we calculate the offset
			contentTop = $(verseSelector).offset().top;
			debug.debug(verseSelector);
			debug.debug(contentTop);
			$content.scrollTop(contentTop - (contentHeight / 3));
			$(document).trigger('attachWaypoints');
		},
		createMarkup: function (book, chapter, verse) {
			var self = this,
				markup = '',
				jsonChapter = chapter - 1, //because javascript arrays count from 0
				jsonVerse = verse - 1, //because javascript arrays count from 0
				translatedText = english[book][jsonChapter],
				className = '',
				originalObject;
			if (typeof (hebrew[book]) !== "undefined") {
				originalObject = hebrew;
				className = 'hebrew';
			} else {
				originalObject = greek;
				className = 'greek';
			}
			markup += '<h2 class="loadNextChapter">' + book + ' ' + chapter + '</h2>';
			markup += '<ol class="wrapper">';
			$.each(translatedText, function (verseNumber, verseText) {
				markup += '<li id ="' + book + '_' + chapter + '_' + (verseNumber + 1) + '"><div class="ui-grid-a">';
				markup += '<div class="ui-block-a"><div class="' + self.options.originalSelector + ' ' + className + '">';
				if (typeof (originalObject[book][jsonChapter][verseNumber]) !== 'undefined') {
					$.each(originalObject[book][jsonChapter][verseNumber], function (index, word) {
						markup += '<a href="#word?word=' + word.lemma + '" data-panel="results" class="' + word.lemma + '" title="' + word.lemma + '">' + word.word + '</a> ';
					});
				}
				markup += '</div></div>';
				markup += '<div class="ui-block-b"><div class="' + self.options.translationSelector + '">' + verseText.replace(/<w/gi, '<a').replace(/<\/w>/gi, '</a>').replace(/lemma="([A-Z,0-9, ]+)"/gi, 'href="#word?word=$1" data-panel="results" class="$1"').replace(/morph="([A-Z,0-9, ]+)"/gi, 'title="$1"') + '</div></div>';
				markup += '</div></li>';
			});
			markup += '</ol>';
			return markup;
		}
	});
	$('.gotoReference').submit(function (event) {
		event.preventDefault();
		var reference = $('#gotoReference').val().split(/,| |\.|:/),
			book = reference[0],
			chapter = reference[1],
			verse = reference[2];
		$('.ui-dialog').dialog('close');
		setTimeout(function () { //this gives the page time to load so that it scrolls to the right place
			$.mobile.changePage('#reference?book=' + book + '&chapter=' + chapter + '&verse=' + verse);
		});
		return false;
	});
});