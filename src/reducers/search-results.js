import findIndex from 'lodash/findIndex';
import isEqual from 'lodash/isEqual';
import isMatch from 'lodash/isMatch';

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

		case 'SET_CURRENT_VERSE':
			const setCurrentVerseWordPosition = findIndex( state, word => isEqual( word.terms, action.terms ) );

			newState = state.map( searchTerm => {
				return {
					results: searchTerm.results,
					terms: searchTerm.terms,
				};
			} );

			if ( setCurrentVerseWordPosition > -1 ) { // This wont' always be the case because of the word details
				newState[ setCurrentVerseWordPosition ].activeReference = action.index;
				return newState;
			}

			return newState;

		case 'GO_TO_NEXT_CURRENT_VERSE':
			getCurrentVersePosition = findIndex( state, word => word.hasOwnProperty( 'activeReference' ) );
			newState = [ ...state ];

			if ( getCurrentVersePosition > -1 && newState[ getCurrentVersePosition ].activeReference < newState[ getCurrentVersePosition ].results.length - 1 ) {
				newState[ getCurrentVersePosition ].activeReference = newState[ getCurrentVersePosition ].activeReference + 1;
			}

			return newState;

		case 'GO_TO_PREVIOUS_CURRENT_VERSE':
			getCurrentVersePosition = findIndex( state, word => word.hasOwnProperty( 'activeReference' ) );
			newState = [ ...state ];

			if ( getCurrentVersePosition > -1 && newState[ getCurrentVersePosition ].activeReference > 0 ) {
				newState[ getCurrentVersePosition ].activeReference = newState[ getCurrentVersePosition ].activeReference - 1;
			}

			return newState;

		default:
			return state;
	}
}

export default searchResults;
