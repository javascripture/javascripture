/*global define, debug*/
define(['jquery', 'bible', '../../data/crossReferences', 'ba-debug'], function ($, bible, crossReferences, debug) {
	"use strict";
	$('#reference-panel').on('click', 'ol.wrapper li', function () {
		var id = $(this).attr('id'),
			parsedReference = bible.parseReference( id ),
			book = bible.Data.books[parsedReference.bookID][1],
			reference = book + '.' + parsedReference.chapter1 + '.' + parsedReference.verse1;
		console.log(crossReferences[reference]);
	});
});
