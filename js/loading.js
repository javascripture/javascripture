( function () {
	$( document ).bind( 'loading', function( event, parameters, two ) {
		console.log(parameters);
		$( '#searchLoading' ).val( parameters );
	});	
} )(jQuery);
