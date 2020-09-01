// External dependencies
import React from 'react';
import { useSelector } from 'react-redux';

// Internal dependencies
import Bookmark from '../svg/bookmark.js';
import Single from './single';

const BookMarks = React.memo( () => {
	const bookmarks = useSelector( state => state.bookmarks );

	return (
		<div>
			{ bookmarks.length === 0 && ( <p>Click the <Bookmark /> to bookmark a verse.</p> ) }
			{ bookmarks.map( ( bookmark, key ) => <Single bookmark={ bookmark } key={ key } index={ key } /> ) }
		</div>
	)
} );

export default BookMarks;
