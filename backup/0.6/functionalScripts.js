	/*Event Handling*/
	$(document).ready(function(){
		$('.collapsable h2').click(function(){
			$(this).parent().toggleClass('closed');
		});
		$('input[type=text]').live('focus',function(){
			$(this).select();
		});
		$('select.lookup').change(function(){selectOptionDisplay($(this));});
		/*var hoverIntentConfig = {
	        sensitivity: 1, // number = sensitivity threshold (must be 1 or higher)
	        interval: 25, // number = milliseconds for onMouseOver polling interval
	        over: showDetails, // function = onMouseOver callback (REQUIRED)
	        timeout: 0, // number = milliseconds delay before onMouseOut
	        out: hideDetails // function = onMouseOut callback (REQUIRED)
	    };
	    $('#verse span').hoverIntent(hoverIntentConfig);*/
		$('#verse ol > li > span').live('mouseover',function(){
			if($(this).hasClass('added')){
				//
			} else {
				$(this).append($('#wordControlPanel'));
				$('#wordControlPanelStrongsNumber').attr('class',$(this).attr('class')).text($(this).attr('class'));
				var topPosition = 0 + $(this).height();//$('#wordControlPanel').height()
				var leftPosition = 0 - ($('#wordControlPanel').width() / 2 - $(this).width() / 2);
				$('#wordControlPanel').show().css({
					'top': topPosition,
					'left': leftPosition
				});
			}
		});
		$('#verse span').live('mouseout',function(){
			$('#wordControlPanel').hide();
		});
		$('#wordControlPanel a.highlight').click( function(){
			var strongsNumber = $(this).parent().find('#wordControlPanelStrongsNumber').text();
			highlightStrongsNumber(strongsNumber);
		});
		$('#wordControlPanel a.search').click( function(){
			var strongsNumber = $(this).parent().find('#wordControlPanelStrongsNumber').text();
			$('input#reverseRootStrongsNumber').val(strongsNumber);
			$('input#searchTerm').val(strongsNumber);
			$('input#search').click();
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
		$('#references a').live('click',function(){
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
			$(this).closest('li').remove();
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
		$('#prevRef').click(function(){
            markReference($('#currentRef').prev());
		});
		$('#nextRef').click(function(){
            markReference($('#currentRef').next());
		});
		$('#findBranches').click(function() {
			wordTree($('#reverseRootStrongsNumber').val());
			return false;
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

		/*Keyboard shortcuts*/
		/*Load initial view*/
		setHashState("Gen",1,2);
		setHashState("Gen",1,1);
	});
	/*History Functions*/
	function setHashState(book,chapter,verse){
		window.location.href='#book='+book+'&chapter='+chapter+'&verse='+verse;
	}
	function previousChapter(){
		if($('select#chapterSelect option:selected').prev().attr('selected', 'selected').change().length > 0) {
			return true
		}
	}
	function previousBook(){
		$('select#bookSelect option:selected').prev().attr('selected', 'selected').change();
		return true;
	}
	function selectOptionDisplay(selectObject) {
        var startDate = new Date();
		var context = false;
		$('.current').removeClass('current');
		if(selectObject.hasClass('bookSelect')){
			var book = selectObject.val();
			var chapter = 1;
			var verse = 1;
		} else if(selectObject.hasClass('chapterSelect')){
			var book = $('select#bookSelect').val();
			var chapter = selectObject.val();
			var verse = 1;
		} else if(selectObject.hasClass('verseSelect')) {
			var book = $('select#bookSelect').val();
			var chapter = $('select#chapterSelect').val();
			var verse = selectObject.val();
		} else {
			var book = $('select#bookSelect').val();
			var chapter = $('select#chapterSelect').val();
			var verse = $('select#verseSelect').val();
		}
		setHashState(book,chapter,verse);
		var endDate = new Date();
		timer(startDate, endDate);
	}
	function subdueColor(color, subdueColorBy){
		return parseInt(color/subdueColorBy);
	} 
	function highlightStrongsNumber(strongsNumber) {		
		var subdueColorBy = $('#subdueColorBy').val();
		var strongsInt = parseInt(strongsNumber.substring(2,strongsNumber.length)/4);
		var color = colors[strongsInt];
		var colorArray = color.split('(')[1].split(')')[0].split(',')
		var red = subdueColor(colorArray[0], subdueColorBy);
		var green = subdueColor(colorArray[1], subdueColorBy);
		var blue = subdueColor(colorArray[2], subdueColorBy);
		var newColor = createColorCode(red,green,blue);
		if(!$('#'+strongsNumber).length > 0) {
			var strongsTracking = '';
			strongsTracking += '<li id="'+strongsNumber+'"><style type="text/css"></style>';
			strongsTracking += '<a href="'+strongsNumber+'" class="tracker '+strongsNumber+'">'+strongsNumber+'</a>';
			strongsTracking += '<a href="#" class="close">x</a>';
			strongsTracking += '</li>';
			$('#strongsTracking ul').append(strongsTracking);
		}
		var strongsStyle = '.'+strongsNumber+' {color:#fff;background:'+newColor+';}';
		$('#'+strongsNumber+' style').html(strongsStyle);

		$('#changeColor #colorFormStrongsNumber').val(strongsNumber);
		color = $('#'+strongsNumber+' .'+strongsNumber).css("background-color");
		$('#changeColor #colorFormColor').val(color);
		$('#wordControlPanel').hide();
	}
	function searchByStrongsNumber(strongsNumberString) {
		var startDate = new Date();
		$('#references').html('Loading');
		var references = '';
		var strongsNumberArray = new Array();
		var searchType = $('#searchSelect').val();
		strongsNumberArray = strongsNumberString.split(' ');
		$.each(strongsNumberArray, function(index, strongsNumber) {
			wordTree(strongsNumber);
		});
		references += '<ol>';
		var wordCount = 0;

		//to differentiate between strongs numbers and not strongs numbers
		$.each(strongsNumberArray, function(index, strongsNumber) {
			if(parseFloat(strongsNumber.substring(1, strongsNumber.length)) > 0) { //this is a number
				highlightStrongsNumber(strongsNumber);
				strongsNumberArray[index] = strongsNumber + '"';
			}
		});
		$.each(bibleObject, function(book, m) {
			$.each(m, function(j, n) {
				$.each(n, function(k, o) {
					var wordCount = 0;
					$.each(strongsNumberArray, function(index, strongsNumber) {
						if(o.toLowerCase().indexOf(strongsNumber.toLowerCase()) > 0) {
							wordCount++;
						}
					});
					if((wordCount > 0 && searchType === 'any') || (wordCount > strongsNumberArray.length-1 && searchType === 'all') ) {
						references += '<li><a href="#book=' + book + '&chapter=' + (j+1) + '&verse=' + (k+1) + '">'+book+' '+(j+1)+':'+(k+1)+'</a> <input type="hidden" value="' + wordCount + '" /></li>';
					}
				});
			});
		});
		references += '</ol>';
		$('#references').html(references);
		markFirstReference();
		var endDate = new Date();
		timer(startDate, endDate);

	}


/*Core functions*/
/*function selectReference(href){
	var hrefArray = href.split(",");
	var book = hrefArray[0];
	var chapter = parseInt(hrefArray[1]) + 1;
	var verse = parseInt(hrefArray[2]) + 1;
	goToReference(book,chapter,verse);	
}*/
function loadReference(book,chapter,verse){
	chapterInArray = chapter - 1;
	verseInArray = verse - 1
	context = false;
	var reference = book + ' ' + (chapter) + ':' + (verse);
	$('head title').text(reference);
	var chapterText = '<ol id="start">';
	$.each(bibleObject[book][chapterInArray], function(verseNumber, verseText) {
		chapterText += '<li';
		if(verseNumber === verseInArray) {
			chapterText += ' id="current"';
		}
		if(verseNumber === verseInArray-5) {
			chapterText += ' id="context"';
			context = true;
		}
		chapterText += '>';
		chapterText += verseText.replace(/<s c/gi,'<span class').replace(/<\/s>/gi,'</span>');
		chapterText += '</li>';
	});
	chapterText += '</ol>';
	//save wordControlPanel
	$('#wordControlPanel').appendTo($('.verse'));
	$('#verse').html(chapterText);
	maintainState(book,chapter,verse,context);
}
function wordTree(strongsNumber){
	$('#wordTree').html('Loading');
	var roots = '';
	if(typeof(strongsObject[strongsNumber]) != "undefined"){
        $.each(strongsObject[strongsNumber], function(index,rootNumber){
            roots += '<a href="#search='+rootNumber+'" class="'+rootNumber+'">'+rootNumber+'</a><br />';
        });
	}
	var branches = '';
	$.each(strongsObject, function(strongsObjectKey, strongsObjectRoot){
		$.each(strongsObjectRoot, function(strongsObjectRootKey,strongsObjectRootValue){
			if(strongsObjectRootValue==strongsNumber){
				branches += '<a href="#search='+strongsObjectKey+'" class="'+strongsObjectKey+'">' + strongsObjectKey + '</a><br />';
			}
		});
	});
	wordTreeString = '';
	if(roots == ''){
		wordTreeString += '<p>no roots</p>';
	} else {
		wordTreeString += 'roots:<br />' + roots + '</p>';
	}
	if(branches == ''){
		wordTreeString += '<p>no branches</p>';
	} else {
		wordTreeString += 'branches:<br />' + branches + '</p>';
	}
	$('#wordTree').html(wordTreeString);
}

/*State Maintainance*/
function goToReference(book,chapter,verse){
	$('select#bookSelect').val(book);
	$('select#chapterSelect').val(chapter);
	$('select#verseSelect').val(verse).change();
}
function maintainState(book,chapter,verse,context){
	$('.dynamic').each(function(){
		if($(this).hasClass('chapterSelect')){
			var size = bibleObject[book].length;
		} else if($(this).hasClass('verseSelect')){
			var chapterInArray = chapter - 1;
			var size = bibleObject[book][chapterInArray].length;
		}
		if($(this).attr('size') > 0){
			$(this).attr('size',size);
		}
		var options = '';
		var option = 0;
		while(option<size) {
			option = option + 1;
			options += '<option>' + option + '</option>';
		}
		$(this).html(options);
	});
	
	$('select.bookSelect').val(book);
	$('select.chapterSelect').val(chapter);
	$('select.verseSelect').val(verse);
	
	/*broken now wwe have historyif(context) {
		window.location.href = '#context';
	} else {
		window.location.href = '#start';
	}*/
}
function markFirstReference(){
	$('#references ol li:first').attr('id','currentRef');
}
function markReference(referenceLink){
	$('#references #currentRef').attr('id','');
	referenceLink.attr('id','currentRef');
    var href=referenceLink.attr('id','currentRef').find('a').attr('href');//this is a stupid way of doing it.
    window.location.hash = href;
}
/*Helper Methods*/
function timer(startDate, endDate){
	var startTime = startDate.getTime();
	var endTime = endDate.getTime();
	if(typeof(console) !== 'undefined'){
		console.log(endTime - startTime);
	}
}
function createColorCode(red,green,blue){
	return 'rgb('+red+','+green+','+blue+')';
}
/* Create Color Array*/
var colors = new Array();
var i = 0;
//red to green			
var red = 255;
var green = 0;
var blue = 0;
while(red > 0){
	red = red - 1;
	green = green + 1;
	colors[i] = createColorCode(red,green,blue);
	i++
}
//green to blue
var red = 0;
var green = 255;
var blue = 0;

while(green > 0){
	green = green - 1;
	blue = blue + 1;
	colors[i] = createColorCode(red,green,blue);
	i++
}
//red to blue
var red = 255;
var green = 0;
var blue = 0;
while(red > 0){
	red = red - 1;
	blue = blue + 1;
	colors[i] = createColorCode(red,green,blue);
	i++
}
//Red to Yellow
var red = 255;
var green = 0;
var blue = 0;
while(green < 255){
	green = green + 1;
	colors[i] = createColorCode(red,green,blue);
	i++
}
//Yellow to Green
var red = 255;
var green = 255;
var blue = 0;
while(red > 1){
	red = red - 1;
	colors[i] = createColorCode(red,green,blue);
	i++
}
//Greens to Turqoise
var red = 0;
var green = 255;
var blue = 0;
while(blue < 255){
	blue = blue + 1;
	colors[i] = createColorCode(red,green,blue);
	i++
}
//Turqoise to Blue
var red = 0;
var green = 255;
var blue = 255;
while(green > 0){
	green = green - 1;
	colors[i] = createColorCode(red,green,blue);
	i++
}
//red to Purple
var red = 255;
var green = 0;
var blue = 0;
while(blue < 255){
	blue = blue + 1;
	colors[i] = createColorCode(red,green,blue);
	i++
}
//Purple to blue
var red = 255;
var green = 0;
var blue = 255;
while(blue > 0){
	blue = blue - 1;
	colors[i] = 'rgb('+red+','+green+','+blue+')';
	i++
}