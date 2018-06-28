const version = ( state = { left: 'original', right: 'kjv' }, action ) => {
	let returnState;
	switch ( action.type ) {
		case 'CHANGE_VERSION':
			const newVersion = {};
			newVersion[ action.side ] = action.version;

			returnState = Object.assign( {}, state, newVersion );
			break;

		default:
			returnState = state;
			break;
	}

	javascripture.state.version = returnState;
	return returnState;
}

export default version;
