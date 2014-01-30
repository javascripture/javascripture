/*global define, debug, module, test, ok*/
//define(['../api/search'], function (search) {
//	"use strict";
	var search = javascripture.api.search;
	var javascriptureTestHelper = {
		referenceCount: function (parameters, expected, message) {
			equal(search.getReferences(parameters).length, expected, message.replace(/EXPECTED/gi, expected).replace(/TERM/gi, parameters.word).replace(/LANGUAGE/gi, parameters.language));
		}
	};

	/*english tests*/
	var parameters = { //default parameters
		language: 'english',
		range: 'verse'
	};
	module("search english");
	test("search", function () {
		ok(search, 'the search object exists');
	});
	test('search for one term in a verse', function testWordInVerse () {
		expect(1);
		var results = search.getReferences({
			language: 'english',
			word: 'void',
			range: 'verse'
		});
		results.done( function() {
			start();
			equal( results.references.length, 32, 'there are 32 verses that contain "void" in Englush');
		} );
stop();
		/*equal(search.getReferences({
			language: 'english',
			word: 'cheese',
			range: 'verse'
		}).length, 3, 'there are 3 verses that contain "cheese" in English');

		equal(search.getReferences({
			language: 'english',
			word: 'immanuel',
			range: 'verse'
		}).length, 2, 'there are 2 verses that contain "immanuel" in English.  Search is case insensitive.');

		equal(search.getReferences({
			language: 'english',
			word: 'Immanuel',
			range: 'verse'
		}).length, 2, 'there are 2 verses that contain "Immanuel" in English.');*/

	});

	/*test('search for form or void in the same verse', function () {
		equal(search.getReferences({
			language: 'english',
			word: 'form void',
			range: 'verse',
			clusivity: 'inclusive'
		}).length, 230, 'there are 230 verses that contain "form" or "void"');
	});
	test('search for form and void in the same verse', function () {
		equal(search.getReferences({
			language: 'english',
			word: 'form void',
			range: 'verse',
			clusivity: 'exclusive'
		}).length, 2, 'there are 2 verses that contain "form" and "void"');
	});

	test('search for form and void in the same chapter', function () {
		equal(search.getReferences({
			language: 'english',
			word: 'form void',
			range: 'chapter',
			clusivity: 'exclusive'
		}).length, 8, 'there are 8 chapters that contain "form" and "void"');
	});

	test('search for strongs number in a verse in english', function () {
		expect(3);
		equal(search.getReferences({
			language: 'english',
			lemma: 'H1234',
			range: 'verse'
		}).length, 51, 'there are 51 occurances of "H1234" in English');
		equal(search.getReferences({
			language: 'english',
			lemma: 'H1235',
			range: 'verse'
		}).length, 2, 'there are 2 occurances of "H1235" in English');
		equal(search.getReferences({
			language: 'english',
			lemma: 'H3588',
			range: 'verse'
		}).length, 47, 'there are 47 occurances of "H3588" in English');
	});

	test('search for a morphology in a verse in english', function () {
		expect(1);
		equal(search.getReferences({
			language: 'english',
			morph: 'TH8799',
			range: 'verse'
		}).length, 19877, 'there are 19877 occurances of "TH8799" in English');
	});

	test('search for a word and strongs number in a verse in english', function () {
		expect(2);
		equal(search.getReferences({
			clusivity: 'inclusive',
			language: 'english',
			lemma: 'H3588',
			range: 'verse',
			word: 'form'
		}).length, 245, 'there are 245 occurances of "H3588" or "form" in English');
		equal(search.getReferences({
			clusivity: 'exclusive',
			language: 'english',
			lemma: 'H3588',
			range: 'verse',
			word: 'God'
		}).length, 13, 'there are 12 occurances of "H3588" and "God" in the same verse in English');

	});

	test('search for a word and strongs number in a word in english', function () {
		expect(2);
		equal(search.getReferences({
			clusivity: 'exclusive',
			language: 'english',
			lemma: 'H7363',
			range: 'word',
			word: 'moved'
		}).length, 1, 'there is 1 occurance of "H7363" translated "moved" in English');
		equal(search.getReferences({
			clusivity: 'exclusive',
			language: 'english',
			lemma: 'H1877',
			range: 'word',
			word: 'grass'
		}).length, 8, 'there are 8 occurances of "H1877" translated "grass" in English');

	});

	module("search hebrew");
	parameters.language = 'hebrew';
	parameters.word = '';
	test('search for a strongs number in a verse in hebrew', function testLemmaInVerse () {
		expect(3);
		parameters.lemma = 'H1234';
		javascriptureTestHelper.referenceCount(parameters, 51, 'there are EXPECTED verses that contain "TERM" in LANGUAGE');

		parameters.lemma = 'H1235';
		javascriptureTestHelper.referenceCount(parameters, 2, 'there are EXPECTED verses that contain "TERM" in LANGUAGE');

		parameters.lemma = 'H3588';
		javascriptureTestHelper.referenceCount(parameters, 4479, 'there are EXPECTED verses that contain "TERM" in LANGUAGE');

	});

	module("search greek");
	test('search for a strongs number in greek', function () {
		expect(2);
		equal(search.getReferences({
			language: 'greek',
			lemma: 'G363'
		}).length, 76, 'there are 76 occurance of "G363" in Greek');
		equal(search.getReferences({
			language: 'greek',
			lemma: 'G1877'
		}).length, 3, 'there are 3 occurances of "G1877" in Greek');
	});
	test('search for a morphology in greek', function () {
		expect(2);
		equal(search.getReferences({
			language: 'greek',
			morph: 'V-PAO-3S'
		}).length, 16, 'there are 16 occurance of "V-PAO-3S" in Greek');
		equal(search.getReferences({
			language: 'greek',
			morph: 'V-2ADO-3S'
		}).length, 17, 'there are 17 occurances of "V-2ADO-3S" in Greek');
	});
	test('search for a mood in greek', function () {
		expect(1);
		equal(search.getReferences({
			language: 'greek',
			morph: 'V-(.*)O-'
		}).length, 68, 'there are 68 occurances of the optative mood in Greek');
	});*/

//});
