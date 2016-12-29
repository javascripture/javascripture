/*global bible javascripture*/
var getRandomReference = function() {
	var bookNumber = Math.floor(Math.random() * bible.Data.books.length),
		chapterNumber = Math.floor(Math.random() * bible.Data.verses[bookNumber].length),
		numberOfVerses = bible.Data.verses[bookNumber][chapterNumber],
		verseNumber = Math.floor(Math.random() * numberOfVerses),
		referenceObject = {};
	referenceObject.book = bible.Data.books[bookNumber][0];
	referenceObject.chapter = chapterNumber + 1;
	referenceObject.verse = verseNumber + 1;
	return referenceObject;
};
var loadRandomReference = function() {
	var randomReference = getRandomReference();
	window.location.hash = javascripture.modules.reference.createReferenceLink( randomReference );
	//$( '.full-page' ).hide();
};
$( '.randomReference' ).click( function( event ) {
	event.preventDefault();
	loadRandomReference();
} );

if ( localStorage && 'undefined' != typeof( localStorage.reference ) && '{' === localStorage.reference.substr(0, 1) ) {
	var localReference = $.parseJSON( localStorage.reference );
}
if ( window.location.hash !== '' ) {
	var hash = window.location.hash;
	window.location.hash = '';
	window.location.hash = hash;
	//$( '.full-page' ).hide();
} else if ( typeof( localReference ) != 'undefined' && localReference !== '' && localReference.book ) {
	window.location.hash = javascripture.modules.reference.createReferenceLink( localReference );
	//$( '.full-page' ).hide();
} else {
	loadRandomReference();
}

$( '#loadingJavascripture' ).text( 'Start' ).prop( 'disabled', false ).click( function() {
	//$( '.full-page' ).hide();
} );

