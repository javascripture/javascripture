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
					morphology: word.morphology
				};
			} );

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
				newState = [ ...state ];

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

		case 'SET_CURRENT_VERSE':
			const setCurrentVerseWordPosition = findIndex( state, word => word.strongsNumber === action.terms.lemma );

			newState = state.map( word => {
				return {
					open: word.open,
					results: word.results,
					strongsNumber: word.strongsNumber,
				};
			} );

			if ( setCurrentVerseWordPosition > -1 ) { // This wont' always be the case because of the word details
				const setCurrentVerseReferencePosition = findIndex( newState[ setCurrentVerseWordPosition ].results, reference => {
					return reference.book === action.reference.book && reference.chapter === action.reference.chapter && reference.verse === action.reference.verse
				} );

				newState[ setCurrentVerseWordPosition ].activeReference = setCurrentVerseReferencePosition;
				return newState;
			}

			return newState;

		case 'GO_TO_NEXT_CURRENT_VERSE':
			getCurrentVersePosition = findIndex( state, word => word.hasOwnProperty( 'activeReference' ) );
			newState = [ ...state ];
			console.log( 'sfsadf' );
			console.log( getCurrentVersePosition );

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

export default wordDetails;
