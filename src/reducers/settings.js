const initialState = {
	fontSize: "100%",
	fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen-Sans", "Ubuntu", "Cantarell", "Helvetica Neue", Arial, Helvetica, sans-serif;',
	highlightWordsWith: "same",
	referencePicker: "select",
	subdue: "50%",
	inSync: true,
	expandedSearchResults: false,
	highlightSearchResults: false,
	interfaceLanguage: 'KJV',
	type: "SETTINGS_CHANGE",
	darkMode: null,
	compareMode: false,
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
