// External dependencies
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { useSelector } from 'react-redux';

// Internal dependencies
import Bookmark from '../svg/bookmark.js';
import styles from './styles.scss';
import BookMark from './bookmark';
import ReferenceText from '../reference-text';
import { createReferenceLink } from '../../lib/reference.js';
import Collapsible from '../collapsible';

const BookMarks = React.memo( () => {
	const bookmarks = useSelector( state => state.bookmarks );
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
						<Collapsible key={ key } header={ <BookMark bookmark={ bookmark } key={ key } number={ key } /> }>
							Cross references:
							{ getCrossReferences( bookmark ).map( ( reference, index ) => {
								const referenceSections = reference.split('-');
								const referenceArrays = referenceSections.map( ( referenceSection ) => getReferenceFromCrossReference( referenceSection ) );

								return (
									<div key={ index }>
										<a href={ '#' + createReferenceLink( referenceArrays[ 0 ] ) }>
											{ index + 1 }. <ReferenceText reference={ referenceArrays[ 0 ] } />
											{ referenceArrays[ 1 ] && ( <span> - <ReferenceText reference={ referenceArrays[ 1 ] } /></span> ) }
										</a>
									</div>
								);
							} ) }
						</Collapsible>
					);
				} ) }
			</div>
		</div>
	)
} );

export default withStyles( styles )( BookMarks );
