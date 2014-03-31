/*globals javascripture*/
javascripture.modules.reference = {
	load: function( reference ) {
		var self = this,
		    book = reference.book,
		    chapter = reference.chapter,
		    verse = reference.verse;

		if ( 'undefined' == typeof verse ) {
			reference.verse = 1;
		}

//		$('#verse').html( $threeChapters );
		worker.addEventListener('message', function(e) {
			if( e.data.task === 'reference' ) {
				$('#verse').html( e.data.result );

				var title = book;
				if ( typeof chapter !== 'undefined' )
					title += ' ' + chapter;

				if ( typeof verse !== 'undefined' )
					title += ':' + verse;

				$( 'head title' ).text( title );

				if ( $.fn.waypoint ) {
					$('.reference').waypoint('destroy');
				}
				self.scrollToVerse( $( '#current' ) );
			}
		} );

		reference.version = $('#versionSelector').val();

		worker.postMessage( {
			task: 'reference',
			parameters: reference
		} ); // Send data to our worker.

		return this; //makes it chainable

	},
	scrollToVerse: function ( verse, offset ) {
		if ( undefined === offset ) {
			offset = 0;
		}
		$( document ).scrollTop( 0 );
		offset = offset - $('.dock').height();

		//there must be a better way to do this, but the problem is that the top animation hasn't happened by this point
		if ( $( 'html' ).hasClass( 'reading-mode' ) ) {
			offset = offset - 50;
		}

		if(verse.length > 0) {
//				$('#verse').closest('.panel').scrollTop(verse.offset().top - $('.dock').height() - $('h1').height() );
			$( document ).scrollTo( verse, { offset: offset } );
		}

		$( document ).trigger( 'createWayPoint' );
	},
	getAnchoringData: function ( direction ) {
		//anchor to current verse
		var anchorPointSelector = '#current',
			offset = 0,
			$bodyOffset = $( document ).scrollTop(),
			$anchorVerse;

		//anchor to scrollstop point
		if ( direction ) {
			if ( direction === 'prev' ) {
				$anchorVerse = $('.reference:first-child ol.wrapper li:first-child');
			}

			if ( direction === 'next' ) {
				$anchorVerse = $('.reference:last-child ol.wrapper li:last-child');
			}
			anchorPointSelector = '#' + $anchorVerse.attr('id');
			offset = $bodyOffset - $anchorVerse.offset().top + $('.dock').height();
		}

		return [offset, anchorPointSelector];
	},
	anchorReference: function ( anchoringData ) {

		var anchorPointSelector = anchoringData[1],
		    offset = anchoringData[0],
		    $anchorPoint = $( anchorPointSelector );

		if ( anchorPointSelector === '.current-verse' ) {
			verseHeight = $anchorPoint.height(),
			offset = -$(window).height() / 2 + verseHeight;
		}

		//anchor to a chapter
		if ( $anchorPoint.length === 0 ) {
			$anchorPoint = $( '#' + jsonCollection.currentId );
			offset = - $('[data-role=header]').height();// - 10;
		}

		this.scrollToVerse( $anchorPoint, offset );
	},
	getReferenceFromUrl: function () {
		var hashArray = window.location.hash.split('&'),
			reference = {};

		if ( hashArray.length > 1 ) {
			reference.book = hashArray[0].split('=')[1],
			reference.chapter = parseInt(hashArray[1].split('=')[1], 10),
			reference.verse = 1;
	        if ( hashArray[2] )
	            reference.verse = parseInt(hashArray[2].split('=')[1], 10);
		}
		return reference;
	},
	loadReferenceFromHash: function () {
	    var hash = window.location.hash;
	    if(hash.indexOf('search') > -1){
	        var word = hash.split('=')[1];
	        setTimeout(function(){
		        createSearchReferencesPanel({lemma:word});
		    } );
	    } else {
	        var parameterPairArray = hash.split('&');
	        //this is bad
	        if ( parameterPairArray.length > 1 ) {
				var book = parameterPairArray[0].split('=')[1];
		        var chapter = parseInt(parameterPairArray[1].split('=')[1], 10);
		        var verse = 1;
		        if ( parameterPairArray[2] ) {
		            verse = parseInt(parameterPairArray[2].split('=')[1], 10);
		        }
			    if ( localStorage ) {
				    localStorage.reference = [ book, chapter, verse];
			    }
				javascripture.modules.reference.load( {
			        book: book,
			        chapter: chapter,
			        verse: verse
		        } );
	        }

	    }
	}
};



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
		if ( scrollTop <= 0 ) {
			var prev = $( '.three-references' ).data( 'prev' );
			anchoringData = javascripture.modules.reference.getAnchoringData( 'prev' );
			javascripture.modules.reference.load( prev ).anchorReference( anchoringData );
		}
		if ( scrollTop >= verseHeight ) {
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
		window.location.hash = hash;
		$( this ).closest( '.popup' ).popup( 'close' );
		$('#goToReference').blur();
		if ( $( 'html' ).hasClass( 'reading-mode' ) ) {
			hideDock();
		}
		return false;
	});

} )( jQuery );