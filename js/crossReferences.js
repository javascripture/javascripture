/*global bible, crossReferences, javascripture*/
$( document ).on('click', '#verse .wrapper li, .bookmarker', function() {
	var $reference = $( this ).closest( '.reference' ),
		book = $reference.data( 'book' ),
	    bookId = bible.getBookId( book ),
	    chapter = $reference.data( 'chapter' ),
		verse = $( this ).data( 'verse' ),
	    referenceObject = {
		    book: book,
		    chapter: chapter,
		    verse: verse
	    };

	javascripture.reactHelpers.dispatch( javascripture.reactHelpers.setTrayVisibilityFilter( 'bookmarks' ) );
	javascripture.reactHelpers.dispatch( javascripture.reactHelpers.showCrossReferences( referenceObject ) );

	if ( $( this ).hasClass( 'bookmarker') ) {
		javascripture.reactHelpers.dispatch( javascripture.reactHelpers.addBookmark( referenceObject ) );
	}
} );