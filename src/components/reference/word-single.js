// External
import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';

// Internal
import {
	addWord,
	deactivateSearchSelect,
	setTrayVisibilityFilter,
	updateSearchForm,
	appendToSearchForm
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
		let strongsNumber = lemma;
		if ( props.settings.highlightWordsWith === 'family' ) {
			strongsNumber = getFamily( lemma );
		}

		if ( strongsNumber !== "G3588" ) {
			window.updateAppComponent( 'highlightedWord', strongsNumber );
		}
	};

	const selectWord = () => {
		if( props.searchSelect ) {
			props.selectSearchTerm( props.searchSelect, props[ props.searchSelect ] );
			return;
		}

		props.addWord();
	};

	const getTitle = () => {
		if ( ! lemma ) {
			return null;
		}
		return morph ? lemma + ' ' + morphology( morph, 'noLinks', lemma ) : lemma;
	};

	const getClassName = () => {
		let family = null;
		if ( props.settings.highlightWordsWith === 'family' ) {
			family = getFamily( lemma );
		}

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
			onClick={ selectWord }
			title={ getTitle() }
			key={ lemma }
			>
			{ getWord() }
		</span>
	);
};

const mapStateToProps = ( state, ownProps ) => {
	return {
		settings: state.settings,
		searchSelect: state.searchSelect,
	}
};

const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		selectSearchTerm: ( name, value ) => {
			dispatch( appendToSearchForm( name, value ) );
			dispatch( updateSearchForm( 'version', ownProps.version ) );
			dispatch( deactivateSearchSelect() );
		},
		addWord: () => {
			dispatch( setTrayVisibilityFilter( 'word' ) );

			ownProps.lemma && ownProps.lemma.split( ' ' ).map( strongsNumber => {
				if ( strongsNumber === "G3588" ) {
					return;
				}

				dispatch( addWord( {
					strongsNumber,
					open: true,
					morphology: ownProps.morph,
					version: ownProps.version,
					clickedWord: ownProps.word,
				} ) );
			} );
		},
	}
};

const WordSingleContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)( WordSingle )

export default WordSingleContainer;
