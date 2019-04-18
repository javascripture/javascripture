// External
import React from 'react';

// Internal
import strongsColor from '../strongs-color.js';
import WordSingle from '../../containers/word-single.js';

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

class Word extends React.Component{
	render() {
		if ( ! this.props.word ) {
			return null;
		}

		const word = this.props.word[ 0 ],
			lemma = this.props.word[ 1 ],
			morph = this.props.word[ 2 ];

		let wordString;


		wordString = word && word.split('/').map( ( wordValue, key ) => (
			<WordSingle key={ key } lemma={ lemma ? lemma.split('/')[ key ]: null } word={ wordValue } morph={ morph ? morph.split('/')[ key ] : null } version={ this.props.version } language={ this.props.language } />
		) );

		if ( endsWithPunctuation( word ) ) { // this removes the space between the and king in esther 1:13 || ( this.props.lastWord && startsWithPunctuation( this.props.lastWord[0] ) ) ) {
			return (
				<span>{ wordString }</span>
			);
		}

		return (
			<span> { wordString }</span>
		);
	}
}

export default Word;
