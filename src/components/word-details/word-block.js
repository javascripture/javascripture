// External dependencies
import classnames from 'classnames';
import map from 'lodash/map';
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import CancelSvg from '../svg/cancel.js';
import KJVDef from '../../containers/kjv-def';
import morphology from '../../lib/morphology';
import SearchBlock from '../../containers/search-block';
import { getHighlight } from '../strongs-color.js';
import stripPointing from '../../lib/strip-pointing.js';
import styles from './styles.scss';
import { getFamily } from '../../lib/word';

const fill = '#fff';
const strongs = javascripture.data.strongsDictionary;

class WordBlock extends React.Component {
	getSearchParameters() {
		return {
			clusivity: 'exclusive',
			version: this.props.version,
			lemma: this.props.strongsNumber,
			range: 'verse',
		};
	}

	getKJVDefinitions() {
		const strongsNumber = this.props.strongsNumber,
			wordDetail = strongs[ strongsNumber ];

		return wordDetail.kjv_def.split( ',' ).map( ( word, index ) => {
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

	highlight( strongsNumber ) {
		window.updateAppComponent( 'highlightedWord', strongsNumber );
	}

	unHighlight() {
		window.updateAppComponent( 'highlightedWord', null );
	}

	getRoots() {
		if ( ! javascripture.data.strongsObjectWithFamilies[ this.props.strongsNumber ] ) {
			return;
		}

		const rootsData = javascripture.data.strongsObjectWithFamilies[ this.props.strongsNumber ].roots;
		if( rootsData ) {
			return rootsData.map( ( rootNumber, index ) => {
				return (
					<span key={ index }>
						<a className={ this.getClassName( rootNumber ) }
							onClick={ this.searchForWord.bind( this, rootNumber ) }
							onMouseOver={ this.highlight.bind( this, rootNumber ) }
							onMouseOut={ this.unHighlight }>
							{ rootNumber }
					</a> </span>
				);
			} );
		}

		return 'None';
	}

	getBranchesData() {
		return map( javascripture.data.strongsObjectWithFamilies, ( strongsObjectData, strongsObjectNumber ) => {
			if ( strongsObjectData.roots && strongsObjectData.roots.indexOf( this.props.strongsNumber ) > -1 ) {
				return (
					<span key={ strongsObjectNumber }>
						<a className={ this.getClassName( strongsObjectNumber ) }
							onClick={ this.searchForWord.bind( this, strongsObjectNumber ) }
							onMouseOver={ this.highlight.bind( this, strongsObjectNumber ) }
							onMouseOut={ this.unHighlight }>
							{ strongsObjectNumber }
					</a> </span>
				);
			}
		} );
	}

	getBranches() {
		const branchesData = this.getBranchesData();
		if ( branchesData ) {
			return branchesData;
		}

		return 'None';
	}

	getMorphology = ( strongsNumber ) => {
		return this.props.morphology.split( ' ' ).map( ( morph, index ) => {
			return ( index !== 0 ? ' - ' : '' ) + morphology( morph, 'noLinks', strongsNumber );
		} );
	};

	renderDetails() {
		const strongsNumber = this.props.strongsNumber,
			wordDetail = strongs[ strongsNumber ],
			wordFamily = getFamily( strongsNumber ),
			className = classnames( styles.wordBlock, this.props.open ? styles.visible : styles.hidden );

		return (
			<div className={ className }>
				{ strongsNumber } | { stripPointing( wordDetail.lemma ) }
				{ wordDetail.xlit ? ' | ' + wordDetail.xlit : null }
				{ wordDetail.translit ? ' | ' + wordDetail.translit : null }
				{ wordDetail.pronounciation ? ' | ' + wordDetail.pronounciation : null }
				<br />
				<div>
					<strong>Roots: </strong>{ this.getRoots() }
				</div>
				<div>
					<strong>Branches: </strong>{ this.getBranches() }
				</div>
				<div>
					<strong>Family: </strong>{ wordFamily }
				</div>
				<br />
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

	removeWord() {
		this.props.removeWord( this.props.strongsNumber, this.props.version );
	}

	termTitle( { clusivity, version, lemma, range } ) {
		return 'strongs number: ' + lemma + '\nversion: ' + version + '\nclusivity: ' + clusivity + '\nrange: ' + range;
	}

	render() {
		const strongsNumber = this.props.strongsNumber,
			wordDetail = strongs[ strongsNumber ],
			wordFamily = getFamily( strongsNumber );

		if ( strongsNumber === 'G3588' ) {
			return null;
		}

		if ( wordDetail ) {
			return (
				<div>
					<style>{ getHighlight( strongsNumber, this.props.subdue, null ) }</style>
					<h2
						className={ this.getClassName( strongsNumber ) + ' ' + styles.title }
						onClick={ () => this.toggleDetails( false ) }
						title={ this.termTitle( this.getSearchParameters() ) }
					>
						<span className={ styles.strongsNumberTitle }>{ strongsNumber }</span>
						{ stripPointing( wordDetail.lemma ) }
						<a className={ styles.remove } onClick={ () => this.removeWord( false ) }>
							<CancelSvg fill={ fill } />
						</a>
					</h2>
					{ this.renderDetails() }
					<SearchBlock { ...this.props } terms={ this.getSearchParameters() } />
				</div>
			);
		}

		return null;
	}
};

WordBlock.propTypes = {};

export default withStyles( styles )( WordBlock );
