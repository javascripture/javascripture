	$(document).ready(function(){
		$("select").change(function(){selectOptionDisplay($(this));});
		$("ul.bookSelect li").click(function() {
			$('select.bookSelect').val($(this).attr("class")).change();
		});
		$("ul.chapterSelect li").click(function() {
			$('select.chapterSelect').val($(this).text()).change();
		});
		$("ul.verseSelect li").click(function() {
			$('select.verseSelect').val($(this).text()).change();
		});
		$('span').live('dblclick',function(){
			searchByStrongsNumber($(this).attr('class'));
		});
		$('a').live('focus',function(){
			$(this).click();
		});
		$('a').live('click',function(){
			var href = $(this).attr('href').split(",");
			var book = href[0];
			var chapter = parseInt(href[1]) + 1;
			var verse = parseInt(href[2]) + 1;
			goToReference(book,chapter,verse);
			return false;
		});
		$('input#search').click(function() {
			searchByStrongsNumber($('input#searchTerm').val());
		});
		$('select#bookSelect').val("Gen").change();
		$('select#chapterSelect').val(1).change();
		$('select#verseSelect').val(1).change();
	});
	function selectOptionDisplay(selectObject) {
		var startDate = new Date()
		var startTime = startDate.getTime();
		var book = $('select#bookSelect').val();
		var chapter = $('select#chapterSelect').val() - 1;
		var verse = $('select#verseSelect').val() - 1;
		$('.current').removeClass('current');
		if(typeof(book) != undefined) {
			var bookSize = bibleObject[book].length;
			if(selectObject.attr("id") === "chapterSelect"){
				if(typeof(bookSize) != undefined && typeof(chapter) !=  undefined) {
					var chapterSize = bibleObject[book][chapter].length
				}
				numberToDisplay = chapterSize;
				targetSelectObject = $('#verseSelect');
			} else if (selectObject.attr("id") === "bookSelect") {
				numberToDisplay = bookSize;
				targetSelectObject = $('#chapterSelect');
			}
			if(typeof(targetSelectObject) != undefined) {
				targetSelectObject.attr('size',numberToDisplay);
				targetSelectObject.children('option').each(function(){
					if($(this).val() <= numberToDisplay){
						$(this).addClass('show');
					} else {
						$(this).removeClass('show');
					}
				});
			}
			if(typeof(verse) != undefined) {
				var reference = book + ' ' + (chapter+1) + ':' + (verse+1);
				$('head title').text(reference);
				var chapterText = '<h1>' + reference + '</h1>';
				chapterText += '<ol>';
				$.each(bibleObject[book][chapter], function(verseNumber, verseText) {
					chapterText += '<li';
					if(verseNumber === verse) {
						chapterText += ' id="current"';
					}
					chapterText += '>';
					chapterText += verseText;
					chapterText += '</li>';
				});
				chapterText += '<ol>';
				$('#verse').html(chapterText);
			}
			window.location.href = '#current';
			/*var verseString = verse.toString();
			$('ul.bookSelect li[class='+book+']').addClass('current');
			$('ul.chapterSelect li').filter(function() {
  				return $(this).text() == chapter.toString();
  				alert(chapter);
			});
			$('ul.verseSelect li').filter(function() {
  				return $(this).text() == verseString;
			});*/
			//$('ul.chapterSelect li[text='+chapter+']').addClass('current');
			//$('ul.verseSelect li[text='+verse+']').addClass('current');
			var endDate = new Date();
			var endTime = endDate.getTime();
			console.log(endTime - startTime);
		}
	}
	//>formatting
	function searchByStrongsNumber(strongsNumberString) {
		var startDate = new Date()
		var startTime = startDate.getTime();
		var references = '';
		var strongsTracking = '';
		var strongsNumberArray = new Array();
		strongsNumberArray = strongsNumberString.split(' ');
		$.each(strongsNumberArray, function(index, strongsNumber) {
			color = parseInt(strongsNumber.substring(1,strongsNumber.length)*1000).toString().substring(0,6);
			$('style').append('.'+strongsNumber+' {color:#fff;background:#'+color+';}');
			strongsTracking += '<li><a href="'+strongsNumber+'" class="'+strongsNumber+'">'+strongsNumber+'</a></li>';
			references += 'root: ' + strongsObject[strongsNumber]['root'];
		});
		$('#strongsTracking').append(strongsTracking);
		references += '<ol>';

		$.each(bibleObject, function(book, m) {
			$.each(m, function(j, n) {
				$.each(n, function(k, o) {
					$.each(strongsNumberArray, function(index, strongsNumber) {
						if(o.indexOf(strongsNumber+'"') > 0) {
							references += '<li><a href="' + book + ',' + j + ',' + k + '">'+book+' '+(j+1)+':'+(k+1)+'</a></li>';
						}
					});
				});
			});
		});
		references += '</ol>';
		$('#references').html(references);
		var endDate = new Date();
		var endTime = endDate.getTime();
		console.log(endTime - startTime);
	}
	function goToReference(book,chapter,verse){
		$('select#bookSelect').val(book);
		$('select#chapterSelect').val(chapter);
		$('select#verseSelect').val(verse).change();
	}