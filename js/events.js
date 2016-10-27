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
		$(document).on( 'mouseover', '#wordControlPanel', function() {
			$(this).removeClass('not-active');
		} );
		$(document).on( 'mouseout', '#wordControlPanel', function() {
		//	$(this).hide('slow');
		});
		$(document).on('click', '#wordControlPanel .highlight', function(){
			var strongsNumber = $(this).parent().find('.wordControlPanelStrongsNumber').text();
			highlightStrongsNumber(strongsNumber);
		});
		$(document).on('click', '#wordControlPanel .search', function(){
			var strongsNumber = $(this).parent().find('.wordControlPanelStrongsNumber').text();
			$('input#reverseRootStrongsNumber').val(strongsNumber);
			$('input#searchTerm').val(strongsNumber);
			$('input#search').click();
		});
		$(document).on('click', '#wordControlPanel .definitions-link', function(){
			$(this).siblings('.definitions').toggleClass('hide');
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

		$('#findBranches').click(function() {
			wordTree($('#reverseRootStrongsNumber').val());
			return false;
		});

		$('.findRareWords').click(function(){
			findRareWords($('#maximumNumberOfUses').val());
			return false;
		});

		$('.random-verse').click(function(){
			var randomBook = parseInt( Math.random()*66, 10 );
			$('select.bookSelect option:nth-child('+randomBook+')');
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