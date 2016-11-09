import findIndex from 'lodash/findIndex';

const wordDetails = ( state = [], action ) => {
	console.log( action );
	switch ( action.type ) {
		case 'ADD_WORD':
			const wordPosition = findIndex( state, word => word.strongsNumber === action.strongsNumber );
			if ( wordPosition > -1 ) {
				const newState = [ ...state ];

				newState[ wordPosition ] = {
					strongsNumber: action.strongsNumber,
					open: action.open,
					morphology: action.morphology
				};

				return newState;
			}

			return [
				...state,
				{
					strongsNumber: action.strongsNumber,
					open: action.open,
					morphology: action.morphology
				}
			];

		case 'REMOVE_WORD':
			return state.filter( word => {
				return word.strongsNumber !== action.strongsNumber;
			} );

		default:
			return state;
	}
}

export default wordDetails;
