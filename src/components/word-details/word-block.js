// External dependencies
import map from 'lodash/map';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import KJVDef from './kjv-def'
import styles from './styles.scss';
import CancelSvg from '../svg/cancel.js';

const fill = '#fff';

class WordBlock extends React.Component {
	constructor () {
		super();
		this.state = {
			visible: false
		}
	}

	getSearchParameters() {
		return {
			clusivity: 'exclusive',
			language: 'kjv',
			lemma: this.props.strongsNumber,
			range: 'verse'
		};
	}

	renderSearch() {
		const searchParameters = {
				clusivity: 'exclusive',
				language: 'kjv',
				lemma: this.props.strongsNumber,
				range: 'verse'
			};

		worker.postMessage( {
			task: 'search',
			parameters: this.getSearchParameters()
		} );

		return ( <div className="referenceList">Loading...</div> );
	}

	getKJVDefinitions() {
		const strongsNumber = this.props.strongsNumber,
			wordDetail = javascripture.data.strongsDictionary[ strongsNumber ];

		return wordDetail.kjv_def.split( ',' ).map( ( word, index ) => {
			const wordString = word.trim().replace( /\./g, '' );

			return (
				<span>
					{ index === 0 ? '' : ', ' }
					<KJVDef word={ wordString } strongsNumber={ strongsNumber } />
				</span>
			);
		} );
	}

	showDetails() {
		this.setState( { visible: ! this.state.visible } );
	}

	searchForWord( strongsNumber ) {
		const open = true,
			morphology = null;

		this.props.addWord( { strongsNumber, open, morphology } );
	}

	getClassName( rootNumber ) {
		return javascripture.api.word.getFamily( rootNumber ) + '-family ' + rootNumber;
	}

	getRoots() {
		if ( ! javascripture.data.strongsObjectWithFamilies[ this.props.strongsNumber ] ) {
			return;
		}

		const rootsData = javascripture.data.strongsObjectWithFamilies[ this.props.strongsNumber ].roots;
		let language;
		if( rootsData ) {
	        return rootsData.map( ( rootNumber, index ) => {
				// href="#search=' + rootNumber + '" class="' + javascripture.api.word.getFamily( rootNumber ) + '-family ' + rootNumber + ' word-tree" data-lemma="' + rootNumber + '" data-language="' + language + '">' + rootNumber +
				return (
					<span><span className={ this.getClassName( rootNumber ) + ' ' + styles.fakeLink } onClick={ this.searchForWord.bind( this, rootNumber ) } key={ index }>
						{ rootNumber }
					</span> </span>
				);
			} );
		}

		return 'None';
	}

	getBranchesData() {
		return map( javascripture.data.strongsObjectWithFamilies, ( strongsObjectData, strongsObjectNumber ) => {
			if ( strongsObjectData.roots && strongsObjectData.roots.indexOf( this.props.strongsNumber ) > -1 ) {
				return (
					//" data-lemma="' + strongsObjectKey + '"  data-language="' + language + '">' + strongsObjectKey + '</a> ';
					<span key={ strongsObjectNumber }>
						<span onClick={ this.searchForWord.bind( this, strongsObjectNumber ) } className={ this.getClassName( strongsObjectNumber ) + ' ' + styles.fakeLink }>
							{ strongsObjectNumber }
					</span> </span>
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

	renderDetails() {
		const strongsNumber = this.props.strongsNumber,
			wordDetail = javascripture.data.strongsDictionary[ strongsNumber ],
			wordFamily = javascripture.api.word.getFamily( strongsNumber );

		return (
			<div className={ this.state.visible ? styles.visible : styles.hidden }>
				{ strongsNumber } | { javascripture.modules.hebrew.stripPointing( wordDetail.lemma ) }
				{ wordDetail.xlit ? ' | ' + wordDetail.xlit : null }
				{ wordDetail.pronounciation ? ' | ' + wordDetail.pronounciation : null }
				<br />
				<div class="word-tree">
					<strong>Roots: </strong>{ this.getRoots() }
				</div>
				<div class="word-tree">
					<strong>Branches: </strong>{ this.getBranches() }
				</div>
				<div class="word-tree">
					<strong>Family: </strong>{ wordFamily }
				</div>
				<br />
				<br />
				<div class="definitions">
					<strong>KJV Usage:</strong> { this.getKJVDefinitions( strongsNumber ) }<br />
					<br />
					<strong>Derivation:</strong> { wordDetail.derivation }<br />
					<br />
					<strong>Morphology:</strong> { this.props.morphology }<br />
				</div>
				<h3>Search results</h3>
				{ this.renderSearch() }
			</div>
		);
	}

	removeWord() {
		this.props.removeWord( this.props.strongsNumber );
	}

	render() {
		const strongsNumber = this.props.strongsNumber,
			wordDetail = javascripture.data.strongsDictionary[ strongsNumber ],
			wordFamily = javascripture.api.word.getFamily( strongsNumber );

		if ( strongsNumber === 'G3588' ) {
			return;
		}

		if ( wordDetail ) {
			return (
				<div id={ createTrackingBoxId( this.getSearchParameters() ) }>
					<style>{ javascripture.modules.colors.getStrongsStyle( strongsNumber ) }</style>
					<h2 className={ this.getClassName( strongsNumber ) + ' ' + styles.title } onClick={ () => this.showDetails( false ) }>
						{ strongsNumber } { javascripture.modules.hebrew.stripPointing( wordDetail.lemma ) }
						<a className={ styles.remove } onClick={ () => this.removeWord( false ) }>
							<CancelSvg fill={ fill } />
						</a>
					</h2>
					{ this.renderDetails() }
				</div>
			);
		}

		return null;
	}
};

/*
Still to do:
1. show the morphology data - javascripture.api.morphology.get( morphology, 'noLinks', strongsNumber )
2. search when you click a work in the KJV definitions
3. search on open
4. dedupe words added to the list
5. auto open words when added
*/

WordBlock.propTypes = {};

export default withStyles( styles )( WordBlock );
