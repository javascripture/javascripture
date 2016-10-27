const crossReferences = ( state = '', action ) => {
	switch ( action.type ) {
		case 'SHOW_CROSS_REFERENCES':
			return action.reference;

		default:
			return state;
	}
}

export default crossReferences;
