/*global define, require, debug*/
define(['jquery', 'strongsDictionary', 'ba-debug'], function ($, strongsDictionary) {
	"use strict";
	$(document).on('vclick', '.wordDetails', function (event) {
		var word = $(this).data('lemma'),
			markup = '';
		$('body').addClass(word);
		markup += '<div class="word-details-inner">';
		markup += '<h3 class="' + word + '">' + word + ' ' + strongsDictionary[word].lemma + '</h3>';
		markup += '<strong>Derivation:</strong> ' + strongsDictionary[word].derivation + '<br />';
		markup += '<strong>KJV usage:</strong> ' + strongsDictionary[word].kjv_def + '<br />';
		markup += '<strong>Pronounciation:</strong> ' + strongsDictionary[word].pron + '<br />';
		markup += '<strong>Strongs definition:</strong> ' + strongsDictionary[word].strongs_def + '<br />';
		markup += '<strong>Transliteration:</strong> ' + strongsDictionary[word].xlit + '<br />';
		markup += '</div>';

		$('#wordDetails').html(markup).popup('open');
	});
});