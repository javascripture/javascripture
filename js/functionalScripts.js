	/*History Functions*/
	function setHashState(book,chapter,verse){
		window.location.hash = javascripture.modules.reference.createReferenceLink( { book: book, chapter: chapter, verse: verse } );
	}
	function previousChapter(){
		if($('select#chapterSelect option:selected').prev().attr('selected', 'selected').change().length > 0) {
			return true;
		}
	}
	function previousBook(){
		$('select#bookSelect option:selected').prev().attr('selected', 'selected').change();
		return true;
	}
	function selectOptionDisplay(selectObject) {
        var startDate = new Date();
		var context = false;
		var book, chapter, verse;
		$('.current').removeClass('current');
		if(selectObject.hasClass('bookSelect')){
			book = selectObject.val();
			chapter = 1;
			verse = 1;
		} else if(selectObject.hasClass('chapterSelect')){
			book = $('select#bookSelect').val();
			chapter = selectObject.val();
			verse = 1;
		} else if(selectObject.hasClass('verseSelect')) {
			book = $('select#bookSelect').val();
			chapter = $('select#chapterSelect').val();
			verse = selectObject.val();
		} else {
			book = $('select#bookSelect').val();
			chapter = $('select#chapterSelect').val();
			verse = $('select#verseSelect').val();
		}
		setHashState(book,chapter,verse);
		var endDate = new Date();
		timer(startDate, endDate);
	}
	function subdueColor(color, subdueColorBy){
		return parseInt(color/subdueColorBy, 10);
	}

	function searchByStrongsNumber(strongsNumberString) {
		var startDate = new Date();
		var references = '';
		var strongsNumberArray = [];
		var searchType = $('#searchSelect').val();
		var wordString = "";
		var strongsNumberAsId = strongsNumberString.replace(/ /gi,"");
		strongsNumberArray = strongsNumberString.split(' ');

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
		var referenceArray = [];
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
		references += '</ol></form>';

		//collapse all the others
		$('#referenceTracking .collapsable').addClass('closed');
		$('#referenceTracking #'+strongsNumberAsId).removeClass('closed');
		if(!$('#referenceTracking #'+strongsNumberAsId+' form').length > 0 ) {
			$('#referenceTracking #'+strongsNumberAsId).append(references);
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

var hoverIntentConfig = {
    sensitivity: 1, // number = sensitivity threshold (must be 1 or higher)
    interval: 250, // number = milliseconds for onMouseOver polling interval
    over: function(){initializeWordPanel($(this));}, // function = onMouseOver callback (REQUIRED)
    timeout: 250, // number = milliseconds delay before onMouseOut
    out: function(){hideWordPanel();} // function = onMouseOut callback (REQUIRED)
}

/*Word Tree*/
function wordTree( strongsNumber ) {
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
function maintainState( reference ){
	$('.dynamic').each(function(){
		var bookId = bible.getBookId( reference.book ),
			size = bible.Data.verses[ bookId - 1 ].length;

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

	$('select.bookSelect').val( reference.book );
	$('select.chapterSelect').val( reference.chapter );

//	$( '#goToReference' ).val( book + ' ' + chapter + ':' + verse );
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
/*Helper Methods*/
function timer(startDate, endDate){
	var startTime = startDate.getTime();
	var endTime = endDate.getTime();
	if(typeof(console) !== 'undefined'){
		console.log('time: ' + ( endTime - startTime ) );
	}
}
function createColorCode(red,green,blue){
	return 'rgb('+red+','+green+','+blue+')';
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