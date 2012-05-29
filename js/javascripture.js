/*global require, $, debug*/
var start = new Date();
require.config({
	paths: {
		'jquery': 'external/jquery-1.7.1',
		'jquery-mobile': 'external/jquery.mobile-1.1.0',
		'multiview': 'external/multiview',
		'pageparams': 'external/jquery.mobile.page.params',
		'ba-debug': 'external/ba-debug',
		'bible': '../data/bible',
		'english': '../data/kjvdwyer4',
		'hebrew': '../data/hebrew5',
		'greek': '../data/greek4',
		'strongsDictionary': '../data/strongsDictionary',
		'strongObjectRoots': '../data/strongsObjectRoots'
	},
	priority: ['jquery', 'jquery-mobile'],
	waitSeconds: 20000
});
require({
	baseUrl: 'js',
	urlArgs: "bust=" +  (new Date()).getTime()
}, [
	'jquery',
	'jquery-mobile',
	'pageparams',
	'multiview',
	'ba-debug'
], function () { //first get the useful libraries
	"use strict";
	debug.debug('Jquery mobile loading time: ' + (new Date() - start) + ' miliseconds');
	setTimeout(function () { //to give the framework a chance to load
		$.mobile.showPageLoadingMsg('a', 'Loading data'); //TODO - messages could be more specific
		require(['english', 'hebrew', 'greek', 'strongsDictionary', 'strongObjectRoots'], function () {
			$.mobile.hidePageLoadingMsg();
			require([
				'src/chapter',
				'src/focusFirstInput',
				'src/keyboardShortcuts',
				'src/loadNextChapter',
				'src/reference',
				'src/router',
				'src/search',
				'src/trackWord',
				'src/word'
			], function () { //now build the menu and show the first reference
				debug.debug('Total loading time: ' + (new Date() - start) + ' miliseconds');
				$.mobile.changePage('');
			});
		});
	});
});