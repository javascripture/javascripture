import findIndex from 'lodash/findIndex';

const wordDetails = ( state = [], action ) => {
	switch ( action.type ) {
		case 'ADD_WORD':
			const wordPosition = findIndex( state, word => word.strongsNumber === action.strongsNumber ),
				newState = state.map( word => {
					return {
						strongsNumber: word.strongsNumber,
						open: false,
						morphology: word.morphology
					};
				} )

			if ( wordPosition > -1 ) {
				newState[ wordPosition ] = {
					strongsNumber: action.strongsNumber,
					open: action.open,
					morphology: action.morphology
				};

				return newState;
			}

			return [
				...newState,
				{
					strongsNumber: action.strongsNumber,
					open: action.open,
					morphology: action.morphology
				}
			];

		case 'TOGGLE_WORD':
			const toggleWordPosition = findIndex( state, word => word.strongsNumber === action.strongsNumber );
			if ( toggleWordPosition > -1 ) { // This should always be the case
				const newState = [ ...state ];

				newState[ toggleWordPosition ] = {
					strongsNumber: state[ toggleWordPosition ].strongsNumber,
					open: ! state[ toggleWordPosition ].open,
					morphology: state[ toggleWordPosition ].morphology
				};

				return newState;
			}

			return state;

		case 'REMOVE_WORD':
			return state.filter( word => {
				return word.strongsNumber !== action.strongsNumber;
			} );

		case 'CLEAR_ALL':
			return [];

		default:
			return state;
	}
}

export default wordDetails;
