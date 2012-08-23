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
				$content = this.element,
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
			if (english[book] === undefined) {
				$.each(books, function (bookNameArrayIndex, bookNameArray) {
					$.each(bookNameArray, function (bookNameIndex, bookName) {
						if (bookName.toLowerCase() === book.toLowerCase()) {
							book = bookNameArray[0]; //we always use the first name in the array
							//should break the loops here
						}
					});
				});
			}
			if (english[book] === undefined) {
				$content.html('Cannot find: ' + book + ' ' + chapter + ' ' + verse);
			}
			if (isNaN(chapter)) {
				chapter = 1;
			}
			if (isNaN(verse)) {
				verse = 1;
			}
			verseSelector = '#' + book.replace(/ /g, '_') + '_' + chapter + '_' + verse;
			if (!$(verseSelector).length) {
				$content.html('Loading ' + book + ' ' + chapter + ' ' + verse);
				$.mobile.showPageLoadingMsg('a', 'Loading data');
				setTimeout(function () { //give the loading message a chance to show
					markup += '<div class="reference-wrapper">';
					/*try loading everything - makes scrolling jumpy
					$.each(english[book], function (chapter) { 
						markup += self.createMarkup(book, chapter + 1, verse);
					});*/
					//load the chapter before and after
					if (english[book][chapter - 2] !== undefined) {
						markup += self.createMarkup(book, chapter - 1, verse); //get the chapter before				
					} else {
						//get the previous book
						$.each(books, function (index, loopBookArray) {
							if (loopBookArray[0] === book) {
								if (books[index - 1] !== undefined) {
									previousBook = books[index - 1][0];
									previousBookLastChapter = bible.Data.verses[index - 1].length;
									markup += self.createMarkup(previousBook, previousBookLastChapter, verse);
									//break;
								}
							}
						});
					}
					markup += self.createMarkup(book, chapter, verse);
					if (english[book][chapter] !== undefined) {
						markup += self.createMarkup(book, chapter + 1, verse); //get the chapter after
					} else {
						//get the next book
						$.each(books, function (index, loopBookArray) {
							if (loopBookArray[0] === book) {
								if (books[index + 1] !== undefined) {
									nextBook = books[index + 1][0];
									nextBookFirstChapter = 1;
									markup += self.createMarkup(nextBook, nextBookFirstChapter, verse);
									//break;
								}
							}
						});
					}
					markup += '</div>';
					$content.html(markup);
					$.mobile.hidePageLoadingMsg();
				});
			}
			setTimeout(function () { //give the loading message a chance to hide
				contentTop = $(verseSelector).offset().top;
				contentHeight = $(window).height();
				$content.scrollTop(contentTop - contentHeight / 3);
			});
		},
		createMarkup: function (book, chapter, verse) {
			var self = this,
				markup = '',
				jsonChapter = chapter - 1, //because javascript arrays count from 0
				jsonVerse = verse - 1, //because javascript arrays count from 0
				translatedText = english[book][jsonChapter],
				className = '',
				originalObject;
			if (hebrew[book] !== undefined) {
				originalObject = hebrew;
				className = 'hebrew';
			} else {
				originalObject = greek;
				className = 'greek';
			}
			markup += '<h2 class="loadNextChapter">' + book + ' ' + chapter + '</h2>';
			markup += '<ol class="wrapper">';
			$.each(translatedText, function (verseNumber, verseText) {
				markup += '<li id ="' + book.replace(/ /g, '_') + '_' + chapter + '_' + (verseNumber + 1) + '"';
				if (verseNumber === jsonVerse && chapter === parseInt(self.options.chapter, 10)) {
					markup += ' class="current-verse"';
				}
				markup += '>';
				markup += '<div class="ui-grid-a">';
				markup += '<div class="ui-block-a"><div class="' + self.options.originalSelector + ' ' + className + '">';
				if (originalObject[book][jsonChapter][verseNumber] !== undefined) {
					$.each(originalObject[book][jsonChapter][verseNumber], function (index, word) {
						markup += '<span class="word ' + word.lemma + '" title="' + word.lemma + ' ' + word.morph + '" data-lemma="' + word.lemma + '" data-type="' + className + '" data-morph="' + word.morph + '">' + word.word + '</span> ';
					});
				}
				markup += '</div></div>';
				markup += '<div class="ui-block-b"><div class="' + self.options.translationSelector + '">' + verseText.replace(/<w/gi, '<span').replace(/<\/w>/gi, '</span>').replace(/lemma="([A-Z,0-9, ]+)"/gi, 'data-lemma="$1" data-type="' + className + '" class="word $1"').replace(/morph="([A-Z,0-9, ]+)"/gi, 'title="$1" data-morph="$1"') + '</div></div>';
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
		setTimeout(function () { //this gives the page time to load so that it scrolls to the right place
			$.mobile.changePage('#reference?book=' + book + '&chapter=' + chapter + '&verse=' + verse, {
				transition: 'none'
			});
		});
		return false;
	});
});