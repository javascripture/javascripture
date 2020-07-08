// External dependencies
import { connect } from 'react-redux';
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import { removeBookmark } from '../../actions';
import Bookmark from '../svg/bookmark.js';
import styles from './styles.scss';
import BookMark from './bookmark';
import ReferenceLink from '../reference-link';
import ReferenceText from '../reference-link';
import { createReferenceLink } from '../../lib/reference.js';


const BookMarks = React.memo( ( { bookmarks, removeBookmark } ) => {
	const getCrossReferences = ( reference ) => {
		const bookId = bible.getBookId( reference.book );
		const referenceString = bible.Data.books[ bookId - 1 ][ 1 ] + '.' + reference.chapter + '.' + reference.verse;
		return crossReferences[ referenceString ] ? crossReferences[ referenceString ] : [];
	};

	const getReferenceFromCrossReference = ( referenceString ) => {
		const referenceArray = referenceString.split('.'),
		bookId = bible.getBookId( referenceArray[0] ),
		referenceObject = {
			book: bible.Data.books[bookId - 1][0],
			chapter: referenceArray[1],
			verse: referenceArray[2]
		};
		return referenceObject;
	};

	return (
		<div className={ styles.bookmarks }>
			<div className={ styles.bookmarksList }>
				{ bookmarks.length === 0 && ( <p>Click the <Bookmark /> to bookmark a verse.</p> ) }
				{ bookmarks.map( ( bookmark, key ) => {
					return (
						<div key={ key }>
							<BookMark bookmark={ bookmark } key={ key } number={ key } />
							{ getCrossReferences( bookmark ).map( ( reference, index ) => {
								const referenceSections = reference.split('-');
								const referenceArrays = referenceSections.map( ( referenceSection ) => getReferenceFromCrossReference( referenceSection ) );

								return (
									<li key={ index }>
										<a href={ '#' + createReferenceLink( referenceArrays[ 0 ] ) }>
											{ index + 1 }. <ReferenceText reference={ referenceArrays[ 0 ] } />
											{ referenceArrays[ 1 ] && ( <span> - <ReferenceText reference={ referenceArrays[ 1 ] } /></span> ) }
										</a>
									</li>
								);
							} ) }
						</div>
					);
				} ) }
			</div>
		</div>
	)
} );

const mapStateToProps = ( state, ownProps ) => {
	return {
		bookmarks: state.bookmarks
	};
};

const BookMarksContainer = connect(
	mapStateToProps,
)( BookMarks )

export default withStyles( styles )( BookMarksContainer );
