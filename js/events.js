	/*Event Handling*/
	$(document).ready(function(){
		$(document).on('click', '.collapsable h2', function(){
			$(this).parent().toggleClass('closed');
		});
		$(document).on('focus', 'input[type=text]', function(){
			$(this).select();
		});
		$('select.lookup').change(function(){
			selectOptionDisplay($(this));
			$(this).blur();
		});
		$(document).on('mouseover', '#verse ol > li span, #strongsTracking ul > li > span, #referenceTracking h2', function(){
			if($('#'+$(this).attr('class')).length > 0) {
				$('#verse').addClass('isolate');
				$('.verse').attr('id',$(this).attr('class'));
			}
		});

		$(document).on('mouseout', '#verse ol > li  span, #strongsTracking ul > li > span, #referenceTracking h2', function(){
			$('#verse').removeClass('isolate');
		});

		$(document).on('click', '.references a', function(){
			markReference($(this).parent('li'));
            return false;
		});

		$(document).on('click', '#strongsTracking a.close', function() {
			var parentListItem = $(this).closest('li');
			var id = parentListItem.attr('id');
			parentListItem.remove();
			$('#'+id).attr('id','');
			return false;
		});
		$(document).on('click', '#strongsTracking a.tracker', function() {
			highlightStrongsNumber($(this).attr('href'));
			return false;
		});

		$(document).on('click', '.collapsable h2 a.remove', function(event){
			event.preventDefault();
			$(this).closest('.collapsable').remove();
		});

		// #referencePicker
		$('#referencePicker').change( function() {
			var type = $( this ).val();
			$( '#dock' ).attr( 'class', type );
			$( '.popup' ).popup( 'close' );
			localStorage.referencePicker = type;
		} );

		if ( localStorage.referencePicker ) {
			var type = localStorage.referencePicker;
			$( '#dock' ).attr( 'class', type );
			$('#referencePicker').val( type );
		}
	});

/*global javascripture*/
;( function ( $ ) {
	$(document).on( 'click', '#verse ol > li span', function ( event ) {
		event.preventDefault();
		event.stopPropagation();

		javascripture.reactHelpers.dispatch( javascripture.reactHelpers.setTrayVisibilityFilter( 'word' ) );

		$( this ).data( 'lemma' ).split( ' ' ).map( strongsNumber => {
			javascripture.reactHelpers.dispatch( javascripture.reactHelpers.addWord( { strongsNumber, open: true, morphology: $( this ).data( 'morph' ) } ) );
		} );
	});
} )(jQuery);
