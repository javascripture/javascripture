/*import find from 'lodash/find';
import merge from 'lodash/merge';
import { LOCATION_CHANGE } from 'react-router-redux';

const initialState = {
	book: null,
	chapter: null,
	references: []
};

const references = ( state = initialState, action ) => {
	switch ( action.type ) {
		case LOCATION_CHANGE:
			const reference = action.payload.pathname.split( '/' );
			if ( ! reference[ 1 ] ) {
				return state;
			}

			const book = reference[ 1 ],
				chapter = parseInt( reference[ 2 ] ),
				currentReference = bible.parseReference( book + ' ' + chapter );

			var references = [];

			references.push( bible.getPrevChapter( currentReference.bookID, currentReference.chapter ) );
			references.push( currentReference );
			references.push( bible.getNextChapter( currentReference.bookID, currentReference.chapter ) );

			return { book, chapter, references };
		case 'ADD_PREVIOUS_CHAPTER':
			var references = state.references.slice();

			const prevChapter = bible.getPrevChapter( action.reference.bookID, action.reference.chapter ),
				prevChapterAlreadyLoaded = find( state.references, function ( reference ) {
					return reference.bookID === prevChapter.bookID && reference.chapter === prevChapter.chapter;
				} );
			if ( ! prevChapterAlreadyLoaded ) {
				references.unshift( prevChapter );
			}

			const prevPrevChapter = bible.getPrevChapter( prevChapter.bookID, prevChapter.chapter ),
				prevPrevChapterAlreadyLoaded = find( state.references, function ( reference ) {
					return reference.bookID === prevPrevChapter.bookID && reference.chapter === prevPrevChapter.chapter;
				} );
			if ( ! prevPrevChapterAlreadyLoaded ) {
				references.unshift( prevPrevChapter );
			}

 			return {
				book: state.book,
				chapter: state.chapter,
				references
			};


		case 'ADD_NEXT_CHAPTER':
			var references = state.references.slice();

			const nextChapter = bible.getNextChapter( action.reference.bookID, action.reference.chapter ),
				nextChapterAlreadyLoaded = find( state.references, function ( reference ) {
					return reference.bookID === nextChapter.bookID && reference.chapter === nextChapter.chapter;
				} );
			if ( ! nextChapterAlreadyLoaded ) {
				references.push( nextChapter );
			}

			const nextNextChapter = bible.getNextChapter( nextChapter.bookID, nextChapter.chapter ),
				nextNextChapterAlreadyLoaded = find( state.references, function ( reference ) {
					return reference.bookID === nextNextChapter.bookID && reference.chapter === nextNextChapter.chapter;
				} );
			if ( ! nextNextChapterAlreadyLoaded ) {
				references.push( nextNextChapter );
			}

 			return {
				book: state.book,
				chapter: state.chapter,
				references
			};

		default:
			return state;
	}
}

export default references;
*/