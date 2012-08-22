/*global define, require, debug*/
define(['jquery', 'strongsDictionary', 'ba-debug'], function ($, strongsDictionary) {
	"use strict";
	var words = '.word';
	$(document).on('vmouseover', words, function (event) {
		var word = $(this).attr('class'),
			markup = '';
		$('body, #word-details').addClass(word);
		/*markup += '<div class="word-details-inner ' + word + '">';
		markup += '<h3 class="' + word + '">' + word + ' ' + strongsDictionary[word].lemma + '</h3>';
		markup += '<strong>Derivation:</strong> ' + strongsDictionary[word].derivation + '<br />';
		markup += '<strong>KJV usage:</strong> ' + strongsDictionary[word].kjv_def + '<br />';
		markup += '<strong>Pronounciation:</strong> ' + strongsDictionary[word].pron + '<br />';
		markup += '<strong>Strongs definition:</strong> ' + strongsDictionary[word].strongs_def + '<br />';
		markup += '<strong>Transliteration:</strong> ' + strongsDictionary[word].xlit + '<br />';
		markup += '</div>';

		$('#word-details').html(markup);*/
	});
	$(document).on('vmouseout', words, function () {
		var word = $(this).attr('class');
		$('body').removeClass(word);
	});
	$(document).on('vclick', words, function (event) {
		var word = $(this).attr('class');
		$('html').addClass(word);
	});
});