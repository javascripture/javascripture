/*global define, debug*/
define(['jquery', 'jquery-mobile', 'ba-debug'], function ($) {
	"use strict";
	var moduleName = 'bookControl';
	$('.' + moduleName + ' h3').click(function (event) {
		var $this = $(this).closest('.bookControl'),
			chapters = parseInt($this.data('chapters'), 10),
			book = $this.data('name'),
			$markup = $('<div data-role="controlgroup" data-type="horizontal" class="chapterControl"></div>'),
			chapter = 1,
			verse = 1,
			className = '';
		if (chapters !== 1) {
			event.preventDefault();
			if ($this.find('.chapterControl').length === 0) {
				for (chapter; chapter < chapters + 1; chapter = chapter + 1) {
					if (chapter > 100) {
						className = ' class="three-digit"';
					}
					$markup.append('<a href="#reference?book=' + book + '&amp;chapter=' + chapter + '&amp;verse=' + verse + '" data-role="button" data-transition="none"' + className + '>' + chapter + '</a>');
				}
				$this.find('.ui-collapsible-content').append($markup).trigger('create');
			}
		} else {
			window.location.hash = $this.find( 'a' ).prop( 'href' ).split('#')[1];
		}
	});
	$(document).on('mouseup', '.bookControl a', function () {
		$('.bookControl .ui-btn-active').removeClass('ui-btn-active');
	});
	
	$('.' + moduleName + ' h3').each( function( key, element ) {
		var $element = $(element),
		    $bookControl = $element.closest('.bookControl'),
			chapters = parseInt($bookControl.data('chapters'), 10),
			book = $bookControl.data('name');
		if (chapters === 1) {
			$element.find('a').prop( 'href', '#reference?book=' + book );
		}
	});
	debug.debug(moduleName + ' loaded');
});