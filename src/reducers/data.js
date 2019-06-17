const initialState = {
	greek: javascripture.data.greek,
	hebrew: javascripture.data.hebrew,
	KJV: javascripture.data.kjv,
	LC: javascripture.data.literalConsistent,
};

const data = ( state = initialState, action ) => {
	switch ( action.type ) {
		case 'REQUEST_DATA':
			const requestState = { ...state };
			requestState[ action.key ] = {};
			return requestState;

		case 'RECEIVE_DATA':
			const newState = { ...state };
			newState[ action.key ] = action.data;
			javascripture.data[ action.key ] = action.data; //for search
			return newState;

		default:
			return state;
	}
};

export default data;
