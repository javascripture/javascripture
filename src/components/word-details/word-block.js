// External dependencies
import classnames from 'classnames';
import map from 'lodash/map';
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { useDispatch, useSelector } from 'react-redux';

// Internal dependencies
import { settingsChange } from '../../actions'
import KJVDef from './kjv-def';
import morphology from '../../lib/morphology';
import SearchBlock from '../search/search-block.js';
import { getHighlight } from '../strongs-color.js';
import stripPointing from '../../lib/strip-pointing.js';
import styles from './styles.scss';
import { getFamily } from '../../lib/word';
import WordBlockHeader from './word-block-header';
import WordBlockLink from './word-block-link';

const strongs = javascripture.data.strongsDictionary;
const strongsWithFamilies = javascripture.data.strongsObjectWithFamilies;

const WordBlockDetails = React.memo( ( { morphologyProp, strongsNumber, version } ) => {
	const dispatch = useDispatch();
	const expandedSearchResults = useSelector( state => state.settings.expandedSearchResults );
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

	const getMorphology = () => {
		return morphologyProp && morphologyProp.split( ' ' ).map( ( morph, index ) => {
			return ( index !== 0 ? ' - ' : '' ) + morphology( morph, 'noLinks', strongsNumber );
		} );
	};

	const getKJVDefinitions = () => {
		const wordDetail = strongs[ strongsNumber ];

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

	const expandSearchResults = () => {
		dispatch( settingsChange( 'expandedSearchResults', true ) );
	};

	const collapseSearchResults = () => {
		dispatch( settingsChange( 'expandedSearchResults', false ) );
	};

	const wordDetail = strongs[ strongsNumber ];

	return (
		<div>
			{ strongsNumber } | { stripPointing( wordDetail.lemma ) }
			{ wordDetail.xlit ? ' | ' + wordDetail.xlit : null }
			{ wordDetail.translit ? ' | ' + wordDetail.translit : null }
			{ wordDetail.pronounciation ? ' | ' + wordDetail.pronounciation : null }
			<br />
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
			<div>
				<strong>Morphology</strong><br />{ morphologyProp } - { morphologyProp && getMorphology() }<br />
				<br />
				<strong>KJV translations</strong><br />{ getKJVDefinitions( strongsNumber ) }<br />
				<br />
				<strong>Strongs' Derivation</strong><br />{ wordDetail.derivation }<br />
			</div>
			<br />
			<strong>Found in</strong> { expandedSearchResults ? ( <a className={ styles.foundInExtra } onClick={ collapseSearchResults }>collapse</a> ) : ( <a className={ styles.foundInExtra } onClick={ expandSearchResults }>expand</a> ) }
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

	toggleDetails() {
		this.props.toggleWord();
	}

	getClassName( rootNumber ) {
		return classnames( rootNumber, styles.wordTree )
	}

	termTitle( { clusivity, version, lemma, range, clickedWord } ) {
		return 'strongs number: ' + lemma + '\nversion: ' + version + '\nclusivity: ' + clusivity + '\nrange: ' + range + '\nclicked word: ' + clickedWord;
	}

	render() {
		const strongsNumber = this.props.strongsNumber,
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
						<div className={ classnames( styles.wordBlock, this.props.open ? styles.visible : styles.hidden ) }>
							<WordBlockDetails morphologyProp={ this.props.morphology } strongsNumber={ strongsNumber } version={ this.props.version } />
						</div>
						<SearchBlock { ...this.props } terms={ this.getSearchParameters() } />
					</div>
				</div>
			);
		}

		return null;
	}
};

export default withStyles( styles )( WordBlock );
