const getRandomReference = function() {
	var bookNumber = Math.floor(Math.random() * bible.Data.books.length),
		chapterNumber = Math.floor(Math.random() * bible.Data.verses[bookNumber].length),
		numberOfVerses = bible.Data.verses[bookNumber][chapterNumber],
		verseNumber = Math.floor(Math.random() * numberOfVerses),
		referenceObject = {};
	referenceObject.book = bible.Data.books[bookNumber][0];
	referenceObject.chapter = chapterNumber + 1;
	referenceObject.verse = verseNumber + 1;
	return referenceObject;
};

const initialState = getRandomReference();

const secondaryReference = ( state = initialState, action ) => {
	switch ( action.type ) {
		case 'SECONDARY_REFERENCE':
			const reference = action.reference,
				book = reference.book.replace( /\%20/gi, ' ' ),
				chapter = parseInt( reference.chapter ),
				verse = reference.verse ? parseInt( reference.verse ) : 1;

			return { book, chapter, verse };

		default:
			return state;
	}
}

export default secondaryReference;
