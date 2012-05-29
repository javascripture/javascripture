/*global define, require, debug*/
define(['jquery', 'ba-debug'], function ($) {
	"use strict";
	$(document).on('keypress', function (event) {
		//debug.debug(event.keyCode);
		$('#keyCode' + event.keyCode).click();
	});
	$(document).on('keyup', function (event) { //for escape - for some reason this is not detected by keypress
		if (event.keyCode === 27) {
			$('a[title=Close]').click();
		}
	});
});