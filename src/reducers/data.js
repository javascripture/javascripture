const initialState = {
	greek: javascripture.data.greek,
	hebrew: javascripture.data.hebrew,
	kjv: javascripture.data.kjv,
	esv: javascripture.data.esv,
	web: javascripture.data.web,
};

const data = ( state = initialState, action ) => {
	switch ( action.type ) {
		case 'ADD_DATA':
			return state;

		case 'REMOVE_DATA':
			return state;

		default:
			return state;
	}
};

export default data;
