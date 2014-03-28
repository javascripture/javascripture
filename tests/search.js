/*global start, equal, module, test, ok, asyncTest, expect, javascripture*/
/*var javascriptureTestHelper = {
	referenceCount: function (parameters, expected, message) {
		equal(search.getReferences(parameters).length, expected, message.replace(/EXPECTED/gi, expected).replace(/TERM/gi, parameters.word).replace(/LANGUAGE/gi, parameters.language));
	}
};*/

module("search english");
test("search", function () {
	ok(javascripture.api.search, 'the search object exists');
});
asyncTest('search for one term in a verse', function testWordInVerse () {
	expect(2);
	var search1 = Object.create( javascripture.api.search );
	search1.getReferences( {
		language: 'english',
		word: 'void',
		range: 'verse'
	} );
	equal( search1.countResults(), 32, 'there are 32 verses that contain "void" in English');
	start();

	var search2 = Object.create( javascripture.api.search );
	search2.getReferences( {
		language: 'english',
		word: 'cheese',
		range: 'verse'
	} );
	equal( search2.countResults(), 3, 'there are 3 verses that contain "cheese" in English');
} );

asyncTest('test that search is case insensitve', function testWordInVerse () {
	expect(2);
	var search3 = Object.create( javascripture.api.search );
	search3.getReferences( {
		language: 'english',
		word: 'immanuel',
		range: 'verse'
	} );
	equal( search3.countResults(), 2, 'there are 2 verses that contain "immanuel" in English.  Search is case insensitive.');
	start();

	var search4 = Object.create( javascripture.api.search );
	search4.getReferences( {
		language: 'english',
		word: 'Immanuel',
		range: 'verse'
	} );
	equal( search4.countResults(), 2, 'there are 2 verses that contain "Immanuel" in English.  Search is case insensitive.');
});

asyncTest('search for form or void in the same verse', function testWordInVerse () {
	expect(1);
	var search5 = Object.create( javascripture.api.search );
	search5.getReferences( {
		language: 'english',
		word: 'form void',
		range: 'verse',
		clusivity: 'inclusive'
	} );
	equal( search5.countResults(), 230, 'there are 230 verses that contain "form" or "void"');
	start();
});

asyncTest('search for form and void in the same verse', function () {
	expect(1);
	var search6 = Object.create( javascripture.api.search );
	search6.getReferences( {
		language: 'english',
		word: 'form void',
		range: 'verse',
		clusivity: 'exclusive'
	} );
	equal( search6.countResults(), 2, 'there are 2 verses that contain "form" and "void"');
	start();
});

asyncTest('search for strongs number in a verse in english', function () {
	expect(3);
	var search1 = Object.create( javascripture.api.search );
	search1.getReferences( {
		language: 'english',
		lemma: 'H1234',
		range: 'verse'
	} );
	equal( search1.countResults(), 51, 'there are 51 occurances of "H1234" in English');
	start();

	var search2 = Object.create( javascripture.api.search );
	search2.getReferences( {
		language: 'english',
		lemma: 'H1235',
		range: 'verse'
	} );
	equal( search2.countResults(), 2, 'there are 2 occurances of "H1235" in English');

	var search3 = Object.create( javascripture.api.search );
	search3.getReferences( {
		language: 'english',
		lemma: 'H3588',
		range: 'verse'
	} );
	equal( search3.countResults(), 47, 'there are 47 occurances of "H3588" in English, some of which are in the same verse');
});

asyncTest( 'search for a morphology in a verse in english', function () {
	expect(1);
	var search = Object.create( javascripture.api.search );
	search.getReferences( {
		language: 'english',
		morph: 'TH8799',
		range: 'verse'
	} );
	equal( search.countResults(), 19886, 'there are 19886 occurances of "TH8799" in English');
});

asyncTest( 'search for a word and strongs number in a verse in english', function () {
	expect(2);
	var search1 = Object.create( javascripture.api.search );
	search1.getReferences( {
		clusivity: 'inclusive',
		language: 'english',
		lemma: 'H3588',
		range: 'verse',
		word: 'form'
	} );
	equal( search1.countResults(), 245, 'there are 245 occurances of "H3588" or "form" in English');
	start();

	var search2 = Object.create( javascripture.api.search );
	search2.getReferences( {
		clusivity: 'exclusive',
		language: 'english',
		lemma: 'H3588',
		range: 'verse',
		word: 'God'
	} );
	equal( search2.countResults(), 13, 'there are 12 occurances of "H3588" and "God" in the same verse in English');
});

asyncTest( 'search for a word and strongs number in a word in english', function () {
	expect(2);
	var search1 = Object.create( javascripture.api.search );
	search1.getReferences( {
		clusivity: 'exclusive',
		language: 'english',
		lemma: 'H7363',
		range: 'word',
		word: 'moved'
	} );
	equal( search1.countResults(), 1, 'there is 1 occurance of "H7363" translated "moved" in English' );
	start();

	var search2 = Object.create( javascripture.api.search );
	search2.getReferences( {
		clusivity: 'exclusive',
		language: 'english',
		lemma: 'H1877',
		range: 'word',
		word: 'grass'
	} );
	equal( search2.countResults(), 8, 'there are 8 occurances of "H1877" translated "grass" in English' );
});
/*
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
