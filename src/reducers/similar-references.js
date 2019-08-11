export default ( state = [], action ) => {
	switch ( action.type ) {
		case 'FIND_SIMILAR_REFERENCES':
			return action.reference;

		default:
			return state;
	}
};

