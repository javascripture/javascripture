//populate databases
$.indexedDB('javascripture').objectStore('bibles', true).add(bibleObject, 'kjv');
$.indexedDB('javascripture').objectStore('bibles', true).add(hebrewObject, 'hebrew');
$.indexedDB('javascripture').objectStore('bibles', true).add(greekObject, 'greek');

var bibles = $.indexedDB( 'javascripture' ).objectStore( 'bibles' );
/*
	
bibles.add( bibleObject, 'kjv' );
bibles.add( hebrewObject, 'hebrew' );
bibles.add( greekObject, 'greek' );
*/
//replace large data object with indexdbs
var kjvObject;
var getKjv = bibles.get( 'kjv' ).then( function ( result ) {
	kjvObject = result;
} );
/*getKjv.done( function( result ) {
	
});
/*.then( function ( object ) {
	console.log( object.value );
kjvObject = object.value;
		});
hebrewObject = bibles.get( 'hebrew' );
greekObject = bibles.get( 'greek' );
*/