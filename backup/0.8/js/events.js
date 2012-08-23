	/*Event Handling*/
	$(document).ready(function(){
		$('#showNotes').click(function(){
			$('body').toggleClass('show-notes');
		});
		$('.collapsable h2').live('click', function(){
			$(this).parent().toggleClass('closed');
		});
		$('input[type=text]').live('focus',function(){
			$(this).select();
		});
		$('select.lookup').change(function(){
			selectOptionDisplay($(this));
			$(this).blur();
		});

		$('#verse ol > li > span, #strongsTracking ul > li > span, #referenceTracking h2').live('mouseover',function(){
			if($('#'+$(this).attr('class')).length > 0) {		
				$('#verse').addClass('isolate');
				$('.verse').attr('id',$(this).attr('class'));
			}
		});
		$('#verse ol > li > span, #strongsTracking ul > li > span, #referenceTracking h2').live('mouseout', function(){
			$('#verse').removeClass('isolate');
		});
		$('#wordControlPanel').hover(function() {
			$(this).removeClass('not-active');
		},function() {
			$(this).hide('slow');
		});
		$('#wordControlPanel .highlight').live('click', function(){
			var strongsNumber = $(this).parent().find('.wordControlPanelStrongsNumber').text();
			highlightStrongsNumber(strongsNumber);
		});
		$('#wordControlPanel .search').live('click', function(){
			var strongsNumber = $(this).parent().find('.wordControlPanelStrongsNumber').text();
			$('input#reverseRootStrongsNumber').val(strongsNumber);
			$('input#searchTerm').val(strongsNumber);
			$('input#search').click();
		});
		$('#wordControlPanel .definitions-link').live('click', function(){
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
		$('.references a').live('click',function(){
			markReference($(this).parent('li'));
            return false;
		});
		$('input#search').click(function() {
			searchByStrongsNumber($('input#searchTerm').val());
			return false;
		});
		$('#strongsTracking a.tracker').live('dblclick', function() {
			$('input#searchTerm').val($(this).attr('href'));
			$('input#search').click();
			return false;
		});
		$('#strongsTracking a.close').live('click', function() {
			var parentListItem = $(this).closest('li');
			var id = parentListItem.attr('id');
			parentListItem.remove();
			$('#'+id).attr('id','');
			return false;
		});
		$('#strongsTracking a.tracker').live('click', function() {
			highlightStrongsNumber($(this).attr('href'));
			return false;
		});
		/*$('#searchByStrongsNumber').live('submit', function(){
			$('input#search').click();
		});*/
		$('#colorFormColor').change(function(){
			var strongsNumber = $('#changeColor #colorFormStrongsNumber').val();
			var color = $('#changeColor #colorFormColor').val();
			$('#'+strongsNumber).find('style').html('.'+strongsNumber+'{background:'+color+';color:#fff;}');
		});
		$('#changeColor').live('submit', function(){
			var strongsNumber = $('#changeColor #colorFormStrongsNumber').val();
			var color = $('#changeColor #colorFormColor').val();
			$('#'+strongsNumber).find('style').html('.'+strongsNumber+'{background:'+color+';color:#fff;}');
			return false;
		});
		$('#previousBook').live('click',function(){
			$('select#bookSelect option:selected').attr('selected','').prev().attr('selected','selected').change();
		});
		$('#previousChapter').live('click',function(){
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
		$('#previousVerse').live('click',function(){
            verse = $('#verseSelect').val()-1;
            chapter = $('#chapterSelect').val();
            book = $('#bookSelect').val();
            if(typeof(bibleObject[book][chapter-1][verse-1]) != "undefined"){
                setHashState(book,chapter,verse);
            } else {
                if(typeof(bibleObject[book][chapter-2]) != "undefined"){
                    var lastVerse = bibleObject[book][chapter-2].length
                    setHashState(book,chapter-1,lastVerse);
                }
            }
		});
		$('#nextBook').live('click',function(){
			$('select#bookSelect option:selected').attr('selected','').next().attr('selected','selected').change();
		});
		$('#nextChapter').live('click',function(){
			if($('select#chapterSelect option:selected').attr('selected','').next().attr('selected','selected').change().length < 1) {
				$('#nextBook').click();
			}
		});
		$('#nextVerse').live('click',function(){
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
			var randomBook = parseInt(Math.random()*66);
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
		$('#showHebrew').live('change', function(){
			showHebrew();
		});
		
		/*Keyboard shortcuts*/
		$(document).keyup(function (e) {
      		if(e.which == 110){
				if($('#currentRef').next().length>0){
		            markReference($('#currentRef').next());
	    	    }
      		}
			if(e.which == 112){
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
      	$(window).bind( 'hashchange', function(e) {
            var startDate = new Date();
            var hash = e.fragment;
            if(hash.indexOf('search') > -1){
                var word = hash.split('=')[1];
                searchByStrongsNumber(word);
            } else {
                var parameterPairArray = hash.split('&');
                //this is bad
                var book = parameterPairArray[0].split('=')[1];
                var chapter = parseInt(parameterPairArray[1].split('=')[1]);
                var verse = parseInt(parameterPairArray[2].split('=')[1]);
                loadReference(book,chapter,verse);
            }
            var endDate = new Date();
            timer(startDate, endDate);
		});
		/*Load initial view*/
		//setHashState("Gen",1,2);
		//setHashState("Gen",1,1);
		var hash = window.location.href.split('#')[1];
		if(hash) {
			if(hash.indexOf('search') > -1){
            	var word = hash.split('=')[1];
	            searchByStrongsNumber(word);
    	    } else {
        	    var parameterPairArray = hash.split('&');
            	//this is bad
	            var book = parameterPairArray[0].split('=')[1];
    	        var chapter = parseInt(parameterPairArray[1].split('=')[1]);
        	    var verse = parseInt(parameterPairArray[2].split('=')[1]);
            	loadReference(book,chapter,verse);
			}
        }
        $('.bookmark').click(function(event){
        	event.preventDefault();
        	$('ol#bookmarks').append(createReferenceListItem(currentReference()));
        });
		$('body').mouseleave(function(event) {
			//if(event.clientY < 1) {
				$('.dock').animate({top: '0'}, 100);
			//}
		}); //TODO, break the current animation...
		$('body').mouseover(function(event) {
			if(event.clientY > 50) {
				$('.dock').animate({top: '-50px'}, 100);
			}
		});
		$('.collapsable h2 a.remove').live('click', function(event){
			event.preventDefault();
			$(this).closest('.collapsable').remove();
		});
		$('#referenceTracking .collapsable h2').live('click', function(event){
			if($(this).closest('.collapsable').find('form').length === 0) {
				var strongsNumber = $(this).attr('class');
				$('input#reverseRootStrongsNumber').val(strongsNumber);
				$('input#searchTerm').val(strongsNumber);
				$('input#search').click();
			}
		});
	});