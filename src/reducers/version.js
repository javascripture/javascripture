const version = ( state = { left: 'original', right: 'kjv' }, action ) => {
	let returnState;
	switch ( action.type ) {
		default:
			returnState = state;
			break;
	}

	javascripture.state.version = returnState;
	return returnState;
}

export default version;
