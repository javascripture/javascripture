export const setTrayVisibilityFilter = ( filter ) => {
	return {
		type: 'SET_TRAY_VISIBILITY_FILTER',
		filter
	}
}

export const setWordHighlight = ( word ) => {
	return {
		type: 'SET_WORD_HIGHLIGHT',
		word
	}
}

export const removeWordHighlight = ( word ) => {
	return {
		type: 'REMOVE_WORD_HIGHLIGHT',
		word
	}
}

export const setScrollChapter = ( book, chapter ) => {
	return {
		book,
		chapter,
		type: 'SET_SCROLL_CHAPTER'
	}
}

export const addNextChapter = ( reference ) => {
	return {
		reference,
		type: 'ADD_NEXT_CHAPTER'
	}
}

export const addPreviousChapter = ( reference ) => {
	return {
		reference,
		type: 'ADD_PREVIOUS_CHAPTER'
	}
}

export const addBookmark = ( reference ) => {
	return {
		reference,
		type: 'ADD_BOOKMARK'
	}
}

export const removeBookmark = ( reference ) => {
	return {
		reference,
		type: 'REMOVE_BOOKMARK'
	}
}

export const settingsChange = ( settingName, settingValue ) => {
	var returnValue = {
		type: 'SETTINGS_CHANGE'
	}
	returnValue[ settingName ] = settingValue;

	return returnValue;
}

export const showCrossReferences = ( reference ) => {
	return {
		reference,
		type: 'SHOW_CROSS_REFERENCES'
	}
}

export const addWord = ( { strongsNumber, open, morphology } ) => {
	return {
		strongsNumber,
		open,
		morphology,
		type: 'ADD_WORD'
	}
}

export const removeWord = ( strongsNumber ) => {
	return {
		strongsNumber,
		type: 'REMOVE_WORD'
	}
}

export const toggleWord = ( strongsNumber ) => {
	return {
		strongsNumber,
		type: 'TOGGLE_WORD'
	}
}
