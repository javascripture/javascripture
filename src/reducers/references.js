import find from 'lodash/find';
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
			const reference = action.payload.hash.split( '/' );

			if ( ! reference[ 1 ] ) {
				return state;
			}

			const book = reference[ 1 ].replace( /\%20/gi, ' ' ),
				chapter = parseInt( reference[ 2 ] ),
				references = [],
				loadingPrev = false;

			references.push( Object.assign( {}, bible.parseReference( book + ' ' + chapter ).prevChapter() ) );
			references.push( Object.assign( {}, bible.parseReference( book + ' ' + chapter ) ) );
			references.push( Object.assign( {}, bible.parseReference( book + ' ' + chapter ).nextChapter() ) );

			return { book, chapter, references, loadingPrev };

		case 'ADD_PREVIOUS_CHAPTER':
			var references = state.references.slice(),
				firstReference = references[ 0 ],
				currentReference = bible.parseReference( firstReference.bookName + ' ' + firstReference.chapter1 );

			const prevChapter = currentReference.prevChapter(),
				prevChapterAlreadyLoaded = find( state.references, function ( reference ) {
					return reference.bookID === prevChapter.bookID && reference.chapter1 === prevChapter.chapter1;
				} );

			if ( ! prevChapterAlreadyLoaded ) {
				references.unshift( prevChapter );
			}

 			return {
				book: state.book,
				chapter: state.chapter,
				references,
				loadingPrev: true,
			};


		case 'ADD_NEXT_CHAPTER':
			var references = state.references.slice(),
				lastReference = references[ references.length - 1 ],
				currentReference = bible.parseReference( lastReference.bookName + ' ' + lastReference.chapter1 );

			const nextChapter = currentReference.nextChapter(),
				nextChapterAlreadyLoaded = find( state.references, function ( reference ) {
					return reference.bookID === nextChapter.bookID && reference.chapter1 === nextChapter.chapter1;
				} );
			if ( ! nextChapterAlreadyLoaded ) {
				references.push( nextChapter );
			}

 			return {
				book: state.book,
				chapter: state.chapter,
				references,
				loadingPrev: false,
			};

		default:
			return state;
	}
}

export default references;
