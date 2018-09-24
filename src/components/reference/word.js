// External
import React from 'react';

// Internal
import strongsColor from '../strongs-color.js';
import WordSingle from '../../containers/word-single.js';

class Word extends React.Component{
	render() {
		if ( ! this.props.word ) {
			return null;
		}

		const word = this.props.word[ 0 ],
			lemma = this.props.word[ 1 ],
			morph = this.props.word[ 2 ];

		let wordString;

		// Handle dvnNm
		if ( ( lemma === 'H3068' || lemma === 'H3069' || lemma === 'H3050' ) && this.props.version === 'kjv' ) {
			var wordArray,
				wordArrayEnd = word.split( '</dvnNm>' );

			if ( wordArrayEnd.length > 1 ) {
				wordArray = wordArrayEnd[0].split( '<dvnNm>' );
				if ( wordArrayEnd[ 1 ] ) {
					wordArray.push( wordArrayEnd[ 1 ] );
				}

				wordString = wordArray.map( ( word, index ) => {
					var textTransform;
					if ( index === 1 ) {
						textTransform = 'uppercase';
					}

					return <WordSingle lemma={ lemma } textTransform={ textTransform } word={ word } morph={ morph } key={ index } version={ this.props.version } language={ this.props.language } />;
				}, this );
			}
		} else {
			wordString = word && word.split('/').map( ( wordValue, key ) => (
				<WordSingle key={ key } lemma={ lemma ? lemma.split('/')[ key ]: null } word={ wordValue } morph={ morph ? morph.split('/')[ key ] : null } version={ this.props.version } language={ this.props.language } />
			) );
		}

		if ( this.props.version === 'esv' ) {
			if ( this.props.lastWord && this.props.lastWord[1] !== '' && lemma ) {
				return (
					<span> { wordString }</span>
				);
			} else {
				return (
					<span>{ wordString }</span>
				);
			}
		}

		return (
			<span>{ wordString } </span>
		);
	}
}

export default Word;
