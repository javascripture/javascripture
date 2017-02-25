import findIndex from 'lodash/findIndex';
import isEqual from 'lodash/isEqual';

const searchResults = ( state = [], action ) => {
	let newState,
		getCurrentVersePosition,
		reference;

	switch ( action.type ) {
		case 'ADD_SEARCH_RESULTS':
			const searchResultsPosition = findIndex( state, searchTerm => {
					return isEqual( searchTerm.terms, action.terms );
				} );
			newState = [ ...state ];

			if ( searchResultsPosition > -1 ) {
				newState[ searchResultsPosition ] = {
					results: action.results.length > 0 ? action.results : 'No results',
					terms: newState[ searchResultsPosition ].terms,
				};
				return newState;
			}

			return [
				...newState,
				{
					results: action.results.length > 0 ? action.results : 'No results',
					terms: action.terms,
				}
			];

		case 'REMOVE_SEARCH':
			return state.filter( searchTerm => {
				return ! isEqual( searchTerm.terms, action.terms );
			} );

		case 'CLEAR_ALL':
			return [];

		default:
			return state;
	}
}

export default searchResults;
