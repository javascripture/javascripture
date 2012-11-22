/*global define, require, debug*/
define(['jquery', 'jquery-mobile', 'ba-debug'], function ($) {
	"use strict";
	/*$(document).on('vclick', '.bookControl h3', function (event) {
		event.preventDefault();
		var $this = $(this).closest('.bookControl'),
			chapters = parseInt($this.data('chapters'), 10) + 1,
			book = $this.data('name'),
			$markup = $('<div data-role="controlgroup" data-type="horizontal" class="chapterControl"></div>'),
			chapter = 1;
		if ($this.find('.chapterControl').length === 0) {
			for (chapter; chapter < chapters; chapter = chapter + 1) {
				$markup.append('<a href="#reference?book=' + book + '&amp;chapter=' + chapter + '" data-role="button" data-panel="main" data-transition="none">' + chapter + '</a>');
			}
			$this.find('.ui-collapsible-content').append($markup).trigger('create');
		}
	});*/
	$('.bookControl h3').click(function () {
		event.preventDefault();
		var $this = $(this).closest('.bookControl'),
			chapters = parseInt($this.data('chapters'), 10),
			book = $this.data('name'),
			$markup = $('<div data-role="controlgroup" data-type="horizontal" class="chapterControl"></div>'),
			chapter = 1,
			verse = 1,
			className = '';
		if (chapters === 1) {
			$('#reference-panel').reference({
				book: book,
				chapter: chapter,
				verse: verse
			});
		} else {
			if ($this.find('.chapterControl').length === 0) {
				for (chapter; chapter < chapters + 1; chapter = chapter + 1) {
					if (chapter > 100) {
						className = ' class="three-digit"';
					}
					$markup.append('<a href="#reference?book=' + book + '&amp;chapter=' + chapter + '&amp;verse=' + verse + '" data-role="button" data-transition="none"' + className + '>' + chapter + '</a>');
				}
				$this.find('.ui-collapsible-content').append($markup).trigger('create');
			}
		}
	});
});