/*global require, $, debug*/
var start = new Date();
require.config({
	paths: {
		'jquery': 'external/jquery-1.7.2',
		'jquery-mobile': 'external/jquery.mobile-1.2.0-alpha.1.min',
		'multiview': 'external/multiview',
		'pageparams': 'external/jquery.mobile.page.params',
		'jquery-router': 'external/jquery.mobile.router',
		'order': 'external/order-1.0.0',
		'ba-debug': 'external/ba-debug',
		'bible': '../data/bible',
		'english': '../data/kjvdwyer4',
		'hebrew': '../data/hebrew5',
		'greek': '../data/greek4',
		'strongsDictionary': '../data/strongsDictionary',
		'strongObjectRoots': '../data/strongsObjectRoots',
		'morphology': '../data/morphology'
	},
	priority: ['jquery'],
	waitSeconds: 20000
});
require({
	baseUrl: 'js',
	urlArgs: "bust=" +  (new Date()).getTime()
}, [
	'jquery',
	'ba-debug',
	'jquery-router',
	'order!jquery-mobile',
	//'pageparams',
	//'multiview',
	'order!src/bookControl'
], function () { //first get the useful libraries
	"use strict";
	debug.debug('Jquery mobile loading time: ' + (new Date() - start) + ' miliseconds');
	setTimeout(function () { //to give the framework a chance to load
		$.mobile.showPageLoadingMsg('a', 'Loading bible'); //messages could be more specific
		require(['english', 'hebrew', 'greek', 'strongsDictionary', 'strongObjectRoots'], function () {
			$.mobile.hidePageLoadingMsg();
			require([
				'src/router',
				'order!src/chapter',
				'order!src/focusFirstInput',
				'order!src/keyboardShortcuts',
				'order!src/loadNextChapter',
				'order!src/reference',
				'order!src/referenceLink',
				//'order!src/search',
				'order!src/word',
				'order!src/wordDetails'
			], function (router) { //now build the menu and show the first reference
				debug.debug('Total loading time: ' + (new Date() - start) + ' miliseconds');
				$('#reference-panel').reference(router.getParams(window.location.hash));
			});
		});
	});
});