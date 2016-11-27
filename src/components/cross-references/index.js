// External dependencies
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';

const CrossReferences = React.createClass( {
	getCrossReferences() {
    	const bookId = bible.getBookId( this.props.reference.book ),
			referenceString = bible.Data.books[ bookId - 1 ][ 1 ] + '.' + this.props.reference.chapter + '.' + this.props.reference.verse;
console.log( referenceString );
		return crossReferences[ referenceString ];
	},

	crossReferences() {
		if ( ! this.props.reference ) {
			return;
		}


		if ( this.getCrossReferences() ) {
			return (
				<div>
					<p>Cross references for&nbsp;
						<a href={ '#' + javascripture.modules.reference.createReferenceLink( this.props.reference ) }>
							{ this.props.reference.book + ' ' + this.props.reference.chapter + ':' + this.props.reference.verse }
						</a>:
					</p>
					{ this.showReferences() }
				</div>
			);
		}

		return (
			<p>No cross references for&nbsp;
				<a href={ '#' + javascripture.modules.reference.createReferenceLink( this.props.reference ) }>
					{ this.props.reference.book + ' ' + this.props.reference.chapter + ':' + this.props.reference.verse }
				</a>
			</p>
		);
	},

	showReferences() {
		return (
			<ul className={ styles.crossReferencesList }>
				{ this.getCrossReferences().map( reference => {
					const referenceArray = reference.split('.'),
		    			bookId = bible.getBookId( referenceArray[0] ),
		    			referenceObject = {
			    			book: bible.Data.books[bookId - 1][0],
			    			chapter: referenceArray[1],
			    			verse: referenceArray[2]
		    			};

					return (
						<li key={ reference }>
							<a href={ '#' + javascripture.modules.reference.createReferenceLink( referenceObject ) }>
								{ reference }
							</a>
						</li>
					);
				} ) }
			</ul>
		);
	},

	render() {
		return (
			<div className={ styles.crossReferences }>
				<h2 className={ styles.title }>Cross references</h2>

				{ this.crossReferences() }
			</div>
		);
	}
} );

CrossReferences.propTypes = {};

export default withStyles( styles )( CrossReferences );
