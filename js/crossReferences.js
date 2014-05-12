/*global bible, crossReferences*/
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
	var idToPrettyReference = function( id ) {
		var idArray = id.split( '_' );
		return idArray[0] + ' ' + idArray[1] + ':' + idArray[2];
	};
	var $reference = $( this ).closest( '.reference' );
		book = $reference.data( 'book' ),
	    bookId = bible.getBookId( book ),
	    chapter = $reference.data( 'chapter' ),
		verse = $( this ).data( 'verse' ),
//	    chapterAndVerse = this.id.substr(this.id.indexOf( '_' ), this.id.length),
//	    reference = bible.Data.books[bookId - 1][1] + chapterAndVerse.replace(/_/gi, '.'),
	    reference = bible.Data.books[bookId - 1][1] + '.' + chapter + '.' + verse;

	    var crossReferencesMarkup = '<div class="crossReferences content-padding">Cross references for <a href="#book=' + book + '&chapter=' + chapter + '&verse=' + verse + '">' + idToPrettyReference( this.id ) + '</a>:<br>';
		console.log( reference );
	if ( crossReferences[ reference ] ) {
		$.each( crossReferences[ reference ], function( key, referenceString ) {
			var referenceArray = referenceString.split('.'),
			    bookId = bible.getBookId( referenceArray[0] ),
			    reference = {
				    book: bible.Data.books[bookId - 1][0],
				    chapter: referenceArray[1],
				    verse: referenceArray[2]
			    };
			crossReferencesMarkup += '<a href="#' + javascripture.modules.reference.createReferenceLink( reference ) + '">' + referenceString + '</a> ';
		} );
	} else {
		crossReferencesMarkup += 'None';
	}
	crossReferencesMarkup += '</div>';
	$('#wordControlPanel').html( crossReferencesMarkup );
	if( ! $('#wordDetailsPanel').hasClass('top') ) {
		$( '#keyCode68' ).click();
	}
} );