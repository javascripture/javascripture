// External dependencies
import map from 'lodash/map';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Internal dependencies
import { settingsChange } from '../../actions'
import KJVDef from './kjv-def';
import morphology from '../../lib/morphology';
import stripPointing from '../../lib/strip-pointing.js';
import styles from './styles.scss';
import { getFamily } from '../../lib/word';
import WordBlockLink from './word-block-link';
import SearchLink from '../search/search-link';
import { getReferenceFromSearchResult } from '../../lib/reference.js'

const strongs = javascripture.data.strongsDictionary;
const strongsWithFamilies = javascripture.data.strongsObjectWithFamilies;

const WordBlockDetails = React.memo( ( { morphologyProp, strongsNumber, version, word } ) => {
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
	const results = word.results && word.results.map( ( result, index ) => {
		const resultArray = result.split( '.' );
		const reference = {
			book: resultArray[ 0 ],
			chapter: resultArray[ 1 ],
			verse: resultArray[ 2 ],
		};

		return <SearchLink key={ index } index={ index } reference={ getReferenceFromSearchResult( result ) } word={ word } />;
	} );

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
			{ results && (
				<ol className={ styles.results }>{ results }</ol>
			) }
		</div>
	)
} );

export default WordBlockDetails;
