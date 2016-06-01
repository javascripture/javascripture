import { LOCATION_CHANGE } from 'react-router-redux';
const initialState = {};
const scrollChapter = ( state = initialState, action ) => {
	switch ( action.type ) {
		case LOCATION_CHANGE:
			return initialState;

		case 'SET_SCROLL_CHAPTER':
			const book = action.book,
				chapter = action.chapter;
    		return { book, chapter };
		default:
			return state;
	}
}

export default scrollChapter;
