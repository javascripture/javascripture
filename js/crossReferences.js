/*global bible crossReferences*/
$( document ).on('click', '#verse .wrapper li', function() {

	var idToUrl = function ( id ) {
		var bookId = bible.getBookId( id ),
		    referenceArray = id.split( '_' ),
		    url = '#';
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
	var bookId = bible.getBookId( this.id ),
	    chapterAndVerse = this.id.substr(this.id.indexOf( '_' ), this.id.length),
	    reference = bible.Data.books[bookId - 1][1] + chapterAndVerse.replace(/_/gi, '.'),
	    crossReferencesMarkup = 'Cross references for <a href="' + idToUrl( this.id ) + '">' + this.id.replace( /_/gi, ' ' ) + '</a>:<br>' ;

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
	$('#wordControlPanel').html( crossReferencesMarkup );
} );