document.getElementById( 'book1' ).innerHTML = (
	document.getElementById( 'book1' ).innerHTML +
	bible.Data.books.map( book => '<option>' + book[0] + '</option>' )
);

document.getElementById( 'book1' ).onchange = ( event ) => {
	const bookName = document.getElementById( 'book1' ).value;
	const bookNumber = bible.getBookId( bookName );
	document.getElementById( 'chapter1' ).innerHTML = (
		'<option>Select a chapter</option>' +
		bible.Data.verses[ bookNumber - 1 ].map( ( verses, index ) => '<option>' + ( index + 1 ) + '</option>' )
	);
	document.getElementById( 'verse1' ).innerHTML = (
		'<option>-</option>'
	);
};

document.getElementById( 'chapter1' ).onchange = ( event ) => {
	const bookName = document.getElementById( 'book1' ).value;
	const bookNumber = bible.getBookId( bookName );
	const chapterNumber = document.getElementById( 'chapter1' ).value;
	const numberOfVerses = bible.Data.verses[ bookNumber - 1 ][ chapterNumber - 1 ];
	document.getElementById( 'verse1' ).innerHTML = (
		'<option>Select a verse</option>' +
		_.range( numberOfVerses ).map( index => '<option>' + ( index + 1 ) + '</option>' )
	);
};

document.getElementById( 'verse1' ).onchange = ( event ) => {
	const bookName = document.getElementById( 'book1' ).value;
	const chapterNumber = document.getElementById( 'chapter1' ).value;
	const verseNumber = document.getElementById( 'verse1' ).value;
	//addReference( bookName + '.' + chapterNumber + '.' + verseNumber );
};





// copy pasta
document.getElementById( 'book2' ).innerHTML = (
	document.getElementById( 'book2' ).innerHTML +
	bible.Data.books.map( book => '<option>' + book[0] + '</option>' )
);

document.getElementById( 'book2' ).onchange = ( event ) => {
	const bookName = document.getElementById( 'book2' ).value;
	const bookNumber = bible.getBookId( bookName );
	document.getElementById( 'chapter2' ).innerHTML = (
		'<option>Select a chapter</option>' +
		bible.Data.verses[ bookNumber - 1 ].map( ( verses, index ) => '<option>' + ( index + 1 ) + '</option>' )
	);
	document.getElementById( 'verse2' ).innerHTML = (
		'<option>-</option>'
	);
};

document.getElementById( 'chapter2' ).onchange = ( event ) => {
	const bookName = document.getElementById( 'book2' ).value;
	const bookNumber = bible.getBookId( bookName );
	const chapterNumber = document.getElementById( 'chapter2' ).value;
	const numberOfVerses = bible.Data.verses[ bookNumber - 1 ][ chapterNumber - 1 ];
	document.getElementById( 'verse2' ).innerHTML = (
		'<option>Select a verse</option>' +
		_.range( numberOfVerses ).map( index => '<option>' + ( index + 1 ) + '</option>' )
	);
};

document.getElementById( 'verse2' ).onchange = ( event ) => {
	const bookName = document.getElementById( 'book2' ).value;
	const chapterNumber = document.getElementById( 'chapter2' ).value;
	const verseNumber = document.getElementById( 'verse2' ).value;
	//addReference( bookName + '.' + chapterNumber + '.' + verseNumber );
};