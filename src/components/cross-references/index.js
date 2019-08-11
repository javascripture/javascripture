// External dependencies
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';
import { createReferenceLink, getReferenceText, getAllLemmasFromReference } from '../../lib/reference.js';
import ReferenceText from '../reference-text';
import ReferenceLink from '../reference-link';
import SearchBlock from '../../containers/search-block';

class CrossReferences extends React.Component{
	componentDidUpdate( prevProps, prevState, snapshot ) {
		if ( prevProps.reference && prevProps.reference !== this.props.reference ) {
			this.props.removeSearch( this.getSearchParameters( prevProps.reference ) );
		}
	}

	getCrossReferences() {
		const bookId = bible.getBookId( this.props.reference.book ),
			referenceString = bible.Data.books[ bookId - 1 ][ 1 ] + '.' + this.props.reference.chapter + '.' + this.props.reference.verse;
		return crossReferences[ referenceString ];
	}

	crossReferences() {
		if ( this.getCrossReferences() ) {
			return (
				<div>
					<p>Cross references for&nbsp;
						<a href={ '#' + createReferenceLink( this.props.reference ) }>
							<ReferenceText reference={ this.props.reference } />
						</a>:
					</p>
					{ this.showReferences() }
				</div>
			);
		}

		return (
			<p>No cross references for&nbsp;
				<a href={ '#' + createReferenceLink( this.props.reference ) }>
					<ReferenceText reference={ this.props.reference } />
				</a>
			</p>
		);
	}

	showReferences() {
		return (
			<ul className={ styles.crossReferencesList }>
				{ this.getCrossReferences().map( ( reference, index ) => {
					const referenceSections = reference.split('-');
					const referenceArrays = referenceSections.map( referenceSection => {
						const referenceArray = referenceSection.split('.'),
						bookId = bible.getBookId( referenceArray[0] ),
						referenceObject = {
							book: bible.Data.books[bookId - 1][0],
							chapter: referenceArray[1],
							verse: referenceArray[2]
						};
						return referenceObject;
					} );

					return (
						<li key={ reference }>
							<a href={ '#' + createReferenceLink( referenceArrays[ 0 ] ) }>
								{ index + 1 }. <ReferenceText reference={ referenceArrays[ 0 ] } />
								{ referenceArrays[ 1 ] && ( <span> - <ReferenceText reference={ referenceArrays[ 1 ] } /></span> ) }
							</a>
						</li>
					);
				} ) }
			</ul>
		);
	}

	helpText() {
		return (
			<p>Click a verse number to show cross references here.</p>
		);
	}

	getSearchParameters( reference ) {
		return {
			clusivity: 'inclusive',
			version: 'original',
			lemma: getAllLemmasFromReference( reference, this.props.data.original ),
			range: 'verse',
		};
	}

	findSimilarReferences = () => {
		this.props.findSimilarReferences( this.props.reference );
	};

	renderFindSimilarReferences() {
		return <a href="#" onClick={ this.findSimilarReferences }>Find similar verses</a>;
	}

	renderSimilarVerses() {
		return (
			<div>
				<h2 className={ styles.title }>Similar verses (word matches)</h2>
				<SearchBlock open={ true } sorted={ true } terms={ this.getSearchParameters( this.props.reference ) } />
			</div>
		);
	}

	render() {
		return (
			<div className={ styles.crossReferences }>
				<h2 className={ styles.title }>Cross references</h2>
				{ ! this.props.reference && this.helpText() }
				{ this.props.reference && this.crossReferences() }
				{ this.props.reference && ! this.props.showSimilarVerses && this.renderFindSimilarReferences() }
				{ this.props.reference && this.props.showSimilarVerses && this.renderSimilarVerses() }
			</div>
		);
	}
}

CrossReferences.propTypes = {};

export default withStyles( styles )( CrossReferences );
