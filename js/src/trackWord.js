/*global define, require, debug*/
define(['jquery', 'ba-debug'], function ($) {
	"use strict";
	var words = '#reference .wrapper a';
	$(document).on('vmouseover', words, function (event) {
		var className = $(this).attr('class');
		$('body').addClass(className);
	});
	$(document).on('vmouseout', words, function () {
		var className = $(this).attr('class');
		$('body').removeClass(className);
	});
	$(document).on('vclick', words, function (event) {
		var className = $(this).attr('class');
		$('html').addClass(className);
	});
});