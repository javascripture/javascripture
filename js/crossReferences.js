/*global bible crossReferences*/
$( document ).on('click', '#verse .wrapper li', function() {

	var idToUrl = function ( id ) {
		var bookId = bible.getBookId( id ),
		    referenceArray = id.split( '_' ),
		    url = '#';
		console.log( bookId );
		if ( bookId ) {
			url += 'book=' + bible.Data.books[ bookId - 1 ][ 0 ];
		}
		if ( referenceArray[ 1 ] ) {
			url += '&chapter=' + referenceArray[ 1 ];
		}
		if ( referenceArray[ 2 ] ) {
			url += '&verse=' + referenceArray[ 2 ];
		}
		return url;
	};
	var book = $( this ).closest( '.reference' ).data( 'book' ),
	    bookId = bible.getBookId( book ),
	    chapter = $( this ).closest( '.reference' ).data( 'chapter' ),
		verse = $( this ).data( 'verse' ),
//	    chapterAndVerse = this.id.substr(this.id.indexOf( '_' ), this.id.length),
//	    reference = bible.Data.books[bookId - 1][1] + chapterAndVerse.replace(/_/gi, '.'),
	    reference = bible.Data.books[bookId - 1][1] + '.' + chapter + '.' + verse;
	    console.log( bookId );
	    console.log( reference );
	    crossReferencesMarkup = '<div class="crossReferences">Cross references for <a href="#book=' + book + '&chapter=' + chapter + '&verse=' + verse + '">' + this.id.replace( /_/gi, ' ' ) + '</a>:<br>';
	console.log(crossReferences[ reference ] );
	if ( crossReferences[ reference ] ) {
		$.each( crossReferences[ reference ], function( key, referenceString ) {
			var referenceArray = referenceString.split('.'),
			    bookId = bible.getBookId( referenceArray[0] );

console.log(bookId);
			crossReferencesMarkup += '<a href="#book=' + bible.Data.books[bookId - 1][0] + '&chapter=' + referenceArray[1] + '&verse=' + referenceArray[2] + '">' + referenceString + '</a> ';
		} );	
	} else {
		crossReferencesMarkup += 'None';
	}
	crossReferencesMarkup += '</div>';
	$('#wordControlPanel').html( crossReferencesMarkup );
} );