/*globals javascripture*/
;( function ( $ ) {
	var english = javascripture.data.english;
	$.fn.scrollStopped = function(callback) {
	    $(this).scroll( function () {
	        var self = this, $this = $(self);
	        if ($this.data('scrollTimeout')) {
	          clearTimeout($this.data('scrollTimeout'));
	        }
	        $this.data('scrollTimeout', setTimeout(callback,250,self));
	    });
	};

	javascripture.modules.reference.loadReferenceFromHash();

	$(window).bind( 'hashchange', function(e) {
	    var startDate = new Date();
	    javascripture.modules.reference.loadReferenceFromHash();
	    var endDate = new Date();
		timer(startDate, endDate);
	});

	$( window ).scrollStopped( function() {
		var scrollTop = $( document ).scrollTop(),
			verseHeight = $( '.referencePanel' ).height() - $( window ).height(),// + $( '.dock' ).height(),
			anchoringData;
console.log( verseHeight );
console.log( scrollTop );
		if ( scrollTop <= 0 ) {
			console.log('prev');
			var prev = $( '.three-references' ).data( 'prev' );
			anchoringData = javascripture.modules.reference.getAnchoringData( 'prev' );
			javascripture.modules.reference.load( prev ).anchorReference( anchoringData );
		}
		if ( scrollTop >= verseHeight ) {
			console.log('next');
			var next = $( '.three-references' ).data( 'next' );
			anchoringData = javascripture.modules.reference.getAnchoringData( 'next' );
			javascripture.modules.reference.load( next ).anchorReference( anchoringData );
		}
	});

	$('.goToReference').submit(function (event) {
		event.preventDefault();
		console.log($('#goToReference').val());
		var reference = bible.parseReference( $('#goToReference').val() );

		var hash = 'book=' + bible.Data.books[reference.bookID - 1][0] + '&chapter=' + reference.chapter + '&verse=' + reference.verse;
		console.log(hash);
		window.location.hash = hash;
		$( this ).closest( '.popup' ).popup( 'close' );
		$('#goToReference').blur();
		if ( $( 'html' ).hasClass( 'reading-mode' ) ) {
			hideDock();
		}
		return false;
	});

} )( jQuery );