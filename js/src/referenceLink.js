/*global define, require, debug*/
define(['jquery', 'jquery-mobile', 'ba-debug'], function ($) {
	"use strict";
	$(document).on('click', '.referenceLink', function () {
		$('.selected-reference-link').removeClass('selected-reference-link');
		$(this).closest('li').addClass('selected-reference-link');
	});
});