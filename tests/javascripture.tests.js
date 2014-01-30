/*global require, $, debug*/
require.config({
	paths: {
		'jquery': '../lib/jquery-2.3.0',
		'english-ot': '../data/kjv-ot',
		'english-nt': '../data/kjv-nt',
		'hebrew': '../data/hebrew5',
		'greek': '../data/greek4',
		'strongsDictionary': '../data/strongsDictionary',
		'strongObjectRoots': '../data/strongsObjectRoots',
		'morphologyDictionary': '../data/morphology',
		'qunit': '../lib/qunit'
	},
	priority: ['jquery']
});
QUnit.config.autostart = false;
require({
	urlArgs: "bust=" + (new Date()).getTime()
}, [
	'search',
	'morphology'
], function () { //first get the useful libraries
	"use strict";
	QUnit.start(); //Tests loaded, run tests
});
