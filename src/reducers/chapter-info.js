import difference from 'lodash/difference';

const chapterInfo = ( state = null, action ) => {
	switch ( action.type ) {
		case 'SET_CHAPTER_INFO':
			return action.reference;
		default:
			return state
	}
}

export default chapterInfo;
