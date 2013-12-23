/*global javascripture*/
javascripture.modules.bookmarks = {

};

//bind version switcher
$( '.bookmark-current-passage' ).on( 'click', function() {
	$( '.bookmarks' ).append( '<a href="' + window.location.hash + '">' + $( '#goToReference' ).val() + '</a>' );
} );