/*global javascripture*/
;( function ( $ ) {
/*	$( document ).on( 'click', '.frequencyAnalysis', function( event ) {
		event.preventDefault();
		var data = $( this ).closest( '.reference' ).data(),
		    frequencyAnalysis = {};
		$.each( javascripture.data.kjv[ data.book ][ data.chapter ], function ( verseNumber, verseArray ) {
			$.each( verseArray, function ( wordNumber, wordArray ) {
				if ( wordArray[ 1 ] ) {
					$.each( wordArray[ 1 ].split( ' ' ), function ( key, lemma ) {
						if ( 'undefined' === typeof frequencyAnalysis[ lemma ] ) {
							frequencyAnalysis[ lemma ] = 1;
						} else {
							frequencyAnalysis[ lemma ]++;
						}
					} );
				}
			} );
		} );
		
		var sortable = [];
		for (var word in frequencyAnalysis) {
			sortable.push([word, frequencyAnalysis[word]]);
		}
		var sortedLemma = sortable.sort(function(a, b) {
			return b[1] - a[1];
		});

		var values = [],
		    labels = [];
		$.each( sortedLemma, function( key, value ) {
			values.push(parseInt( value[ 1 ], 10 ) );
			labels.push( value[ 0 ] + '(' + value[ 1 ] + ')' );
		} );
		$( '.full-page' ).show();
		Raphael("holder", 700, 700).pieChart(350, 350, 200, values, labels, "#fff");
	} );*/
} )( jQuery );