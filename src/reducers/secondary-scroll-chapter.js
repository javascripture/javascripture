import { LOCATION_CHANGE } from 'connected-react-router';

const secondaryScrollChapter = ( state = {}, action ) => {
	switch ( action.type ) {
		case 'SET_SECONDARY_SCROLL_CHAPTER':
			const book = action.book,
				chapter = action.chapter;
    		return { book, chapter };
		default:
			return state;
	}
}

export default secondaryScrollChapter;
