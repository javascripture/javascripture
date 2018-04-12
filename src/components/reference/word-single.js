// External
import React from 'react';

const getByLemmaAndMorph = function( lemma, morph ) {
	if ( 'undefined' !== typeof lemma && 'undefined' !== typeof javascripture.data.literalConsistent[ lemma ] ) {
		if ( 'undefined' !== typeof morph && 'undefined' !== typeof javascripture.data.literalConsistent[ lemma ][ morph ] ) {
			return javascripture.data.literalConsistent[ lemma ][ morph ];
		}
		return javascripture.data.literalConsistent[ lemma ]['no-morph'];
	}
	if ( 'undefined' !== typeof morph && 'undefined' !== typeof javascripture.data.literalConsistent[ morph ] ) {
		return javascripture.data.literalConsistent[ morph ];
	}
	return 'todo';
};

export default React.createClass( {
	getInitialState() {
		return {
			style: {}
		};
	},

	getLemma() {
		if ( this.props.lemma) {
			return this.props.lemma.split( ' ' ).filter( function( lemma ) {
				return lemma != 'G3588';
			} );
		}

		return [];
	},

	wordStyle() {
		let wordStyle = {};
		if ( this.props.textTransform ) {
			wordStyle.textTransform = this.props.textTransform;
		}
		return wordStyle;
	},



	getWord() {
		const lemmaArray = this.props.lemma.split( '/' ),
			morphArray = this.props.morph ? this.props.morph.split( '/' ) : undefined;

		if ( this.props.version === 'lc' ) {
			const morph = morphArray ? morphArray[ index ] : undefined;
			return lemmaArray.map( ( lemma, index ) => ( getByLemmaAndMorph( lemma, morph ) ) );
		}

		return this.props.word.split('/');
	},

	render() {
		return (
			<span
				className={ this.props.lemma }
				onMouseOver={ this.props.highlightOn }
				onMouseOut={ this.props.highlightOff }
				onClick={ this.props.click }
				title={ this.props.lemma ? this.props.lemma : null }
				style={ this.wordStyle() }
				key={ this.props.lemma }
				>
				{ this.getWord() }
			</span>
		);
	}

} );
