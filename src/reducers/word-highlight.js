const wordHighlight = ( state = [], action ) => {
	switch ( action.type ) {
		case 'SET_WORD_HIGHLIGHT':
    		return [ ...state, action.word ];
		case 'REMOVE_WORD_HIGHLIGHT':
			return [ ...state.filter( word => word !== action.word ) ];
		default:
			return state
	}
}

export default wordHighlight;
