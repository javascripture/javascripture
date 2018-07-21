import clone from 'lodash/clone';
import findIndex from 'lodash/findIndex';
import isEqual from 'lodash/isEqual';
import isMatch from 'lodash/isMatch';

const searchTerms = ( state = [], action ) => {
	let newState,
		getCurrentVersePosition,
		reference;

	switch ( action.type ) {
		case 'ADD_SEARCH':
			const termPosition = findIndex( state, searchTerm => isEqual( searchTerm.terms, action.terms ) );
			newState = state.map( searchTerm => {
				return {
					open: false,
					results: searchTerm.results,
					terms: searchTerm.terms,
				};
			} );

			if ( termPosition > -1 ) {
				newState[ termPosition ] = {
					open: true,
					results: searchTerm.results,
					terms: action.terms,
				};
			}

			return [
				...newState,
				{
					open: true,
					results: 'Searching…',
					terms: action.terms,
				}
			];

		case 'TOGGLE_SEARCH':
			const toggleWordPosition = findIndex( state, word => isEqual( word.terms, action.terms ) );
			if ( toggleWordPosition > -1 ) { // This should always be the case
				newState = [ ...state ];

				newState[ toggleWordPosition ] = {
					open: ! state[ toggleWordPosition ].open,
					results: state[ toggleWordPosition ].results,
					terms: state[ toggleWordPosition ].terms,
				};

				return newState;
			}

			return state;

		case 'REMOVE_SEARCH':
			return state.filter( word => {
				return word.terms !== action.terms;
			} );

		case 'CLEAR_ALL':
			return [];

		default:
			return state;
	}
}

export default searchTerms;
