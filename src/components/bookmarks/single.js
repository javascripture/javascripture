// External dependencies
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';

// Internal dependencies
import { toggleBookmark } from '../../actions';
import BookMarkHeader from './header';
import ReferenceText from '../reference-text';
import { createReferenceLink } from '../../lib/reference.js';
import Collapsible from '../collapsible';

const getCrossReferences = ( reference ) => {
	if ( ! reference ) {
		return [];
	}
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

const Single = ( { bookmark, index } ) => {
	const bookmarkRef = useRef();
	const dispatch = useDispatch();

	const handleToggle = () => {
		dispatch( toggleBookmark( bookmark ) );
	};

	const crossReferences = getCrossReferences( bookmark );
	const header = (
		<BookMarkHeader bookmark={ bookmark } key={ index } number={ index } textToCopy={ bookmarkRef } />
	);

	return (
		<Collapsible key={ index } header={ header } open={ bookmark.open } onToggle={ () => handleToggle() }>
			<div ref={ bookmarkRef }>
				{ crossReferences.length > 0 ? 'Cross references:' : 'No cross references' }
				{ crossReferences.map( ( reference, index2 ) => {
					const referenceSections = reference.split('-');
					const referenceArrays = referenceSections.map( ( referenceSection ) => getReferenceFromCrossReference( referenceSection ) );

					return (
						<div key={ index2 }>
							<a href={ '#' + createReferenceLink( referenceArrays[ 0 ] ) }>
								{ index + 1 }. <ReferenceText reference={ referenceArrays[ 0 ] } />
								{ referenceArrays[ 1 ] && ( <span> - <ReferenceText reference={ referenceArrays[ 1 ] } /></span> ) }
							</a>
						</div>
					);
				} ) }
			</div>
		</Collapsible>
	);
};

export default Single;
