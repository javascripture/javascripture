/*global define, require, debug*/
define(['jquery', 'english', 'hebrew', 'greek', 'strongsDictionary', 'strongObjectRoots', 'jquery-mobile', 'ba-debug'], function ($, english, hebrew, greek, strongsDictionary, strongObjectRoots) {
	"use strict";
	$.widget('javascripture.chapter', {
		options: {
			book: 'Genesis'
		},
		_init: function () {
			var self = this,
				book = this.options.book,
				markup = '';
			markup += '<ul data-role="listview">';
			markup += '<li data-role="list-divider">';
			$.each(english[book], function (index, verse) {
				markup += '<li><a href="#reference?book=' + book + '&chapter=' + (index + 1) + '" data-panel="main" data-transition="slide">' + (index + 1) + '</a></li>';
			});
			markup += '</ul>';
			self.element.find('h1').html(book);
			self.element.find('[data-role=content]').html(markup).find(':jqmData(role=listview)').listview();
		}
	});
});