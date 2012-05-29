/*global define, require, debug*/
define(['jquery', 'ba-debug'], function ($) {
	"use strict";
	$(document).bind('pageshow', function () {
		$(this).find('input:visible').focus();
	});
});