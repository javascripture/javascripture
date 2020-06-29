import _ from 'lodash';
import { uniq, sortBy, forEach, toPairs, fromPairs, orderBy } from 'lodash';

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
	const lemmas = verse.map( word => {
		const lemma = word[ 1 ].split( '/' );
		// filter out non-numeric lemmas
		return lemma.filter( singleLemma => ! isNaN( singleLemma[1] ) );
	} );

	// convert to string
	return lemmas.join( ' ' );
};

export const getLemmasForReference = ( reference, data ) => {
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

const getDataFromBook = ( reference, data ) => {
	return bible.Data.otBooks.indexOf( reference.book ) > -1 ? data.hebrew : data.greek;
}

export const compareTwoReferences = ( { referenceInfo: { reference, referenceToCompareWith, limit } , data } ) => {
	if ( ! reference || ! referenceToCompareWith ) {
		return null;
	}

	const ref1Lemmas = getLemmasForReference( reference, getDataFromBook( reference, data ) );
	const ref2Lemmas = getLemmasForReference( referenceToCompareWith, getDataFromBook( referenceToCompareWith, data ) );
	const comparison = ref1Lemmas.filter( lemma => {
		if ( javascripture.data.strongsObjectWithFamilies[ lemma ].count < limit ) {
			if ( ref2Lemmas.indexOf( lemma ) > -1 ) {
				return lemma;
			}
		}
	} );

	return uniq( comparison );
};

export const calculateRareWords = ( { referenceInfo: { reference, limit }, data } ) => {
	if ( ! reference ) {
		return null;
	}

	const lemmas = getLemmasForReference( reference, getDataFromBook( reference, data ) );
	return uniq( lemmas.filter( lemma => {
		return javascripture.data.strongsObjectWithFamilies[ lemma ].count < limit;
	} ) );
};

export const calculateCommonWords = ( { referenceInfo: { reference }, data } ) => {
	if ( ! reference ) {
		return null;
	}

	const lemmas = getLemmasForReference( reference, getDataFromBook( reference, data ) );
	const counted = {};
	forEach( lemmas, lemma => {
		if ( typeof counted[ lemma ] === 'undefined' ) {
			counted[ lemma ] = 1;
		} else {
			counted[ lemma ] = counted[ lemma ] + 1;
		}
	} );

	return _( counted ).toPairs( counted ).orderBy( [1], ['desc'] ).fromPairs().value();
};

export const calculateConnectionQuality = ( state ) => {
	const { referenceInfo: { reference, limit } , data } = state;
	if ( ! reference ) {
		return null;
	}

	const comparisonState = JSON.parse( JSON.stringify( state ) );
	comparisonState.referenceInfo.limit = 99999999999;
	const numberOfWordsInReference = uniq( getLemmasForReference( reference, getDataFromBook( reference, data ) ) ).length;
	const comparison = compareTwoReferences( comparisonState );
	const numberOfConnections = comparison ? comparison.length : 0;
	return numberOfConnections / numberOfWordsInReference;
};
