/*global define, $, module, test, ok, bibleObject */
define(['../external/qunit', 'src/loadData'], function () {
	"use strict";
	module("loadData");
	test("english loaded", function () {
		ok(bibleObject);
	});
	test("hebrew loaded", function () {
		ok(hebrewObject);
	});
	test("greek loaded", function () {
		ok(greekObject);
	});
});