// External
import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';

// Internal
import {
	selectWord,
} from '../../actions';
import { getFamily } from '../../lib/word';
import morphology from '../../lib/morphology';

const getByLemmaAndMorph = function( lemma, morph ) {
	if ( 'undefined' !== typeof lemma && 'undefined' !== typeof javascripture.data.literalConsistent[ lemma ] ) {
		if ( 'undefined' !== typeof morph && 'undefined' !== typeof javascripture.data.literalConsistent[ lemma ][ morph ] ) {
			return javascripture.data.literalConsistent[ lemma ][ morph ];
		}

		if( javascripture.data.literalConsistent[ lemma ]['no-morph'] ) {
			return javascripture.data.literalConsistent[ lemma ]['no-morph'];
		}

		var firstKey = Object.keys(javascripture.data.literalConsistent[ lemma ])[0];
		return javascripture.data.literalConsistent[ lemma ][ firstKey ];
	}
	if ( 'undefined' !== typeof morph && 'undefined' !== typeof javascripture.data.literalConsistent[ morph ] ) {
		return javascripture.data.literalConsistent[ morph ];
	}
	return 'todo';
};

const WordSingle = ( props ) => {
	const { lemma, morph, version, word } = props;

	const getWord = () => {
		if ( version === 'LC' ) {
			return getByLemmaAndMorph( lemma, morph ) + ' ';
		}

		return word;
	};

	const clearHighlightWord = () => {
		window.updateAppComponent( 'highlightedWord', '' );
	};

	const highlightWord = () => {
		if ( lemma !== "G3588" ) {
			window.updateAppComponent( 'highlightedWord', lemma );
		}
	};

	const getTitle = () => {
		if ( ! lemma ) {
			return null;
		}
		return morph ? lemma + ' ' + morphology( morph, 'noLinks', lemma ) : lemma;
	};

	const getClassName = () => {
		const family = lemma ? lemma.split( ' ' ).map( oneLemma => getFamily( oneLemma ) + '-family' ) : null;

		if ( lemma === 'added' ) {
			return classnames( 'single', lemma );
		}

		return classnames( 'single', lemma, family );
	};

	return (
		<span
			className={ getClassName() }
			onMouseOver={ highlightWord }
			onMouseOut={ clearHighlightWord }
			onClick={ props.selectWord }
			title={ getTitle() }
			key={ lemma }
			>
			{ getWord() }
		</span>
	);
};

const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		selectWord: () => {
			dispatch( selectWord( ownProps ) );
		},
	}
};

const WordSingleContainer = connect(
	null,
	mapDispatchToProps
)( WordSingle )

export default WordSingleContainer;
