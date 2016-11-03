const wordDetails = ( state = [], action ) => {
	console.log( action );
	switch ( action.type ) {
		case 'ADD_WORD':
			return [
				...state,
				action.word
			];

		case 'REMOVE_WORD':
			return state.filter( word => {
				return word !== action.word;
			} );

		default:
			return state;
	}
}

export default wordDetails;
