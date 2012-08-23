/*global define, require, debug*/
define(['jquery', 'jquery-router', 'ba-debug', 'order!jquery-mobile'], function ($) {
	"use strict";
	var router = new $.mobile.Router({
		"#reference(?:[?/](.*))?": "reference"
	},{
		reference: function(type,match,ui){
			$('#reference-panel').reference(router.getParams(match[1]));
		}
	}, { 
		defaultHandler: function(type, ui, page) {
			console.log("Default handler called due to unknown route (" 
				+ type + ", " + ui + ", " + page + ")");
		},
		defaultHandlerEvents: "s"
	});
	//got to go in here somewhere$("."+$.mobile.activeBtnClass).removeClass($.mobile.activeBtnClass);
/*	var router = new $.mobile.Router([{
		"#reference(?:[?](.*))?": {
			handler: function (type, match, ui, page, event) {
				event.preventDefault();
				debug.debug('g');
				$('#reference').reference(router.getParams(match[1]));
			},
			events: "bC"
		},
		"#word(?:[?](.*))?": {
			handler: function (type, match, ui, page, event) {
				event.preventDefault();
				debug.debug(router.getParams(match[1]));
				$('#word').word(router.getParams(match[1]));
			},
			events: "bC"
		},
		".": {
			handler: function (type, match, ui, page, event) {
				event.preventDefault();
			},
			events: "bc,bs,i,c,s,bh,h,rm,bl,l"
		}
	}]);
	// Listen for any attempts to call changePage().
	/*$(document).bind('pagebeforechange', function (event, data) {
		// We only want to handle changePage() calls where the caller is
		// asking us to load a page by URL.
		if (typeof (data.toPage === 'string')) {
			// We are being asked to load a page by URL, but we only
			// want to handle URLs that request the data for a specific
			// category.
			var u = $.mobile.path.parseUrl(data.toPage);
			if (u.hash !== undefined) {
				if (u.hash === "#reference") {
					debug.debug(data.options.pageData);
					//event.preventDefault();
					$(u.hash).reference(data.options.pageData);
				}
				if (u.hash === "#search") {
					event.preventDefault();
					if (data.options.pageData !== undefined && data.options.pageData.term !== undefined) {
						$(u.hash).search({
							'term': data.options.pageData.term
						});
					} else {
						$(u.hash).html('Sorry an error occourred');
					}
				}
				if (u.hash === "#chapter") {
					event.preventDefault();
					if (data.options.pageData !== undefined && data.options.pageData.book !== undefined) {
						$(u.hash).chapter({
							'book': data.options.pageData.book
						});
					} else {
						$(u.hash).html('Sorry an error occourred');
					}
				}
				if (u.hash === "#word") {
					event.preventDefault();
					if (data.options.pageData !== undefined && data.options.pageData.word !== undefined) {
						$(u.hash).word({
							'word': data.options.pageData.word,
							'type': data.options.pageData.type
						});
					} else {
						$(u.hash).html('Sorry an error occourred');
					}
				}
			}
		}
	});*/
});