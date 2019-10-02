import difference from 'lodash/difference';

const initialState = {
	reference: null,
	referenceToCompareWith: null,
	limit: 100,
};

const referenceInfo = ( state = initialState, action ) => {
	switch ( action.type ) {
		case 'SET_REFERENCE_INFO':
			return { ...state, reference: action.reference };
		case 'SET_REFERENCE_INFO_COMPARE_WITH':
			return { ...state, referenceToCompareWith: action.referenceToCompareWith  };
		case 'SET_REFERENCE_INFO_LIMIT':
			return { ...state, limit: action.limit };
		default:
			return state
	}
}

export default referenceInfo;
