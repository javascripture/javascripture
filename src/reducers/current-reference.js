import findIndex from 'lodash/findIndex';
import isEqual from 'lodash/isEqual';

const currentReference = ( state = {}, action ) => {
	switch ( action.type ) {
		case 'SET_CURRENT_VERSE':
			return {
				terms: action.terms,
				activeReference: action.index
			};

		case 'GO_TO_NEXT_CURRENT_VERSE':
			return Object.assign( {}, state, {
        		activeReference: state.activeReference + 1
      		} );

		case 'GO_TO_PREVIOUS_CURRENT_VERSE':
			return Object.assign( {}, state, {
        		activeReference: state.activeReference - 1
      		} );

		case 'CLEAR_ALL':
			return [];

		default:
			return state;
	}
}

export default currentReference;
