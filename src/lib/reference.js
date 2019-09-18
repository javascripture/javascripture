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

export const getAllLemmasFromReference = ( reference, data ) => {
	const verse = data[ reference.book ][ reference.chapter - 1 ][ reference.verse - 1 ];
	lemmas = verse.map( word => {
		const lemma = word[ 1 ].split( '/' );
		// filter out non-numeric lemmas
		return lemma.filter( singleLemma => ! isNaN( singleLemma[1] ) );
	} );

	// convert to string
	return lemmas.join( ' ' );
};

export const getLemmasForReference = ( reference, data ) => {
	console.log( reference );
	if ( ! reference.verse || reference.verse === 'all' ) {
		return data[ reference.book ][ reference.chapter - 1 ].map( verse => {
			return verse.map( word => {
				return word[ 1 ].split('/');
			} ).flat();
		} ).flat();
	}

	return data[ reference.book ][ reference.chapter - 1 ][ reference.verse - 1 ].map( word => {
		return word[ 1 ].split('/');
	} ).flat();

};

export const getReferenceFromSearchResult = ( result ) => {
	const reference = result.split( '.' );
	return {
		book: reference[0],
		chapter: reference[1],
		verse: reference[2],
	};
};
