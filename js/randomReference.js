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
var loadRandomRefernece = function() {
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
} else {
	loadRandomReference();
}
$( '.full-page' ).hide();