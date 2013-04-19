/*global define, debug*/
define(['jquery', 'ba-debug'], function ($) {
	"use strict";
	$(document).on('keypress', function (event) {
		debug.debug(event.keyCode);
		$('#keyCode' + event.keyCode).click();
		if (event.keyCode === 14 || event.keyCode === 16 || event.keyCode === 45 || event.keyCode === 61) {
			if ($('#results .collapsible-wrapper').length) { //there should be a better way to see if the widget has been initialized
				var currentLink = $('#results').find('.ui-btn-active'),
					newLink;
				if (event.keyCode === 61 || event.keyCode === 14) {
					newLink = currentLink.closest('li').next().find('a');
				}
				if (event.keyCode === 45 || event.keyCode === 16) {
					newLink = currentLink.closest('li').prev().find('a');
				}
				newLink.click();
				newLink.closest('ol').scrollTo(newLink);
			}
		}
	});
	$(document).on('keyup', function (event) { //for escape - for some reason this is not detected by keypress
		if (event.keyCode === 27) {
			$('a[title=Close]').click();
		}
	});
});