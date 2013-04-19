/*global define, debug*/
define(['jquery', 'src/router', 'bible', 'english', 'hebrew', 'greek', 'strongsDictionary', 'wordFamilies', 'translateLiterally', 'jquery-mobile', 'ba-debug'], function ($, router, bible, english, hebrew, greek, strongsDictionary, wordFamilies, translateLiterally) {
	"use strict";
	$.widget('javascripture.reference', {
		options: {
			book: 'Genesis',
			chapter: 1,
			chapterWrapperClass: 'chapter-wrapper',
			verse: 1,
			originalSelector: 'original',
			translationSelector: 'translation',
			literalTranslation: false
		},
		_init: function () {
			var self = this,
				markup = '',
				book = this.options.book,
				chapter = parseInt(this.options.chapter, 10),
				verse = parseInt(this.options.verse, 10),
				$content = this.element,
				//$contentScroller = this.element.closest('body'),
				verseSelector,
				//contentHeight,
				//contentTop,
				books = bible.Data.books;
				/*nextChapter = self.getOffsetChapter(book, chapter, 1),
				prevChapter = self.getOffsetChapter(book, chapter, -1),
				previousBook,
				previousBookLastChapter,
				next,
				nextBook,
				nextBookFirstChapter;*/
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
			verseSelector = '#' + self.referenceToId(book, chapter, verse);
			if (!$(verseSelector).length) {
				$.mobile.showPageLoadingMsg('a', 'Loading ' + book + ' ' + chapter + ':' + verse);
				setTimeout(function () { //give the loading message a chance to show
					markup += self.createMarkup(book, chapter, verse);
					$content.html(markup);
					self.setOffsetChapterData(book, chapter, 'prev', -1);
					self.setOffsetChapterData(book, chapter, 'next', 1);
					self.loadChapter('next');
					self.loadChapter('prev');
					$.mobile.hidePageLoadingMsg();
				});
			} else {
				$('.current-verse').removeClass('current-verse');
				$(verseSelector).addClass('current-verse');
			}
			setTimeout(function () { //give the loading message a chance to hide
				self.scrollToReference(book, chapter, verse, -$(window).height() / 3);
			});
		},
		createMarkup: function (book, chapter, verse) {
			var self = this,
				markup = '',
				jsonChapter = chapter - 1, //because javascript arrays count from 0
				jsonVerse = verse - 1, //because javascript arrays count from 0
				translatedText = english[book][jsonChapter],
				language = '',
				originalObject,
				chapterWrapperId;
			if (hebrew[book] !== undefined) {
				originalObject = hebrew;
				language = 'hebrew';
			} else {
				originalObject = greek;
				language = 'greek';
			}
			chapterWrapperId = self.referenceToId(book, chapter);
			markup += '<div id="' + chapterWrapperId + '" class="' + self.options.chapterWrapperClass + '" data-book="' + book + '" data-chapter="' + chapter + '">';
			markup += '<div class="sticky-panel-wrapper"><h2 class="stickyPanel" data-top-space="42" data-bottom-waypoint="#' + chapterWrapperId + '">' + book + ' ' + chapter + '</h2></div>';
			markup += '<ol class="wrapper">';
			$.each(translatedText, function (verseNumber, verseText) {
				markup += '<li id ="' + self.referenceToId(book, chapter, verseNumber + 1) + '"';
				if (verseNumber === jsonVerse && chapter === parseInt(self.options.chapter, 10)) {
					markup += ' class="current-verse"';
				}
				markup += '>';
				markup += '<div class="ui-grid-a">';
				markup += '<div class="ui-block-a">';
				markup += '<div class="' + self.options.originalSelector + ' ' + language + '">';
				if (originalObject[book][jsonChapter][verseNumber] !== undefined) {
					markup += self.getOriginalVerseMarkup(originalObject[book][jsonChapter][verseNumber], language, 'original');
				}
				markup += '</div>';
				markup += '</div>';
				markup += '<div class="ui-block-b">';
				if (self.options.literalTranslation && translateLiterally) {
					markup += self.getOriginalVerseMarkup(originalObject[book][jsonChapter][verseNumber], language, 'literal');
				} else {
					//markup += self.getTranslatedVerseMarkup(verseText, language);
					markup += self.getOriginalVerseMarkup(verseText, language, 'original');
				}
				markup += '</div>';
				markup += '</div>';
				markup += '</li>';
			});
			markup += '</ol>';
			markup += '</div>';
			return markup;
		},
		setChapterData: function (chapterObject, position) {
			this.element.data(position, chapterObject);
		},
		setOffsetChapterData: function (book, chapter, position, offset) {
			var chapterObject = this.getOffsetChapter(book, chapter, offset);
			this.setChapterData(chapterObject, position);
		},
		//given a book and a chapter and an offset, get the chapter that exists at this offset
		getOffsetChapter: function (book, chapter, offset) {
			var offsetChapter = {},
				offsetChapterNumber = parseInt(chapter, 10) + offset,
				offsetNumberJavascript = offsetChapterNumber - 1,
				offsetBook;
			if (english[book] && english[book][offsetNumberJavascript] !== undefined) {
				offsetChapter.book = book;
				offsetChapter.chapter = offsetChapterNumber;
			} else {
				//get the offset book
				$.each(bible.Data.books, function (index, loopBookArray) {
					if (loopBookArray[0] === book) {
						offsetBook = index + offset;
						if (bible.Data.books[offsetBook] !== undefined) {
							offsetChapter.book = bible.Data.books[offsetBook][0];
							//only supports offsets of 1 or -1. to make it work with bigger values this will have to change
							if (offset > 0) {
								offsetChapter.chapter = 1;
							} else {
								offsetChapter.chapter = bible.Data.verses[offsetBook].length;
							}
						}
					}
				});
			}
			return offsetChapter;
		},
		referenceUrl: function (referenceObject) {
			var referenceString = '';
			referenceString += 'book=' + referenceObject.book;
			if (referenceObject.chapter) {
				referenceString += '&chapter=' + referenceObject.chapter;
			}
			if (referenceObject.verse) {
				referenceString += '&verse=' + referenceObject.verse;
			}
			return referenceString;
		},
		scrollToChapter: function (chapter, position) { //needs refactoring
			var chapterObject = this.element.data(chapter),
				verse = 1,
				offset = -108,
				verseHeight;
			if (position === 'end') {
				//get the last verse
				$.each(bible.Data.books, function (index, loopBookArray) {
					if (loopBookArray[0] === chapterObject.book) { //this is very labour intensive
						verse = bible.Data.verses[index][chapterObject.chapter - 1];
					}
				});
				verseHeight = $('#' + this.referenceToId(chapterObject.book, chapterObject.chapter, verse)).height();
				offset = offset - $(window).height() - verseHeight;
			}
			this.scrollToReference(chapterObject.book, chapterObject.chapter, verse, offset);
		},
		scrollToReference: function (book, chapter, verse, offset) {
			var verseSelector = '#' + this.referenceToId(book, chapter, verse);
			debug.debug(verseSelector);
			$('body').scrollTo($(verseSelector), { offset: offset });
		},
		loadChapterBefore: function () {
			if (this.loadChapter('prev')) {
				this.removeChapter('next');
				this.scrollToChapter('current');
			}
		},
		loadChapterAfter: function () {
			this.loadChapter('next');
		},
		loadChapter: function (position) {
			var chapterObject = this.element.data(position),
				book,
				chapter,
				chapterLoaded = false;
			if (chapterObject.book !== undefined && chapterObject.chapter !== undefined) {
				book = chapterObject.book;
				chapter = chapterObject.chapter;
				if (position === 'prev') {
					this.setOffsetChapterData(book, chapter, 'prev', -1);
					this.setOffsetChapterData(book, chapter, 'current', 1);
					//update url?
					this.element.prepend(this.createMarkup(book, chapter));
				} else if (position === 'next') {
					this.setOffsetChapterData(book, chapter, 'next', 1);
					this.setOffsetChapterData(book, chapter, 'current', -1);
					//update url?
					this.element.append(this.createMarkup(book, chapter));
				}
				$(document).trigger('createWidgets');
				chapterLoaded = true;
			}
			return chapterLoaded;
		},
		removeChapter: function (position) {
			var selector, chapter, chapterObject;
			if (position === 'next') {
				selector = 'last';
			}
			if (position === 'prev') {
				selector = 'first';
			}
			chapter = this.element.find('.' + this.options.chapterWrapperClass + ':' + selector + '-child');
			chapterObject = {
				book: chapter.data('book'),
				chapter: chapter.data('chapter')
			};
			//update the prev/next chapter data so that we don't get out of sync
			this.setChapterData(chapterObject, position);
			chapter.remove();
		},
		getReferenceId: function () {
			var book = this.options.book,
				chapter = this.options.chapter,
				verse = this.options.verse;
			return this.referenceToId(book, chapter, verse);
		},
		referenceToId: function (book, chapter, verse) {
			var referenceToId = book.replace(/ /g, '_') + '_' + chapter;
			if (verse) {
				referenceToId += '_' + (verse);
			}
			return referenceToId;
		},
		getOriginalVerseMarkup: function (verse, language, translationType) {
			var markup = '';
			$.each(verse, function (index, wordObject) {
				markup += '<span class="word ';
				if (wordObject.lemma !== undefined) {
					markup += wordObject.lemma + ' ' + wordFamilies.getFamily(wordObject.lemma);
				}
				if (wordObject.morph !== undefined) {
					markup += ' ' + wordObject.morph;
				}
				markup += '" title="' + wordObject.lemma;
				if (wordObject.morph !== undefined) {
					markup += ' ' + wordObject.morph;
				}
				markup += '" data-word="' + wordObject.word + '" ';
				markup += 'data-lemma="' + wordObject.lemma + '" ';
				markup += 'data-language="' + language + '" ';
				markup += 'data-range="word" ';
				markup += 'data-family="' + wordFamilies.getFamily(wordObject.lemma) + '" ';
				if (wordObject.morph !== undefined) {
					markup += 'data-morph="' + wordObject.morph + '"';
				}
				markup += '>';
				if (translationType === 'literal') {
					markup += translateLiterally.getWord(wordObject);
				} else {
					markup += wordObject.word;
				}
				markup += '</span> ';
			});
			return markup;
		},
		getTranslatedVerseMarkup: function (verseText, language) {
			var self = this,
				markup = '',
				$markup,
				family,
				verseText = verseText[0];
			markup += '<div class="' + self.options.translationSelector + '">';
			markup += verseText
				.replace(/<w/gi, '<span')
				.replace(/<\/w>/gi, '</span>')
				.replace(/lemma="([A-Z,0-9, ]+)"/gi, 'data-lemma="$1" data-language="' + language + '" class="word" title="$1"')
				.replace(/>([A-Z,a-z,0-9, ,\-]+)</gi, ' data-word="$1">$1<')
				.replace(/morph="([A-Z,a-z,0-9, ,\-]+)"/gi, 'data-morph="$1"')
				.replace(/morph="robinson:([A-Z,a-z,0-9, ,\-]+)"/gi, 'data-morph="$1"');
			markup += '</div>';
			$markup = $(markup);
			$markup.find('span.word').each(function () {
				var $this = $(this),
					lemma = $this.data('lemma');
				if (lemma === 'added') {
					$this.addClass(lemma);
				} else if (lemma !== undefined) {
					family = wordFamilies.getFamily($this.data('lemma'));
					$this.addClass(family).attr('data-family', family);
				} else {
					debug.debug('no lemma for: ' + $this.html());
				}
				if ($this.data('morph') !== undefined) {
					$this.attr('title', $this.attr('title') + ' ' + $this.data('morph'));
				}
			});
			return $markup.prop('outerHTML');
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
	$(document).on('click', '.referenceLink', function () {
		$('.ui-btn-active').removeClass('ui-btn-active');
		$(this).addClass('ui-btn-active');
	});
	$(document).on('click', '#literalTranslation', function () {
		setTimeout(function () { //leave some time for the DOM to update
			$('#reference-panel').reference('option', 'literalTranslation', $('[name="literalTranslation"]').is(':checked'));
		});
	});
	//$(document).on('click', 'a', function () {
		//$('.ui-btn-active').removeClass('ui-btn-active');
	//});
	$(window).bind('scrollstop', function () {
		var scrollTop = $(this).scrollTop(),
			contentHeight = $('#reference-panel').height() - $(this).height();
		if (scrollTop === 0) {
			$('#reference-panel').reference('loadChapterBefore');
		}
		if (scrollTop > contentHeight) {
			$('#reference-panel').reference('loadChapterAfter');
		}
	});
});
