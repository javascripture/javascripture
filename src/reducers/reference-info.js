import difference from 'lodash/difference';

const referenceInfo = ( state = null, action ) => {
	switch ( action.type ) {
		case 'SET_REFERENCE_INFO':
			return action.reference;
		default:
			return state
	}
}

export default referenceInfo;
