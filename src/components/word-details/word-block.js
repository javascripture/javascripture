// External dependencies
import classnames from 'classnames';
import map from 'lodash/map';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import CancelSvg from '../svg/cancel.js';
import KJVDef from './kjv-def';
import morphology from './morphology';
import SearchBlock from '../../containers/search-block';
import { getStyle } from '../strongs-color.js';
import stripPointing from '../../lib/strip-pointing.js';
import styles from './styles.scss';

const fill = '#fff';

class WordBlock extends React.Component {
	getSearchParameters() {
		return {
			clusivity: 'exclusive',
			language: 'kjv',
			lemma: this.props.strongsNumber,
			range: 'verse'
		};
	}

	getKJVDefinitions() {
		const strongsNumber = this.props.strongsNumber,
			wordDetail = javascripture.data.strongsDictionary[ strongsNumber ];

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
		if( rootsData ) {
	        return rootsData.map( ( rootNumber, index ) => {
				return (
					<span key={ index }><span className={ this.getClassName( rootNumber ) + ' ' + styles.fakeLink } onClick={ this.searchForWord.bind( this, rootNumber ) }>
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
			wordFamily = javascripture.api.word.getFamily( strongsNumber ),
			className = classnames( styles.wordBlock, this.props.open ? styles.visible : styles.hidden );

		return (
			<div className={ className }>
				{ strongsNumber } | { stripPointing( wordDetail.lemma ) }
				{ wordDetail.xlit ? ' | ' + wordDetail.xlit : null }
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
					<strong>Morphology</strong><br />{ this.props.morphology } - { this.props.morphology && morphology( this.props.morphology, 'noLinks', strongsNumber ) }<br />
					<br />
					<strong>KJV translations</strong><br />{ this.getKJVDefinitions( strongsNumber ) }<br />
					<br />
					<strong>Strongs' Derivation</strong><br />{ wordDetail.derivation }<br />
				</div>
				<br />
				<strong>Found in</strong>
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
			return null;
		}

		if ( wordDetail ) {
			return (
				<div>
					<style>{ getStyle( strongsNumber ) }</style>
					<h2 className={ this.getClassName( strongsNumber ) + ' ' + styles.title } onClick={ () => this.toggleDetails( false ) }>
						<span className={ styles.strongsNumberTitle }>{ strongsNumber }</span>
						{ javascripture.modules.hebrew.stripPointing( wordDetail.lemma ) }
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
