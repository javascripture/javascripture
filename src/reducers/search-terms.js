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
					open: action.open,
					results: searchTerm.results,
					terms: action.terms,
				};

				return newState;
			}

			return [
				...newState,
				{
					open: action.open,
					results: 'Searching…',
					terms: action.terms,
				}
			];

		case 'ADD_SEARCH_RESULTS':
			const searchResultsPosition = findIndex( state, searchTerm => {
					return isEqual( searchTerm.terms, action.terms );
				} ),
				clonedState = clone( state );

			if ( searchResultsPosition === -1 ) {
				console.log( 'error - word not found' );
				return clonedState;
			}

			clonedState[ searchResultsPosition ] = {
				open: clonedState[ searchResultsPosition ].open,
				results: action.results.length > 0 ? action.results : 'No results',
				terms: clonedState[ searchResultsPosition ].terms,
			};

			return clonedState;

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

		case 'CLEAR_ALL_SEARCH':
			return [];

		case 'SET_CURRENT_VERSE':
			const setCurrentVerseWordPosition = findIndex( state, word => isEqual( word.terms, action.terms ) );

			newState = state.map( searchTerm => {
				return {
					open: searchTerm.open,
					results: searchTerm.results,
					terms: searchTerm.terms,
				};
			} );

			if ( setCurrentVerseWordPosition > -1 ) { // This should always be the case
				const setCurrentVerseReferencePosition = findIndex( newState[ setCurrentVerseWordPosition ].results, reference => {
					return reference.book === action.reference.book && reference.chapter === action.reference.chapter && reference.verse === action.reference.verse
				} );

				newState[ setCurrentVerseWordPosition ].activeReference = setCurrentVerseReferencePosition;
				return newState;
			}

			return state;

		case 'GO_TO_NEXT_CURRENT_VERSE':
			getCurrentVersePosition = findIndex( state, word => word.hasOwnProperty( 'activeReference' ) );
			newState = [ ...state ];

			if ( newState[ getCurrentVersePosition ].activeReference < newState[ getCurrentVersePosition ].results.length - 1 ) {
				newState[ getCurrentVersePosition ].activeReference = newState[ getCurrentVersePosition ].activeReference + 1;
			}

			return newState;

		case 'GO_TO_PREVIOUS_CURRENT_VERSE':
			getCurrentVersePosition = findIndex( state, word => word.hasOwnProperty( 'activeReference' ) );
			newState = [ ...state ];

			if ( newState[ getCurrentVersePosition ].activeReference > 0 ) {
				newState[ getCurrentVersePosition ].activeReference = newState[ getCurrentVersePosition ].activeReference - 1;
			}

			return newState;

		default:
			return state;
	}
}

export default searchTerms;
