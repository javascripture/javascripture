const initialState = {
	greek: javascripture.data.greek,
	hebrew: javascripture.data.hebrew,
	kjv: javascripture.data.kjv,
	web: javascripture.data.web,
	faropv: javascripture.data.faropv,
	fartpv: javascripture.data.fartpv,
};

const data = ( state = initialState, action ) => {
	switch ( action.type ) {
		case 'REQUEST_DATA':
			return state;

		case 'RECEIVE_DATA':
			const newState = { ...state };
			newState[ action.key ] = action.data;
			return newState;

		default:
			return state;
	}
};

export default data;
