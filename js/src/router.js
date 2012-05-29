/*global define, require, debug*/
define(['jquery', 'jquery-mobile', 'ba-debug'], function ($) {
	"use strict";
	// Listen for any attempts to call changePage().
	$(document).bind('pagebeforechange', function (event, data) {

		// We only want to handle changePage() calls where the caller is
		// asking us to load a page by URL.
		if (typeof (data.toPage === 'string')) {

			// We are being asked to load a page by URL, but we only
			// want to handle URLs that request the data for a specific
			// category.
			var u = $.mobile.path.parseUrl(data.toPage);
			if (typeof (u.hash) !== 'undefined') {
				if (u.hash === "#reference") {
					$(u.hash).reference(data.options.pageData);
				}
				if (u.hash === "#search") {
					if (typeof (data.options.pageData) !== "undefined" && typeof (data.options.pageData.term) !== "undefined") {
						$(u.hash).search({
							'term': data.options.pageData.term
						});
					} else {
						$(u.hash).html('Sorry an error occourred');
					}
				}
				if (u.hash === "#chapter") {
					if (typeof (data.options.pageData) !== "undefined" && typeof (data.options.pageData.book) !== "undefined") {
						$(u.hash).chapter({
							'book': data.options.pageData.book
						});
					} else {
						$(u.hash).html('Sorry an error occourred');
					}
				}
				if (u.hash === "#word") {
					if (typeof (data.options.pageData) !== "undefined" && typeof (data.options.pageData.word) !== "undefined") {
						$(u.hash).word({
							'word': data.options.pageData.word
						});
					} else {
						$(u.hash).html('Sorry an error occourred');
					}
				}
				if (u.hash === "#gotoForm") {
					$('#gotoReference').select();
				}
				//e.preventDefault();
			}
		}
	});
});