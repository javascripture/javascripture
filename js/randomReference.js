/*global bible*/
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
	window.location.hash = 'book=' + randomReference.book + '&chapter=' + randomReference.chapter + '&verse=' + randomReference.verse;
	$( '.full-page' ).hide();
};
$( '.randomReference' ).click( function( event ) {
	event.preventDefault();
	loadRandomReference();
	$( '.popup' ).popup( 'close' );
} );
if ( window.location.hash !== '' ) {
	hash = window.location.hash;
	window.location.hash = '';
	window.location.hash = hash;
	$( '.full-page' ).hide();
} else if ( localStorage && localStorage.reference !== '' ) {
	var reference = localStorage.reference.split( ',' ),
		book = reference[0],
		chapter = reference[1],
		verse = reference[2],
		hash = 'book=' + book + '&chapter=' + chapter + '&verse=' + verse;
	window.location.hash = hash;
	$( '.full-page' ).hide();
} else {
	loadRandomReference();
}

$( '#loadingJavascripture' ).text( 'Start' ).prop( 'disabled', false ).click( function() {
	$( '.full-page' ).hide();
} );

