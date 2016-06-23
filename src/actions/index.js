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

export const settingsSubdue = ( subdueBy ) => {
	return {
		subdueBy,
		type: 'SETTINGS_SUBDUE_BY'
	}
}


