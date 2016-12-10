import clone from 'lodash/clone';
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

		case 'ADD_WORD_RESULTS':
			const wordResultsPosition = findIndex( state, word => word.strongsNumber === action.terms.lemma ),
				clonedState = clone( state );

			if ( wordResultsPosition === -1 ) {
				console.log( 'error - word not found' );
				return clonedState;
			}

			clonedState[ wordResultsPosition ] = {
				morphology: state[ wordResultsPosition ].morphology,
				open: clonedState[ wordResultsPosition ].open,
				results: action.results.length > 0 ? action.results : 'No results',
				strongsNumber: state[ wordResultsPosition ].strongsNumber,
			};

			return clonedState;

		default:
			return state;
	}
}

export default wordDetails;
