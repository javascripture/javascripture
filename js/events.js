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
//			var lemma = $( this ).data( 'lemma' );
//			$('html').addClass( lemma );
/*			var root = strongsObject[$(this).attr('class')];
			if(root){
				$(this).addClass(root[0]);
			}*/
		});

		$(document).on('mouseout', '#verse ol > li  span, #strongsTracking ul > li > span, #referenceTracking h2', function(){
//			var lemma = $( this ).data( 'lemma' );
//			$('html').removeClass( lemma );
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
		$('#previousBook').on('click',function(){
			$('select#bookSelect option:selected').attr('selected','').prev().attr('selected','selected').change();
		});
		$('#previousChapter').on('click',function(){
            verse = 1;
            chapter = $('#chapterSelect').val()-1;
            book = $('#bookSelect').val();
            if(typeof(bibleObject[book][chapter-1]) != "undefined"){
                setHashState(book,chapter,verse);
            } else {
				previousBook = $('#bookSelect option:selected').prev().val();
				var lastChapter = bibleObject[previousBook].length;
				var lastVerse = bibleObject[previousBook][lastChapter-1].length;
				setHashState(previousBook,lastChapter,lastVerse);
			}
		});
		$('#previousVerse').on('click',function(){
            verse = $('#verseSelect').val()-1;
            chapter = $('#chapterSelect').val();
            book = $('#bookSelect').val();
            if(typeof(bibleObject[book][chapter-1][verse-1]) != "undefined"){
                setHashState(book,chapter,verse);
            } else {
                if(typeof(bibleObject[book][chapter-2]) != "undefined"){
                    var lastVerse = bibleObject[book][chapter-2].length;
                    setHashState(book,chapter-1,lastVerse);
                }
            }
		});
		$('#nextBook').on('click',function(){
			$('select#bookSelect option:selected').attr('selected','').next().attr('selected','selected').change();
		});
		$('#nextChapter').on('click',function(){
			if($('select#chapterSelect option:selected').attr('selected','').next().attr('selected','selected').change().length < 1) {
				$('#nextBook').click();
			}
		});
		$('#nextVerse').on('click',function(){
			if($('select#verseSelect option:selected').attr('selected','').next().attr('selected','selected').change().length < 1) {
				$('#nextChapter').click();
			}
		});
		$('#findBranches').click(function() {
			wordTree($('#reverseRootStrongsNumber').val());
			return false;
		});
		/*Color Picker*/
		$('#colorSelector').ColorPicker({
			color: '#0000ff',
			onShow: function (colpkr) {
				$(colpkr).fadeIn(500);
				return false;
			},
			onHide: function (colpkr) {
				$(colpkr).fadeOut(500);
				return false;
			},
			onChange: function (hsb, hex, rgb) {
				$('#colorSelector div').css('backgroundColor', '#' + hex);
				$('#colorFormColor').val('#'+hex).change();
			}
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
		showHebrew();
		function showHebrew() {
			if($('#showHebrew:checked').length > 0) {
				$('#verse').addClass('showHebrew');
			} else {
				$('#verse').removeClass('showHebrew');
			}
		}
		$('#showHebrew').on('change', function(){
			showHebrew();
		});

		/*Keyboard shortcuts*/
		$(document).keyup(function (e) {
			console.log( e.keyCode );
			if( e.keyCode == 187 ) {
				if($('#currentRef').next().length>0){
		            markReference($('#currentRef').next());
				}
			}
			if( e.keyCode == 189 ) {
				if($('#currentRef').prev().length>0){
					markReference($('#currentRef').prev());
				}
			}
			if(e.keyCode == 37) { //prev chapter
				$('#previousChapter').click();
			}
			if(e.keyCode == 38) { //prev chapter
				$('#previousVerse').click();
			}
			if(e.keyCode == 39) { //next chapter
				$('#nextChapter').click();
			}
			if(e.keyCode == 40) { //prev chapter
				$('#nextVerse').click();
			}
		});

        $('.bookmark').click(function(event){
			event.preventDefault();
			$('ol#bookmarks').append(createReferenceListItem(currentReference()));
        });
		$(document).on('click', '.collapsable h2 a.remove', function(event){
			event.preventDefault();
			$(this).closest('.collapsable').remove();
		});
/*		$('#referenceTracking .collapsable h2').on('click', function(event){
			if($(this).closest('.collapsable').find('form').length === 0) {
				var strongsNumber = $(this).attr('class');
				$('input#reverseRootStrongsNumber').val(strongsNumber);
				$('input#searchTerm').val(strongsNumber);
				$('input#search').click();
			}
		});*/
		$('.changeStyle').change(function(){
			$('#'+$(this).attr('name')).html('body { '+$(this).val()+'}');
		});
/*		$(window).resize(function(){
			resizeWrapperToWindow();
		});*/
	});
/*function resizeWrapperToWindow() {
	$('body > .wrapper').css('height',$(window).height()-$('.dock').height() );
}
resizeWrapperToWindow();*/
var body = document.body,
    timer;

window.addEventListener('scroll', function() {
  clearTimeout(timer);
  if(!body.classList.contains('disable-hover')) {
    body.classList.add('disable-hover')
  }

  timer = setTimeout(function(){
    body.classList.remove('disable-hover');
  },500);
}, false);