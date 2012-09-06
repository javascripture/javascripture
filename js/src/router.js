/*global define, require, debug*/
define(['jquery', 'jquery-router', 'ba-debug', 'order!jquery-mobile'], function ($) {
	"use strict";
	var router = new $.mobile.Router({
		"#reference(?:[?/](.*))?": "reference"
	}, {
		reference: function (type, match, ui) {
			var currentBook = $('#reference-panel').reference('option', 'book'),
				currentChapter = $('#reference-panel').reference('option', 'chapter'),
				currentVerse = $('#reference-panel').reference('option', 'verse'),
				requestedBook = router.getParams(match[1]).book,
				requestedChapter = router.getParams(match[1]).chapter,
				requestedVerse = router.getParams(match[1]).verse;
			//stop the reference panel being reloaded in the case where we are requesting the same url
			if (requestedBook !== currentBook && requestedChapter !== currentChapter) {
				if (requestedVerse !== undefined || requestedVerse !== currentVerse) {
					$('#reference-panel').reference(router.getParams(match[1]));
				}
			}
		}
	}, {
		defaultHandler: function (type, ui, page) {
			debug.debug("Default handler called due to unknown route (" + type + ", " + ui + ", " + page + ")");
		},
		defaultHandlerEvents: "s"
	});
	return router;
});