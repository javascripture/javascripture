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
					subdue: word.subdue,
					open: false,
					morphology: word.morphology,
					version: word.version,
					clickedWord: word.clickedWord,
				};
			} );

			if ( wordPosition > -1 ) {
				newState[ wordPosition ] = {
					strongsNumber: action.strongsNumber,
					subdue: action.subdue,
					open: action.open,
					morphology: action.morphology,
					version: action.version,
					clickedWord: action.clickedWord,
				};

				return newState;
			}

			return [
				...newState,
				{
					strongsNumber: action.strongsNumber,
					subdue: action.subdue,
					open: action.open,
					morphology: action.morphology,
					version: action.version,
					clickedWord: action.clickedWord,
				}
			];

		case 'TOGGLE_WORD':
			const toggleWordPosition = findIndex( state, word => word.strongsNumber === action.strongsNumber );
			if ( toggleWordPosition > -1 ) { // This should always be the case
				newState = [ ...state ];

				newState[ toggleWordPosition ] = {
					strongsNumber: state[ toggleWordPosition ].strongsNumber,
					subdue: state[ toggleWordPosition ].subdue,
					open: ! state[ toggleWordPosition ].open,
					morphology: state[ toggleWordPosition ].morphology,
					version: state[ toggleWordPosition ].version,
					clickedWord: state[ toggleWordPosition ].clickedWord,
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
