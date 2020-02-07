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

const getLiteralConsistent = function( word, lemma, morph ) {
	if ( ! javascripture.data.LC ) {
		return null;
	}

	if ( ! javascripture.data.LC[ word ] ) {
		return null;
	}

	if ( ! lemma ) {
		lemma = '';
	}

	if ( typeof javascripture.data.LC[ word ][ lemma ][ morph ] === 'string' ) {
		return javascripture.data.LC[ word ][ lemma ][ morph ];
	}

	return null;
}

const WordSingle = ( props ) => {
	const { lemma, morph, version, word } = props;

	const getWord = () => {
		if ( version === 'LC' ) {
			return getLiteralConsistent( word, lemma, morph ) + ' ';
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
