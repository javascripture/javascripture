// External dependencies
import classnames from 'classnames';
import map from 'lodash/map';
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';

// Internal dependencies
import { addWord, settingsChange } from '../../actions'
import KJVDef from './kjv-def';
import morphology from '../../lib/morphology';
import SearchBlock from '../search/search-block.js';
import { getHighlight } from '../strongs-color.js';
import stripPointing from '../../lib/strip-pointing.js';
import styles from './styles.scss';
import { getFamily } from '../../lib/word';
import WordBlockHeader from './word-block-header';

const strongs = javascripture.data.strongsDictionary;
const strongsWithFamilies = javascripture.data.strongsObjectWithFamilies;

const WordBlockLink = React.memo( ( { strongsNumber, version } ) => {
	const subdue = useSelector( state => state.settings.subdue );
	const dispatch = useDispatch();

	const getClassName = ( strongsNumber ) => {
		return classnames( strongsNumber, styles.wordTree )
	};

	const highlight = ( strongsNumber ) => {
		window.updateAppComponent( 'highlightedWord', strongsNumber );
	};

	const unHighlight = () => {
		window.updateAppComponent( 'highlightedWord', null );
	};

	const searchForWord = ( strongsNumber ) => {
		dispatch( addWord( {
			strongsNumber,
			subdue,
			open: true,
			morphology: null,
			version,
		} ) );
	};

	return (
		<span><a className={ getClassName( strongsNumber ) }
			onClick={ () => searchForWord( strongsNumber ) }
			onMouseOver={ () => highlight( strongsNumber ) }
			onMouseOut={ unHighlight }>
			{ strongsNumber }
		</a> </span>
	)
} );

const WordBlockDetails = React.memo( ( { strongsNumber, version } ) => {
	const getBranchesData = () => {
		return map( javascripture.data.strongsObjectWithFamilies, ( strongsObjectData, strongsObjectNumber ) => {
			if ( strongsObjectData.roots && strongsObjectData.roots.indexOf( strongsNumber ) > -1 ) {
				return (
					<WordBlockLink key={ strongsObjectNumber } strongsNumber={ strongsObjectNumber } version={ version } />
				);
			}
		} );
	};

	const getBranches = () => {
		const branchesData = getBranchesData();
		if ( branchesData ) {
			return branchesData;
		}

		return 'None';
	}

	const getRoots = () => {
		if ( ! javascripture.data.strongsObjectWithFamilies[ strongsNumber ] ) {
			return;
		}

		const rootsData = javascripture.data.strongsObjectWithFamilies[ strongsNumber ].roots;
		if( rootsData ) {
			return rootsData.map( ( rootNumber, index ) => {
				return (
					<WordBlockLink key={ index } strongsNumber={ rootNumber } version={ version } />
				);
			} );
		}

		return 'None';
	};

	return (
		<div>
			<div>
				<strong>Roots: </strong>{ getRoots() }
			</div>
			<div>
				<strong>Branches: </strong>{ getBranches() }
			</div>
			<div>
				<strong>Family: </strong>{ getFamily( strongsNumber ) }
			</div>
			<div>
				{ strongsWithFamilies[ strongsNumber ].count } uses
			</div>
			<br />
		</div>
	)
} );

class WordBlock extends React.Component {
	constructor( props ) {
		super( props );
		this.wordBlockRef = React.createRef();
	}
	getSearchParameters() {
		return {
			clusivity: 'exclusive',
			version: this.props.version,
			lemma: this.props.strongsNumber,
			range: 'verse',
			clickedWord: this.props.clickedWord,
		};
	}

	getKJVDefinitions() {
		const strongsNumber = this.props.strongsNumber,
			wordDetail = strongs[ strongsNumber ];

		return wordDetail.kjv_def && wordDetail.kjv_def.split( ',' ).map( ( word, index ) => {
			const wordString = word.trim().replace( /\./g, '' );

			return (
				<span key={ index }>
					{ index === 0 ? '' : ', ' }
					<KJVDef word={ wordString } strongsNumber={ strongsNumber } />
				</span>
			);
		} );
	}

	toggleDetails() {
		this.props.toggleWord();
	}

	searchForWord( strongsNumber ) {
		this.props.addWord( strongsNumber, this.props.settings.subdue );
	}

	getClassName( rootNumber ) {
		return classnames( rootNumber, styles.wordTree )
	}

	getMorphology = ( strongsNumber ) => {
		return this.props.morphology.split( ' ' ).map( ( morph, index ) => {
			return ( index !== 0 ? ' - ' : '' ) + morphology( morph, 'noLinks', strongsNumber );
		} );
	};

	renderDetails() {
		const strongsNumber = this.props.strongsNumber,
			wordDetail = strongs[ strongsNumber ],
			className = classnames( styles.wordBlock, this.props.open ? styles.visible : styles.hidden );

		return (
			<div className={ className } key={ className }>
				{ strongsNumber } | { stripPointing( wordDetail.lemma ) }
				{ wordDetail.xlit ? ' | ' + wordDetail.xlit : null }
				{ wordDetail.translit ? ' | ' + wordDetail.translit : null }
				{ wordDetail.pronounciation ? ' | ' + wordDetail.pronounciation : null }
				<br />
				<WordBlockDetails strongsNumber={ strongsNumber } version={ this.props.version } />
				<div>
					<strong>Morphology</strong><br />{ this.props.morphology } - { this.props.morphology && this.getMorphology( strongsNumber ) }<br />
					<br />
					<strong>KJV translations</strong><br />{ this.getKJVDefinitions( strongsNumber ) }<br />
					<br />
					<strong>Strongs' Derivation</strong><br />{ wordDetail.derivation }<br />
				</div>
				<br />
				<strong>Found in</strong> { this.props.settings.expandedSearchResults ? ( <a className={ styles.foundInExtra } onClick={ this.props.collapseSearchResults }>collapse</a> ) : ( <a className={ styles.foundInExtra } onClick={ this.props.expandSearchResults }>expand</a> ) }
			</div>
		);
	}

	termTitle( { clusivity, version, lemma, range, clickedWord } ) {
		return 'strongs number: ' + lemma + '\nversion: ' + version + '\nclusivity: ' + clusivity + '\nrange: ' + range + '\nclicked word: ' + clickedWord;
	}

	render() {
		const strongsNumber = this.props.strongsNumber,
			lemma = this.props.lemma,
			version = this.props.version,
			wordDetail = strongs[ strongsNumber ];

		if ( strongsNumber === 'G3588' ) {
			return null;
		}

		if ( wordDetail ) {
			return (
				<div>
					<style>{ getHighlight( strongsNumber, this.props.subdue, null ) }</style>
					<WordBlockHeader title={ this.termTitle( this.getSearchParameters() ) } strongsNumber={ strongsNumber } version={ version } textToCopy={ this.wordBlockRef } />
					<div ref={ this.wordBlockRef }>
						{ this.renderDetails() }
						<SearchBlock { ...this.props } terms={ this.getSearchParameters() } />
					</div>
				</div>
			);
		}

		return null;
	}
};

WordBlock.propTypes = {};

const mapStateToProps = ( state, ownProps ) => {
	return {
		settings: state.settings,
	};
};

const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		addWord: ( strongsNumber, subdue ) => {
			dispatch( addWord( {
				strongsNumber: strongsNumber,
				subdue,
				open: true,
				morphology: null,
				version: ownProps.version,
			} ) );
		},

		expandSearchResults: () => {
			dispatch( settingsChange( 'expandedSearchResults', true ) );
		},

		collapseSearchResults: () => {
			dispatch( settingsChange( 'expandedSearchResults', false ) );
		},

	}
};

const WordBlockContainer = connect(
	mapStateToProps,
	mapDispatchToProps,
)( WordBlock )

export default withStyles( styles )( WordBlockContainer );
