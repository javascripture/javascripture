import clone from 'lodash/clone';
import findIndex from 'lodash/findIndex';

const wordDetails = ( state = [], action ) => {
	let newState,
		getCurrentVersePosition,
		reference;

	switch ( action.type ) {
		case 'ADD_WORD':
			const wordPosition = findIndex( state, word => word.strongsNumber === action.strongsNumber );
			newState = state.map( word => {
				return {
					strongsNumber: word.strongsNumber,
					open: false,
					morphology: word.morphology,
					version: action.version,
				};
			} );

			if ( wordPosition > -1 ) {
				newState[ wordPosition ] = {
					strongsNumber: action.strongsNumber,
					open: action.open,
					morphology: action.morphology,
					version: action.version,
				};

				return newState;
			}

			return [
				...newState,
				{
					strongsNumber: action.strongsNumber,
					open: action.open,
					morphology: action.morphology,
					version: action.version,
				}
			];

		case 'TOGGLE_WORD':
			const toggleWordPosition = findIndex( state, word => word.strongsNumber === action.strongsNumber );
			if ( toggleWordPosition > -1 ) { // This should always be the case
				newState = [ ...state ];

				newState[ toggleWordPosition ] = {
					strongsNumber: state[ toggleWordPosition ].strongsNumber,
					open: ! state[ toggleWordPosition ].open,
					morphology: state[ toggleWordPosition ].morphology,
					version: state[ toggleWordPosition ].version,
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
