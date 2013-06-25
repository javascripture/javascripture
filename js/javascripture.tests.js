/*global require, $, debug*/
require.config({
	paths: {
		'jquery': 'external/jquery-1.7.2',
		'jquery-mobile': 'external/jquery.mobile-1.2.0.min',
		'ba-debug': 'external/ba-debug',
		'english': '../data/kjvdwyer6',
		'hebrew': '../data/hebrew5',
		'greek': '../data/greek4',
		'strongsDictionary': '../data/strongsDictionary',
		'strongObjectRoots': '../data/strongsObjectRoots',
		'morphologyDictionary': '../data/morphology'
	},
	priority: ['jquery']
});
require({
	baseUrl: 'js',
	urlArgs: "bust=" + (new Date()).getTime()
}, [
	'tests/search',
	'tests/morphology'
], function () { //first get the useful libraries
	"use strict";
});
