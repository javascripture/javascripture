// External
import React from 'react';
import classnames from 'classnames';
import { useDispatch } from 'react-redux';

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

export default React.memo( ( props ) => {
	const { lemma, morph, version, word } = props;
	const dispatch = useDispatch();

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
		let lemmaForMorph = lemma;
		if ( ! lemma ) {
			lemmaForMorph = '';
		}
		return lemmaForMorph + ' - ' + ( morph ? morph : '' ) + ' - ' + morphology( morph, 'noLinks', lemmaForMorph );
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
			onClick={ () => dispatch( selectWord( props ) ) }
			title={ getTitle() }
			key={ lemma }
			>
			{ getWord() }
		</span>
	);
} );
