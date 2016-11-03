// External dependencies
import map from 'lodash/map';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import KJVDef from './kjv-def'
import styles from './styles.scss';

const WordDetails = React.createClass( {
	getKJVDefinitions( strongsNumber ) {
		const wordDetail = javascripture.data.strongsDictionary[ strongsNumber ];
		return wordDetail.kjv_def.split( ',' ).map( ( word, index ) => {
			const wordString = word.trim().replace( /\./g, '' );

			return (
				<span>
					{ index === 0 ? '' : ', ' }
					<KJVDef word={ wordString } strongsNumber={ strongsNumber } />
				</span>
			);
		} );
	},

	searchForRoot() {
		console.log( 'searchForRoot' );
	},

	getClassName( rootNumber ) {
		return javascripture.api.word.getFamily( rootNumber ) + '-family ' + rootNumber;
	},

	getRoots( strongsNumber ) {
		if ( ! javascripture.data.strongsObjectWithFamilies[ strongsNumber ] ) {
			return;
		}

		const rootsData = javascripture.data.strongsObjectWithFamilies[ strongsNumber ].roots;
		let language;
		if( rootsData ) {
	        return rootsData.map( ( rootNumber, index ) => {
				if ( rootNumber.substring( 0, 1 ) === "H" ) {
					language = 'hebrew';
				}

				if ( rootNumber.substring( 0, 1 ) === "G" ) {
					language = 'greek';
				}

				// href="#search=' + rootNumber + '" class="' + javascripture.api.word.getFamily( rootNumber ) + '-family ' + rootNumber + ' word-tree" data-lemma="' + rootNumber + '" data-language="' + language + '">' + rootNumber +
				return (
					<span className={ this.getClassName( rootNumber ) } onClick={ this.searchForRoot } key={ index }>
						{ rootNumber }
					</span>
				);
			} );
		}

		return 'None';
	},

	getBranchesData( strongsNumber ) {
		return map( javascripture.data.strongsObjectWithFamilies, ( strongsObjectData, strongsObjectNumber ) => {
			if ( strongsObjectData.roots && strongsObjectData.roots.indexOf( strongsNumber ) > -1 ) {
				return (
					//" data-lemma="' + strongsObjectKey + '"  data-language="' + language + '">' + strongsObjectKey + '</a> ';
					<span key={ strongsObjectNumber }><span onClick={ this.searchForRoot } className={ this.getClassName( strongsObjectNumber ) }>
						{ strongsObjectNumber }
					</span> </span>
				);
			}
		} );
	},

	getBranches( strongsNumber ) {
		const branchesData = this.getBranchesData( strongsNumber );
		if ( branchesData ) {
			return branchesData;
		}

		return 'None';
	},

	wordBlock( strongsNumber ) {
		const wordDetail = javascripture.data.strongsDictionary[ strongsNumber ],
			wordFamily = javascripture.api.word.getFamily( strongsNumber );

		if ( strongsNumber === 'G3588' ) {
			return;
		}

		if ( wordDetail ) {
			return (
				<div>
					<div class="word-details">
						{ strongsNumber } | { javascripture.modules.hebrew.stripPointing( wordDetail.lemma ) }
						{ wordDetail.xlit ? ' | ' + wordDetail.xlit : null }
						{ wordDetail.pronounciation ? ' | ' + wordDetail.pronounciation : null }
						<br />
						<div class="word-tree">
							<strong>Roots: </strong>{ this.getRoots( strongsNumber ) }
						</div>
						<div class="word-tree">
							<strong>Branches: </strong>{ this.getBranches( strongsNumber ) }
						</div>
						<div class="word-tree">
							<strong>Family: </strong>{ wordFamily }
						</div>
					</div>
					<br />
					<div class="definitions">
						<strong>KJV Usage:</strong> { this.getKJVDefinitions( strongsNumber ) }<br />
						<br />
						<strong>Derivation:</strong> { wordDetail.derivation }<br />
						<br />
						<strong>Morphology:</strong> { wordDetail.morphology }<br />
					</div>
					<h3>Search results</h3>
				</div>
			);
		}
	},


/*
Still to do:
1. show the morphology data - javascripture.api.morphology.get( morphology, 'noLinks', strongsNumber )
2. search when you click a work in the KJV definitions
3. Highlight word when it's clicked
4. Add a title
*/


	render() {
		return (
			<div>
				{ this.props.words.map( word => this.wordBlock( word ) ) }
			</div>
		);
	}
} );

WordDetails.propTypes = {};

export default withStyles( styles )( WordDetails );
