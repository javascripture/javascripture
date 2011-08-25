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
	function highlightStrongsNumber(strongsNumber, type) {
		var strongsNumberAsId = strongsNumber.replace(/ /gi,"");
		if(!$('#'+strongsNumberAsId).length > 0) {
			var strongsInt = parseInt(strongsNumber.substring(2,strongsNumber.length)/4);
			if(strongsInt > 0) {
				var subdueColorBy = $('#subdueColorBy').val();
				var color = colors[strongsInt];
				var colorArray = color.split('(')[1].split(')')[0].split(',')
				var red = subdueColor(colorArray[0], subdueColorBy);
				var green = subdueColor(colorArray[1], subdueColorBy);
				var blue = subdueColor(colorArray[2], subdueColorBy);
				var newColor = createColorCode(red,green,blue);
				var strongsStyle = '#'+strongsNumber+' #verse span.'+strongsNumber+', #'+strongsNumber+' .'+strongsNumber+', .'+strongsNumber+' {color:#fff;background:'+newColor+';}';
		    }
				var strongsTracking = '';
				strongsTracking += '<div class="collapsable" id="'+strongsNumberAsId+'"><style></style><h2 class="'+strongsNumber+'">'+strongsNumber+' <a class="remove" href="#"></a></h2></div>';
				$('#referenceTracking').append(strongsTracking);
			if(strongsInt > 0) {
        	    $('#'+strongsNumber+' style').html(strongsStyle);
            	$('#changeColor #colorFormStrongsNumber').val(strongsNumber);
	            color = $('#'+strongsNumber+' .'+strongsNumber).css("background-color");
				$('#changeColor #colorFormColor').val(color);
				$('#colorSelector div').css('background',newColor);
				$('#colorSelector').ColorPickerSetColor(RGBtoHEX(newColor));
		        $('#wordControlPanel').hide();
    	        $('#referenceTracking h2').hoverIntent(hoverIntentConfig);
    	    }
        }
	}
	function searchByStrongsNumber(strongsNumberString) {
		var startDate = new Date();
		var references = '';
		var strongsNumberArray = new Array();
		var searchType = $('#searchSelect').val();
		var wordString = "";
		var strongsNumberAsId = strongsNumberString.replace(/ /gi,"");
		highlightStrongsNumber(strongsNumberString);
		strongsNumberArray = strongsNumberString.split(' ');
/*
		//to differentiate between strongs numbers and not strongs numbers
		$.each(strongsNumberArray, function(index, strongsNumber) {
			if(parseFloat(strongsNumber.substring(1, strongsNumber.length)) > 0) { //this is a number
				highlightStrongsNumber(strongsNumber,'number');
				wordTree(strongsNumber);
				//this doesn't work as one word can have 2 strongs numbers... strongsNumberArray[index] = strongsNumber + '"';
			} else { //not a strongs number
				wordString = wordString + " " + strongsNumber;
//			    var strongsTracking += '<div class="collapsable"><h2 class="'+strongsNumber+'">'+strongsNumber+' <a class="remove" href="#"></a></h2></div>';
 //               $('#referenceTracking').append(strongsTracking);

			}
		});		
		if(wordString!=""){
			highlightStrongsNumber(wordString,'word');
		}*/
		references += '<form><ol class="references">';
		var wordCount = 0;

		var searchObject = bibleObject;
		if($("select[name=searchLanguage]").val() === "hebrew") {
			searchObject = hebrewObject;
			$.each(strongsNumberArray, function(index, strongsNumber) {
				if(parseFloat(strongsNumber.substring(1, strongsNumber.length)) > 0) { //this is a number
					strongsNumberArray[index] = strongsNumber.substring(2, strongsNumber.length); //strip off the H and the 0 for hebrew searches
				}
			});
		}		
		$.each(searchObject, function(bookName, bookContent) {
			$.each(bookContent, function(chapterNumber, chapterContent) {
				$.each(chapterConten, function(verseNumber, verseContent) {
					var wordCount = 0;
					$.each(strongsNumberArray, function(index, strongsNumber) {
						if(parseFloat(strongsNumber.substring(1, strongsNumber.length)) > 0) { //this is a number
							var searchTypeStrongs = true;
						}
						var strongsNumberPosition = o.toLowerCase().indexOf(strongsNumber.toLowerCase());
						if(strongsNumberPosition > 0) {
							var nextCharacterPosition = strongsNumberPosition + strongsNumber.length;
							var nextCaracter = o.substring(nextCharacterPosition,nextCharacterPosition+1)
							var previousCharacterPosition = strongsNumberPosition - 1;
							var previousCharacter = o.substring(previousCharacterPosition,previousCharacterPosition+1)
							if(searchTypeStrongs) {
								//if next character is a number then it's not a match...
								if(parseInt(nextCaracter).toString() === "NaN" ) {
									wordCount++;
								}
							} else { //this is a word
								if($('#strictSearch:checked').length > 0){
									if((nextCaracter === " " || nextCaracter === "<") && (previousCharacter === " " || previousCharacter === "<") ) {
										wordCount++;
									}
								} else {
									wordCount++;
								}
							}
						}
					});
					if((wordCount > 0 && searchType === 'any') || (wordCount > strongsNumberArray.length-1 && searchType === 'all') ) {
							referenceArray = new Array();
							referenceArray[0] = book;
							referenceArray[1] = j+1;
							referenceArray[2] = k+1;
							references += createReferenceListItem(referenceArray, wordCount);
					}
				});
			});
		});
		references += '</ol></form>';

		//collapse all the others
		$('#referenceTracking .collapsable').addClass('closed');
		$('#referenceTracking #'+strongsNumberAsId).removeClass('closed').append(references);

		goToFirstReference();
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
	var chapterText = "<h1>"+reference+"</h1>";
	chapterText += '<ol id="start">';
	$.each(bibleObject[book][chapterInArray], function(verseNumber, verseText) {
		chapterText += '<li>';
		chapterText += '<div class="wrapper"';
		if(verseNumber === verseInArray) {
			chapterText += ' id="current"';
		}
		if(verseNumber === verseInArray-5) {
			chapterText += ' id="context"';
			context = true;
		}
		chapterText += '>';
		chapterText += '<div class="english">';
		chapterText += verseText;
		chapterText += "</div>";
		//Load hebrew
		if(hebrewObject[book] && hebrewObject[book][chapterInArray][verseNumber]) {
			chapterText += "<div class='hebrew'>";
			//chapterText += hebrewObject[book][chapterInArray][verseNumber];
			chapterText += hebrewObject[book][chapterInArray][verseNumber].toString();
			chapterText += "</div>";
		}
		chapterText += '</div>';
		chapterText += '</li>';
	});

	chapterText += '</ol>';
	chapterText = chapterText.replace(/<w/gi,'<span').replace(/<\/w>/gi,'</span> ').replace(/<q who="Jesus" marker="">/gi,'').replace(/<\/q>/gi,'');
	$('#verse').html(chapterText);
	$.each($('#verse .hebrew span'),function() {
		if($(this).attr('lemma')){
			var newLemma = 'H0' + $(this).attr('lemma');
			$(this).attr('lemma',newLemma);
		}
	});
	$.each($('#verse span'),function() {
		if($(this).attr('lemma')){
			$(this).addClass($(this).attr('lemma').replace(/strong:/gi,''));
		}
	});
	$('#verse ol > li span, #strongsTracking ul > li span').hoverIntent(hoverIntentConfig);
	scrollVerseTo($('#context'));
	maintainState(book,chapter,verse,context);

}
var hoverIntentConfig = {
    sensitivity: 1, // number = sensitivity threshold (must be 1 or higher)
    interval: 250, // number = milliseconds for onMouseOver polling interval
    over: function(){initializeWordPanel($(this));}, // function = onMouseOver callback (REQUIRED)
    timeout: 250, // number = milliseconds delay before onMouseOut
    out: function(){hideWordPanel();} // function = onMouseOut callback (REQUIRED)
}

/*Word panel*/
function initializeWordPanel(spanObject) {
	var strongsNumberArray = spanObject.attr('class').split(' ');
	var strongsNumberPrefix = '';
	var strongsNumberDisplay = '';
	var lemma = '';
	var strongsDef = '';
	var kjvDef = '';
	var englishWord = '';
	$('.control-panel .duplicated').remove();
	$.each(strongsNumberArray, function(i,strongsNumber) {
		if(strongsNumber !== 'added' && strongsNumber !== 'trans-change' ) {
			strongsNumberDisplay = strongsNumber;
			/*convert*/
			strongsNumberPrefix = strongsNumber.substring(0,1);
			if(strongsNumberPrefix==="H") {
				osidStrongsNumber = strongsNumberPrefix + strongsNumber.substring(2,strongsNumber.length);
			} else {
				osidStrongsNumber = strongsNumberPrefix + strongsNumber.substring(1,strongsNumber.length);
			}
			lemma = stripPointing(strongsDictionary[osidStrongsNumber]["lemma"]);
			strongsDef = strongsDictionary[osidStrongsNumber]["strongs_def"];
			kjvDef = strongsDictionary[osidStrongsNumber]["kjv_def"];
			englishWord = spanObject.text();
			var infoObject = $('.control-panel .template').clone().removeClass('template').addClass('duplicated');
			infoObject.appendTo('#wordControlPanel .control-panel')
			infoObject.find('.wordControlPanelStrongsNumber').addClass(strongsNumberDisplay).text(strongsNumberDisplay);
			infoObject.find('.wordControlPanelLemma').text(lemma);
			infoObject.find('.wordControlPanelEnglish').text(englishWord);
			infoObject.find('.wordControlPanelStrongsDef').text(strongsDef);
			infoObject.find('.wordControlPanelKJVDef').text(kjvDef);
		}
	});
	showWordPanel(spanObject);
}
function showWordPanel(spanObject) {

	/*position*/
	$('#wordControlPanel').show();
	var positionClass = "";
	var topPosition = spanObject.offset().top + spanObject.height();//$('#wordControlPanel').height()
	if(topPosition + $('#wordControlPanel').height() > $('body').height()){
		var topPosition = spanObject.offset().top - $('#wordControlPanel').height();
		positionClass += "bottom";
	} else {
		positionClass += "top";
	}
	var leftPosition = spanObject.offset().left + spanObject.width(); /// 2; //0 - ($('#wordControlPanel').width() / 2 - $(this).width() / 2);
	positionClass += " ";
	if(leftPosition + $('#wordControlPanel').width() > $('body').width()){
		var leftPosition = spanObject.offset().left - $('#wordControlPanel').width();// / 2 - $(this).width() / 2);
		positionClass += "right";
	} else {
		positionClass += "left";
	}

	$('#wordControlPanel').css({
		'top': topPosition,
		'left': leftPosition
	}).attr('class','').addClass('not-active').addClass(positionClass);
	$('#wordControlPanel .definitions').addClass('hide');
}
function hideWordPanel() {
	$('#wordControlPanel.not-active').hide();
}
/*Word Tree*/
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
function goToFirstReference() {
	$('.references ol li:first').attr('id','currentRef').find('a').click();
}
function markReference(referenceLink){
	$('.references #currentRef').attr('id','');
	referenceLink.attr('id','currentRef');
    var href=referenceLink.attr('id','currentRef').find('a').attr('href');//this is a stupid way of doing it.
    window.location.hash = href;
}
function scrollVerseTo(verse) {
	$('#verse').closest('.panel').scrollTop(0);
	if(verse.length > 0) {
		$('#verse').closest('.panel').scrollTop(verse.offset().top);
	}
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

function stripPointing(word) {
var cleanWord = word.replace(/֑/gi,'')
.replace(/֓/gi,'')
.replace(/֕/gi,'')
.replace(/֖/gi,'')
.replace(/֘/gi,'')
.replace(/֙/gi,'')
.replace(/֚/gi,'')
.replace(/֛/gi,'')
.replace(/֜/gi,'')
.replace(/֝/gi,'')
.replace(/֞/gi,'')
.replace(/֟/gi,'')
.replace(/֠/gi,'')
.replace(/֡/gi,'')
.replace(/֢/gi,'')
.replace(/֣/gi,'')
.replace(/֤/gi,'')
.replace(/֥/gi,'')
.replace(/֦/gi,'')
.replace(/֧/gi,'')
.replace(/֩/gi,'')
.replace(/֪/gi,'')
.replace(/֫/gi,'')
.replace(/֬/gi,'')
.replace(/֭/gi,'')
.replace(/֮/gi,'')
.replace(/֯/gi,'')
.replace(/ֱ/gi,'')
.replace(/ֲ/gi,'')
.replace(/ֳ/gi,'')
.replace(/ֵ/gi,'')
.replace(/ֶ/gi,'')
.replace(/ַ/gi,'')
.replace(/ָ/gi,'')
.replace(/ֹ/gi,'')
.replace(/ֺ/gi,'')
.replace(/ֻ/gi,'')
.replace(/ּ/gi,'')
.replace(/ֽ/gi,'')
.replace(/־/gi,'')
.replace(/׀/gi,'')
.replace(/ׂ/gi,'')
.replace(/׃/gi,'')
.replace(/ׄ/gi,'')
.replace(/ׇ/gi,'')
.replace(/ׁ/gi,'')
.replace(/ִ/gi,'')
.replace(/ְ/,'')
//new ones
.replace(/ְ/,'')
.replace(/ְ/,'')
.replace(/ְ/,'')
.replace(/֗/,'')
.replace(/ְ/,'')
.replace(/ְ/,'')
.replace(/֔/,'')
.replace(/ְ/,'')
.replace(/ְ/,'')
.replace(/֨/,'')
.replace(/֑/,'');
//.replace(/\//,'');
return cleanWord;
}
function findRareWords(maximumNumberOfUses) {
	loading($('#rareWords'));
	setTimeout(function() {
	var rarewords = "rare words: <ol>";
	var rarewordsCount = 0;
	$.each(createUniqueStrongsNumbersArray(), function(index, strongsNumber) {
		var usageCount = 0;
		/*here we should create an array of unique items*/
		/*Duplicated from search*/
		$.each(bibleObject, function(book, m) {
			if(usageCount < maximumNumberOfUses) {
				$.each(m, function(j, n) {
					$.each(n, function(k, o) {
						if(o.toLowerCase().indexOf(strongsNumber.toLowerCase()) > 0) {
							usageCount = usageCount+1;
						}
					});
				});
			} else {
				//skip
			}
		});
		if((usageCount < maximumNumberOfUses) ) {
			rarewords += '<li><a href="#search='+strongsNumber+'" class="'+strongsNumber+'">'+strongsNumber+'</a>: '+usageCount+'</li>';
			highlightStrongsNumber(strongsNumber);
		}
		rarewordsCount = rarewordsCount+1;
	});
	rarewords += '</ol>';
	if(rarewordsCount == 0){
		rarewords = "none";
	}
	$('#rareWords').html(rarewords);
	}, 1);
}
function loading(jQueryObject) {
	jQueryObject.html('loading');
}

function createUniqueStrongsNumbersArray() {
	var strongsNumbersArray = new Array();
	$.each($('#verse ol li span'), function(i) {
		var strongsNumber = $(this).attr('class').split(' ');
		$.each(strongsNumber, function(index, strongsNumber) {
			strongsNumbersArray.push(strongsNumber);
		});
	});
	return strongsNumbersArray.unique();
}

function createReferenceListItem(referenceArray, wordCount) {
	var book = referenceArray[0];
	var chapter = referenceArray[1];
	var verse = referenceArray[2];
	return '<li><a href="#book=' + book + '&chapter=' + chapter + '&verse=' + verse + '">'+book+' '+(chapter)+':'+(verse)+'</a><input type="hidden" value="' + wordCount + '" /></li>';
}

 function currentReference() {
 	var referenceArray = new Array();
 	referenceArray[0] = $('select.bookSelect').val();
 	referenceArray[1] = $('select.chapterSelect').val();
 	referenceArray[2] = $('select.verseSelect').val();
 	return referenceArray;
}

Array.prototype.unique =
  function() {
    var a = [];
    var l = this.length;
    for(var i=0; i<l; i++) {
      for(var j=i+1; j<l; j++) {
        // If this[i] is found later in the array
        if (this[i] === this[j])
          j = ++i;
      }
      a.push(this[i]);
    }
    return a;
  };
  
  
  //actual converter function called by main function
 
function toHex(N) {
	if (N==null) return "00";
	N=parseInt(N); if (N==0 || isNaN(N)) return "00";
	N=Math.max(0,N); N=Math.min(N,255); N=Math.round(N);
	return "0123456789ABCDEF".charAt((N-N%16)/16) + "0123456789ABCDEF".charAt(N%16);
}
 
//function called to return hex string value
function RGBtoHEX(str)
{
	//check that string starts with 'rgb'
	if (str.substring(0, 3) == 'rgb') {
		var arr = str.split(",");
		var r = arr[0].replace('rgb(','').trim(), g = arr[1].trim(), b = arr[2].replace(')','').trim();
		var hex = [
			toHex(r),
			toHex(g),
			toHex(b)
		];
		return "#" + hex.join('');				
	}
	else{
		//string not rgb so return original string unchanged		
    return str;
	}
}