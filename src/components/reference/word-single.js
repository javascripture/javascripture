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
			return this.props.lemma.split( ' ' ).split( '/' ).filter( function( lemma ) {
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

	getWord( key ) {
		const lemmaArray = this.props.lemma.split( '/' )[ key ],
			morphArray = this.props.morph ? this.props.morph.split( '/' )[ key ] : undefined;

		if ( this.props.version === 'lc' ) {
			const morph = morphArray ? morphArray[ index ] : undefined;
			return lemmaArray.map( ( lemma, index ) => ( getByLemmaAndMorph( lemma, morph ) ) );
		}

		return this.props.word.split('/')[ key ];
	},

	highlightWord() {
		this.props.highlightWord( this.props.lemma );
	},

	render() {
		const words = this.props.lemma.split('/').map( ( lemma, key ) => {
			return (
				<span
					className={ lemma }
					onMouseOver={ this.highlightWord }
					onClick={ this.props.click }
					title={ lemma }
					style={ this.wordStyle() }
					key={ lemma }
					>
					{ this.getWord( key ) }
				</span>
			);
		} );

		return (
			<span>{ words }</span>
		);
	}

} );
