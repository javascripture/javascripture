// External
import React from 'react';

// Internal
import WordSingle from './word-single.js';

function startingPunctuation( word ) {
	return word.indexOf( '(' ) === 0;
}

function startsWithPunctuation( word ) {
	return word.indexOf( '\.' ) === 0 ||
		word.indexOf( ')' ) === 0 ||
		word.indexOf( '?' ) === 0 ||
		word.indexOf( '!' ) === 0 ||
		word.indexOf( ':' ) === 0 ||
		word.indexOf( ';' ) === 0 ||
		word.indexOf( ',' ) === 0;
}

export default React.memo( ( { word, version } ) => {
	if ( ! word ) {
		return null;
	}

	const [ wordValue, lemma, morph ] = word;
	const lemmaArray = lemma ? lemma.split('/') : null;
	const morphArray = morph ? morph.split('/'): null;

	const getMorphSingle = ( key ) => {
		if ( ! morphArray ) {
			return null;
		}

		if ( morph.indexOf( 'H' ) === 0 && key > 0 ) {
			return 'H' + morphArray[ key ];
		}

		if ( morph.indexOf( 'A' ) === 0 && key > 0 ) {
			return 'A' + morphArray[ key ];
		}

		return morphArray[ key ];
	}

	const wordString = wordValue && wordValue.split('/').map( ( wordSingleValue, key ) => {
		return <WordSingle key={ key } lemma={ lemmaArray ? lemmaArray[ key ]: null } word={ wordSingleValue } morph={ getMorphSingle( key ) } version={ version } />;
	} );

	if ( startsWithPunctuation( wordValue ) ) {
		return wordString;
	}

	return <React.Fragment key={ word }> { wordString }</React.Fragment>;
} );
