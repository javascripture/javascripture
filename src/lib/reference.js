export const createReferenceLink = ( reference ) => {
	return '/' + reference.book + '/' + reference.chapter + '/' + reference.verse;
};

export const getVerseData = ( reference, version, data ) => {
	return data[ version ][ reference.book ][ reference.chapter - 1 ][ reference.verse - 1 ];
};

export const mapVersionToData = ( book, version ) => {
	if ( version === 'original' || version === 'LC' ) {
		return bible.Data.otBooks.indexOf( book ) > -1 ? 'hebrew' : 'greek';
	}

	return version;
};

export const getReferenceText = ( referenceObject ) => {
	return referenceObject.book + ' ' + referenceObject.chapter + ':' + referenceObject.verse;
};