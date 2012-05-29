/*global require, $, debug*/
require.config({
	paths: {
		'jquery': 'external/jquery-1.7.1',
		'jquery-mobile': 'external/jquery.mobile-1.0.1',
		'ba-debug': 'external/ba-debug',
		'english': '../data/kjvdwyer4',
		'hebrew': '../data/hebrew5',
		'greek': '../data/greek4',
		'strongsDictionary': '../data/strongsDictionary',
		'strongObjectRoots': '../data/strongsObjectRoots'
	},
	priority: ['jquery']
});
require({
	baseUrl: 'js',
	urlArgs: "bust=" +  (new Date()).getTime()
}, [
	'tests/loadData',
	'tests/gotoReference',
	'tests/keyboardShortcuts'
], function () { //first get the useful libraries
	"use strict";
});