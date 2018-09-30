export const createReferenceLink = ( reference ) => {
	return '/' + reference.book + '/' + reference.chapter + '/' + reference.verse;
};

export const getVerseData = ( reference, version ) => {
	return javascripture.data[ version ][ reference.book ][ reference.chapter - 1 ][ reference.verse - 1 ];
};

export const getLanguageFromVersion = ( book, version ) => {
	if ( version === 'original' || version === 'lc' ) {
		return bible.Data.otBooks.indexOf( book ) > -1 ? 'hebrew' : 'greek';
	}

	return version;
};
