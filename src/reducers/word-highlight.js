import difference from 'lodash/difference';

const wordHighlight = ( state = [], action ) => {
	switch ( action.type ) {
		case 'SET_WORD_HIGHLIGHT':
    		return [ ...state.concat( action.word ) ];
		case 'REMOVE_WORD_HIGHLIGHT':
			return difference( state, action.word );
		default:
			return state
	}
}

export default wordHighlight;
