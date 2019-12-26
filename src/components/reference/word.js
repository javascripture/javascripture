// External
import React from 'react';

// Internal
import strongsColor from '../strongs-color.js';
import WordSingle from './word-single.js';

function startsWithPunctuation( word ) {
	return word.indexOf( '(' ) === 0;
}

function endsWithPunctuation( word ) {
	return word.indexOf( '\.' ) === 0 ||
		word.indexOf( ')' ) === 0 ||
		word.indexOf( '?' ) === 0 ||
		word.indexOf( '!' ) === 0 ||
		word.indexOf( ':' ) === 0 ||
		word.indexOf( ';' ) === 0 ||
		word.indexOf( ',' ) === 0;
}

const Word = ( { word, version, language } ) => {
	if ( ! word ) {
		return null;
	}

	const [ wordValue, lemma, morph ] = word;

	const wordString = wordValue && wordValue.split('/').map( ( wordSingleValue, key ) => (
		<WordSingle key={ key } lemma={ lemma ? lemma.split('/')[ key ]: null } word={ wordSingleValue } morph={ morph ? morph.split('/')[ key ] : null } version={ version } language={ language } />
	) );

	if ( endsWithPunctuation( word ) ) { // this removes the space between the and king in esther 1:13 || ( props.lastWord && startsWithPunctuation( props.lastWord[0] ) ) ) {
		return wordString;
	}

	return (
		<React.Fragment> { wordString }</React.Fragment>
	);
}

export default Word;
