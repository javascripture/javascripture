const initialState = {
	fontSize: "100%",
	fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
	highlightWordsWith: "same",
	referencePicker: "select",
	subdue: "50%",
	inSync: true,
	type: "SETTINGS_CHANGE",
}

export default ( state = initialState, action ) => {
	let settings;
	switch ( action.type ) {
		case 'SETTINGS_CHANGE':
			settings = Object.assign( {}, state, action );
			break;

		default:
			settings = state;
			break;
	}

	javascripture.state.settings = settings;
	return settings;
}
