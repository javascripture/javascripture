/*global require, $, debug*/
require.config({
	paths: {
		'jquery': 'external/jquery-1.7.2',
		'jquery-mobile': 'external/jquery.mobile-1.2.0.min',
		'ba-debug': 'external/ba-debug',
		'english-ot': '../data/kjv-ot',
		'english-nt': '../data/kjv-nt',
		'hebrew': '../data/hebrew5',
		'greek': '../data/greek4',
		'strongsDictionary': '../data/strongsDictionary',
		'strongObjectRoots': '../data/strongsObjectRoots',
		'morphologyDictionary': '../data/morphology',
		'qunit': 'external/qunit'
	},
	priority: ['jquery']
});
QUnit.config.autostart = false;
require({
	baseUrl: 'js',
	urlArgs: "bust=" + (new Date()).getTime()
}, [
	'tests/search',
	'tests/morphology'
], function () { //first get the useful libraries
	"use strict";
	QUnit.start(); //Tests loaded, run tests
});
