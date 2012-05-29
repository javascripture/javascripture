/*global define, require, debug*/
define(['jquery', 'strongsDictionary', 'strongObjectRoots', 'jquery-mobile', 'ba-debug'], function ($, strongsDictionary, strongObjectRoots) {
	"use strict";
	$.widget('javascripture.word', {
		options: {
			word: 'H1234'
		},
		_init: function () {
			var self = this,
				word = this.options.word,
				markup = '';
			if (!$('#' + word).length) {
				markup += '<div data-role="collapsible" data-collapsed="false" id="' + word + '">';
				markup += '<h3 class="' + word + '">' + word + ' ' + strongsDictionary[word].lemma + '</h3>';
				markup += '<strong>Derivation:</strong> ' + strongsDictionary[word].derivation + '<br />';
				markup += '<strong>KJV usage:</strong> ' + strongsDictionary[word].kjv_def + '<br />';
				markup += '<strong>Pronounciation:</strong> ' + strongsDictionary[word].pron + '<br />';
				markup += '<strong>Strongs definition:</strong>' + strongsDictionary[word].strongs_def + '<br />';
				markup += '<strong>Transliteration:</strong> ' + strongsDictionary[word].xlit + '<br />';
				markup += '</div>';
				self.element.find('[data-role=collapsible-set]').append(markup).collapsibleset('refresh');
				self.element.find('h3.' + word).append('<a data-role="button" data-icon="delete" data-iconpos="notext" data-word="' + word + '" class="deleteWord">Delete</a>');
				self.element.find('[data-role=button]').button();
			}
		}
	});
	$('#word').on('click', '.deleteWord', function (event) {
		event.preventDefault();
		event.stopPropagation();
		var word = $(this).data('word');
		$('#' + word).remove();
		$('html').removeClass(word);
	});
});