/*global define, $, module, test, ok, bibleObject */
define(['../external/qunit', 'src/loadReference'], function () {
	"use strict";
	module("loadReference");
	
	//create
	$('#reference').loadReference({
		'reference': 'Gen.1.1'
	});

	test("original loaded", function () {
		var originalSelector = $.javascripture.loadReference.prototype.options.originalSelector;
		ok($('.' + originalSelector).length);
	});
	test("original loaded", function () {
		var translationSelector = $.javascripture.loadReference.prototype.options.originalSelector;
		ok($('.' + translationSelector).length);
	});
});