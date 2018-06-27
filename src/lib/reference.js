export const createReferenceLink = ( reference ) => {
	return '/' + reference.book + '/' + reference.chapter + '/' + reference.verse;
};

export const getLanguageFromVersion = ( book, version ) => {
	if ( version === 'original' || version === 'lc' ) {
		return bible.Data.otBooks.indexOf( book ) > -1 ? 'hebrew' : 'greek';
	}

	return version;
};
