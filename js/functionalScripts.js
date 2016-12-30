	/*History Functions*/
	function setHashState(book,chapter,verse){
		window.location.hash = javascripture.modules.reference.createReferenceLink( { book: book, chapter: chapter, verse: verse } );
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
	if ( ! startDate || ! endDate ) {
		return;
	}

	var startTime = startDate.getTime();
	var endTime = endDate.getTime();
	if(typeof(console) !== 'undefined'){
		console.log('time: ' + ( endTime - startTime ) );
	}
}

function loading(jQueryObject) {
	jQueryObject.html('loading');
}
