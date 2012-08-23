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
		/*$.mobile.changePage(
			{
				url: 'mobile.html',
				type: "get",
				data: $("form#referenceLookup").serialize()
			}
		);*/
		setHashState(book,chapter,verse);
		var endDate = new Date();
		timer(startDate, endDate);
	}
	function subdueColor(color, subdueColorBy){
		return parseInt(color/subdueColorBy);
	} 
	function highlightStrongsNumber(strongsNumber) {
		var strongsFamily = '';
		var type = '';
		if(typeof(strongsObjectWithFamilies[strongsNumber]) != "undefined") {
			type = "strongs";
			rootNumber = strongsObjectWithFamilies[strongsNumber]['family'];
		} else {
			type = "word";
			rootNumber = strongsNumber.replace(/ /gi,"");
		}
		if(!$('#'+rootNumber+'Family').length > 0) {
			var strongsTracking = '';
			if(type==="strongs") {
				strongsTracking += '<div class="collapsable" id="'+rootNumber+'Family" class="family-wrapper"><h2 class="'+rootNumber+'"><span class="text">'+rootNumber+'</span> <a class="remove" href="#"></a></h2><form>';
			} else { //word
				strongsTracking += '<div class="collapsable" id="'+rootNumber+'"><h2 class="'+rootNumber+'"><span class="text">'+rootNumber+'</span> <a class="remove" href="#"></a></h2>';
			}
			if(typeof(strongsFamilies[rootNumber]) != "undefined") {
				$.each(strongsFamilies[rootNumber], function(index, number) {
					strongsTracking += '<div class="collapsable" id="'+number+'"><h2 class="'+rootNumber+'"><span class="text">'+number+'</span></h2></div>';
				});
			}
			if(type==="strongs") {
				strongsTracking += '</form></div>';
			} else { //word
				strongsTracking += '</div>';
			}
			$('#referenceTracking .results').append(strongsTracking);
			$('body').data('class', $('body').data('class')+' '+rootNumber);
			$('body').addClass(rootNumber);
        }
	}
	function searchByStrongsNumber(strongsNumberString) {
		var startDate = new Date();
		var references = '';
		var strongsNumberArray = new Array();
		var searchType = $('#searchSelect').val();
		var wordString = "";
		var strongsNumberAsId = strongsNumberString.replace(/ /gi,"");
		highlightStrongsNumber(strongsNumberAsId);
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
		references += '<ol class="references">';
		var wordCount = 0;

		var searchObject = bibleObject;
		if($("select[name=searchLanguage]").val() === "hebrew") {
			searchObject = hebrewObject;
/*			$.each(strongsNumberArray, function(index, strongsNumber) {
				if(parseFloat(strongsNumber.substring(1, strongsNumber.length)) > 0) { //this is a number
					strongsNumberArray[index] = strongsNumber.substring(2, strongsNumber.length); //strip off the H and the 0 for hebrew searches
				}
			});*/
		}

		var referenceArray = new Array();
		$.each(searchObject, function(bookName, bookContent) {
			if($('#searchRange').val() === "book") {
				//search this string and return a reference
				if(findArrayElementsInString(strongsNumberArray, bookContent, searchType)){
					referenceArray.push([bookName,1,1,wordCount]);
				}
			} else {
				$.each(bookContent, function(chapterNumber, chapterContent) {
					if($('#searchRange').val() === "chapter") {
						if(findArrayElementsInString(strongsNumberArray, chapterContent, searchType)){
							referenceArray.push([bookName,chapterNumber+1,1,wordCount]);
						}
					} else {
						$.each(chapterContent, function(verseNumber, verseContent) {
							if(findArrayElementsInString(strongsNumberArray, verseContent, searchType)){
								referenceArray.push([bookName,chapterNumber+1,verseNumber+1,wordCount]);
							}
						});
					}
				});
			}
		});
		references += createReferenceList(referenceArray);
		references += '</ol>';

		//collapse all the others
		$('#referenceTracking .results .collapsable').addClass('closed');
		if(typeof(strongsObjectWithFamilies[strongsNumberAsId]) != "undefined") {
			$('#referenceTracking #'+strongsObjectWithFamilies[strongsNumberAsId]['family']+'Family').removeClass('closed');
		}
		$('#referenceTracking #'+strongsNumberAsId).removeClass('closed');
		if(!$('#referenceTracking #'+strongsNumberAsId+' form').length > 0 ) {
			var details = wordDetails(strongsNumberAsId);
			var contents = '<form>'+details+references+'</form>';
			$('#referenceTracking #'+strongsNumberAsId).append(contents);
		}
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

var findArrayElementsInString = function(array, string, searchType) {
	var wordCount = 0;
	string = string.toString(); //just in case ;)
	$.each(array, function(index, value) {
		if(parseFloat(value.substring(1, value.length)) > 0) { //this is a number
			var searchTypeStrongs = true;
		}
		var valuePosition = string.toLowerCase().indexOf(value.toLowerCase());
		if(valuePosition > 0) {
			var nextCharacterPosition = valuePosition + value.length;
			var nextCaracter = string.substring(nextCharacterPosition,nextCharacterPosition+1)
			var previousCharacterPosition = valuePosition - 1;
			var previousCharacter = string.substring(previousCharacterPosition,previousCharacterPosition+1)
			if(searchTypeStrongs) {
				//if next character is a number then it's not a match...
				if(parseInt(nextCaracter).toString() === "NaN" ) {
					wordCount++;
				}
			} else { //this is a word
				if($('#strictSearch:checked').length > 0){ //coulb be passed as parameter
					if((nextCaracter === " " || nextCaracter === "<") && (previousCharacter === " " || previousCharacter === "<") ) {
						wordCount++;
					}
				} else {
					wordCount++;
				}
			}
		}
	});
	if((wordCount > 0 && searchType === 'any') || (wordCount > array.length-1 && searchType === 'all') ) {
		return true;
	} else {
		return false;
	}
}

function loadReference(book,chapter,verse){
	chapterInArray = chapter - 1;
	verseInArray = verse - 1
	context = false;
	var reference = book + ' ' + (chapter) + ':' + (verse);
	$('head title').text(reference);
	var chapterText = "<h1>"+reference+"</h1>";
	chapterText += '<ol id="start">';
	if(hebrewObject && hebrewObject[book] && hebrewObject[book][chapterInArray].length > bibleObject[book][chapterInArray].length) { //there are more hebrew verses than english
		primaryObject = hebrewObject;
		secondaryObject = bibleObject;
		primaryClass = "hebrew";
		secondaryClass = "english";
	} else {
		primaryObject = bibleObject;
		secondaryObject = hebrewObject;
		primaryClass = "english";
		secondaryClass = "hebrew";
	}
	//todo - implement templating system
	$.each(primaryObject[book][chapterInArray], function(verseNumber, verseText) {
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
		//load primary object
		chapterText += '<div class="'+primaryClass+'">';
		chapterText += verseText;
		chapterText += "</div>";
		//Load secondary object
		if(secondaryObject[book] && secondaryObject[book][chapterInArray][verseNumber]) {
			chapterText += '<div class="'+secondaryClass+'">';
			chapterText += secondaryObject[book][chapterInArray][verseNumber];
			chapterText += "</div>";
		}
		chapterText += '</div>';
		chapterText += '</li>';
	});

	chapterText += '</ol>';
	chapterText = chapterText.replace(/<w/gi,'<span')
	                         .replace(/<\/w>/gi,'</span> ')
	                         .replace(/<q who="Jesus" marker="">/gi,'')
	                         .replace(/<\/q>/gi,'')
	                         .replace(/strong:/gi, '')
//	                         .replace(/lemma=\"/gi, 'title="') 
//	                         .replace(/lemma=\"H([0-9]+)\"/gi, 'class="H$1" lemma="H$1"')
//	                         .replace(/lemma=\"G([0-9]+)\"/gi, 'class="G$1" lemma="G$1"')
	;
	$('body').attr('class',$('body').data('class'));
	$('#verse').html(chapterText);
	/*$.each($('#verse .hebrew span'),function() {
	//	if($(this).attr('lemma')){
			var newLemma = 'H0' + $(this).attr('class');
			$(this).attr('class',newLemma);
	//	}
	});
	/*$.each($('#verse span'),function() {
		if($(this).attr('lemma')){
			$(this).addClass($(this).attr('lemma').replace(/strong:/gi,''));
		}
	});*/
	$('#wordControlPanel').hide();
	//$('#verse ol > li span, #strongsTracking ul > li span').hoverIntent(hoverIntentConfig);
	scrollVerseTo($('#context'));
	maintainState(book,chapter,verse,context);
	
	//todo - move this to the data
	setTimeout(function() {
		$.each($('#verse ol > li span'),function(){
			var thisSpan = $(this);
			if(thisSpan.attr('lemma')) {
				thisSpan.attr('title',$(this).attr('lemma'));
				//loop array of lemma
				$.each(thisSpan.attr('lemma').split(' '), function(key, value) {
					thisSpan.attr('class',strongsObjectWithFamilies[value]['family']);				
				});
			}
		});
	}, 1);
}
var hoverIntentConfig = {
    sensitivity: 1, // number = sensitivity threshold (must be 1 or higher)
    interval: 250, // number = milliseconds for onMouseOver polling interval
    over: function(){showWordDetails($(this).attr('lemma'));},//initializeWordPanel($(this));}, // function = onMouseOver callback (REQUIRED)
    timeout: 250, // number = milliseconds delay before onMouseOut
    out: function(){}//hideWordPanel();} // function = onMouseOut callback (REQUIRED)
}

function wordDetails(strongsNumber) {
			var details = '';
			if(strongsNumber !== 'added' && strongsNumber !== 'trans-change' && strongsDictionary[strongsNumber] ) {
				var strongsObject = strongsDictionary[strongsNumber];
				var lemma = stripPointing(strongsObject["lemma"]);
				var strongsDef = strongsObject["strongs_def"];
				var kjvDef = strongsObject["kjv_def"];
				var pron = strongsObject["pron"];
				var xlit = strongsObject["xlit"];
				var derivation = strongsObject["derivation"];
				var family = strongsObjectWithFamilies[strongsNumber]["family"];
				details += '<ul class="details">';
				details += '<li>lemma: '+lemma+'</li>';
				details += '<li>strongsDef: '+strongsDef+'</li>';
				details += '<li>kjvDef: '+kjvDef+'</li>';
				details += '<li>pron: '+pron+'</li>';
				details += '<li>xlit: '+xlit+'</li>';
				details += '<li>derivation: '+derivation+'</li>';
				details += '<li>family: '+family+'</li>';
				details += '</ul>';
				return details
			}
}

/*Word panel*/
function initializeWordPanel(spanObject) {
	var strongsNumberArray = spanObject.attr('lemma').split(' ');
	var strongsNumberPrefix = '';
	var strongsNumberDisplay = '';
	var lemma = '';
	var strongsDef = '';
	var kjvDef = '';
	var englishWord = '';
	$('.control-panel .duplicated').remove();
	$.each(strongsNumberArray, function(i,strongsNumber) {
		if(strongsNumber !== 'added' && strongsNumber !== 'trans-change' && strongsDictionary[strongsNumber] ) {
			lemma = stripPointing(strongsDictionary[strongsNumber]["lemma"]);
			strongsDef = strongsDictionary[strongsNumber]["strongs_def"];
			kjvDef = strongsDictionary[strongsNumber]["kjv_def"];
			pron = strongsDictionary[strongsNumber]["pron"];
			xlit = strongsDictionary[strongsNumber]["xlit"];
			derivation = strongsDictionary[strongsNumber]["derivation"];
			family = strongsObjectWithFamilies[strongsNumber]["family"];
			englishWord = spanObject.html();
			var infoObject = $('.control-panel .template').clone().removeClass('template').addClass('duplicated');
			infoObject.appendTo('#wordControlPanel .control-panel')
			infoObject.find('.wordControlPanelStrongsNumber').addClass(strongsNumber).text(strongsNumber);
			infoObject.find('.wordControlPanelLemma').text(lemma);
			infoObject.find('.wordControlPanelEnglish').html(englishWord).addClass(strongsNumber);
			infoObject.find('.wordControlPanelStrongsDef').text(strongsDef);
			infoObject.find('.wordControlPanelKJVDef').text(kjvDef);
			infoObject.find('.wordControlPanelXLit').text(xlit);
			infoObject.find('.wordControlPanelPron').text(pron);
			infoObject.find('.wordControlPanelDerivation').text(derivation);
			infoObject.find('.wordControlPanelFamily').text(family);
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
	var leftPosition = spanObject.offset().left - 5;// + spanObject.width(); /// 2; //0 - ($('#wordControlPanel').width() / 2 - $(this).width() / 2);
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
	}).attr('class','').addClass('not-active').addClass(positionClass).addClass(spanObject.attr('class'));
	$('#wordControlPanel .definitions').addClass('hide');
}
function hideWordPanel() {
	$('#wordControlPanel.not-active').hide();
}
/*Word Tree*/
function wordTree(strongsNumber){
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
	var wordTreeString = '';
	wordTreeString += '<div class="wordTree">';
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
	wordTreeString = '</div>';
	return wordTreeString;
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
	$('.verse').scrollTop(0);
	if(verse.length > 0) {
		$('.verse').scrollTop(verse.offset().top);
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
.replace(/֑/,'')
.replace(/֗/,'')
.replace(/֨/,'')
.replace(/֔/,'');
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

var createReferenceList = function(referenceArray) {
	var referenceList = "";
	$.each(referenceArray, function(index, value){
		referenceList += createReferenceListItem(value);
	});
	return referenceList;
}

function createReferenceListItem(referenceArray) {
	var book = referenceArray[0];
	var chapter = referenceArray[1];
	var verse = referenceArray[2];
	var wordCount = referenceArray[3];
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

if(typeof(console) == 'undefined'){
	console = new Object;
	console.log = function(stuff) {
		$('.console').html(stuff);
	}
}
