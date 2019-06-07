// External dependencies
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';
import { createReferenceLink } from '../../lib/reference.js';

class CrossReferences extends React.Component{
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
							{ this.referenceText( this.props.reference ) }
						</a>:
					</p>
					{ this.showReferences() }
				</div>
			);
		}

		return (
			<p>No cross references for&nbsp;
				<a href={ '#' + createReferenceLink( this.props.reference ) }>
					{ this.referenceText( this.props.reference ) }
				</a>
			</p>
		);
	}

	referenceText( referenceObject ) {
		return referenceObject.book + ' ' + referenceObject.chapter + ':' + referenceObject.verse;
	}

	showReferences() {
		return (
			<ul className={ styles.crossReferencesList }>
				{ this.getCrossReferences().map( reference => {
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
								{ this.referenceText( referenceArrays[ 0 ] ) }
								{ referenceArrays[ 1 ] && ' - ' + this.referenceText( referenceArrays[ 1 ] ) }
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

	render() {
		return (
			<div className={ styles.crossReferences }>
				<h2 className={ styles.title }>Cross references</h2>
				{ ! this.props.reference && this.helpText() }
				{ this.props.reference && this.crossReferences() }
			</div>
		);
	}
}

CrossReferences.propTypes = {};

export default withStyles( styles )( CrossReferences );
