	/*Event Handling*/
	$(document).ready(function(){
		$(document).on('click', '#showNotes', function(){
			$('body').toggleClass('show-notes');
		});
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
		/*$('#verse span').live('click',function(){
			var strongsNumber = $(this).attr('class').split(' ')[0];
			highlightStrongsNumber(strongsNumber);
		});
		$('#verse span').live('dblclick',function(){
			$('input#searchTerm').val($(this).attr('class'));
			$('input#search').click();
		});*/
		/*$('a').live('focus',function(){
			$(this).click();
		});*/
		$(document).on('click', '.references a', function(){
			markReference($(this).parent('li'));
            return false;
		});
/*		$(document).on('click', 'input#search', function() {
			searchByStrongsNumber($('input#searchTerm').val());
			return false;
		});
		$(document).on('dblclick', '#strongsTracking a.tracker', function() {
			$('input#searchTerm').val($(this).attr('href'));
			$('input#search').click();
			return false;
		});*/
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
		/*$('#searchByStrongsNumber').on('submit', function(){
			$('input#search').click();
		});*/
		$('#colorFormColor').change(function(){
			var strongsNumber = $('#changeColor #colorFormStrongsNumber').val();
			var color = $('#changeColor #colorFormColor').val();
			//$('#'+strongsNumber).find('style').html('.'+strongsNumber+'{background:'+color+';color:#fff;}');
			$('#'+strongsNumber).find('style').html('#'+strongsNumber+' #verse span.'+strongsNumber+', #'+strongsNumber+' .'+strongsNumber+', .'+strongsNumber+' {color:#fff;background:'+color+';}');
		});
		$('#changeColor').on('submit', function(){
			var strongsNumber = $('#changeColor #colorFormStrongsNumber').val();
			var color = $('#changeColor #colorFormColor').val();
			$('#'+strongsNumber).find('style').html('.'+strongsNumber+'{background:'+color+';color:#fff;}');
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
		$('.highlight-all').click(function(e) {
			e.preventDefault();
			$.each(createUniqueStrongsNumbersArray(), function(index, strongsNumber) {
				highlightStrongsNumber(strongsNumber);
			});//TODO - slow each
		});
		$('.random-verse').click(function(){
			var randomBook = parseInt( Math.random()*66, 10 );
			$('select.bookSelect option:nth-child('+randomBook+')');
		});

        $('.bookmark').click(function(event){
			event.preventDefault();
			$('ol#bookmarks').append(createReferenceListItem(currentReference()));
        });
		$(document).on('click', '.collapsable h2 a.remove', function(event){
			event.preventDefault();
			$(this).closest('.collapsable').remove();
		});
		$('.changeStyle').change(function(){
			$('#'+$(this).attr('name')).html('body { '+$(this).val()+'}');
			localStorage.font = $(this).val();
			$( '.popup' ).popup( 'close' );
		});
		if ( localStorage.font ) {
			$('#'+$('.changeStyle').attr('name')).html('body { ' + localStorage.font + '}');
			$('.changeStyle').val( localStorage.font );
		}
		$('.open-menu').click( function( event ) {
			event.preventDefault();
			var $this = $( $(this).attr('href') ),
			    left = 0
			if ( $this.hasClass( 'show' ) ) {
				left = '-220px';
			}

			$this.toggleClass( 'show').animate( {
				'left': left
			} );
		} );

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