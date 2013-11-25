( function () {
	$( document ).bind( 'loading', function( event, parameters, two ) {
		console.log(parameters);
		$( '#searchLoading' ).html( parameters );
	});	
} )(jQuery);
