import { createReferenceLink } from '../lib/reference.js';

export const goToReference = ( reference ) => {
	window.location.hash = createReferenceLink( reference );
}

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

export const setScrollChapter = ( book, chapter, index ) => {
	return {
		book,
		chapter,
		index,
		type: 'SET_SCROLL_CHAPTER'
	}
}

export const setSecondaryScrollChapter = ( book, chapter ) => {
	return {
		book,
		chapter,
		type: 'SET_SECONDARY_SCROLL_CHAPTER'
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

export const addWord = ( { strongsNumber, open, morphology, version } ) => {
	const searchParameters = {
		clusivity: 'exclusive',
		version: version,
		lemma: strongsNumber,
		range: 'verse',
	};

	// Send data to our worker.
	console.log(navigator);
	 navigator.serviceWorker.controller.postMessage( {
		task: 'search',
		parameters: searchParameters,
	} );

	return {
		strongsNumber,
		open,
		morphology,
		version,
		type: 'ADD_WORD',
	}
}

export const removeWord = ( strongsNumber ) => {
	return {
		strongsNumber,
		type: 'REMOVE_WORD'
	}
}

export const clearAll = () => {
	return {
		type: 'CLEAR_ALL'
	}
}

export const toggleWord = ( strongsNumber ) => {
	return {
		strongsNumber,
		type: 'TOGGLE_WORD'
	}
}

export const addSearch = ( terms, target ) => {
	// Send data to our worker.
	 navigator.serviceWorker.controller.postMessage( {
		task: target,
		parameters: terms
	} );

	return {
		open: true,
		target,
		terms,
		type: 'ADD_SEARCH'
	}
}

export const removeSearch = ( terms ) => {
	return {
		terms,
		type: 'REMOVE_SEARCH'
	}
}

export const toggleSearch = ( terms ) => {
	return {
		terms,
		type: 'TOGGLE_SEARCH'
	}
}

export const setCurrentVerse = ( terms, index ) => {
	return {
		index,
		terms,
		type: 'SET_CURRENT_VERSE'
	}
}

export const goToNextCurrentVerse = () => {
	return {
		type: 'GO_TO_NEXT_CURRENT_VERSE'
	}
}

export const goToPreviousCurrentVerse = () => {
	return {
		type: 'GO_TO_PREVIOUS_CURRENT_VERSE'
	}
}

export const changeVersion = ( index, version ) => {
	return {
		type: 'CHANGE_VERSION',
		index: parseInt( index ),
		version: version
	}
}

export const secondaryReference = ( reference ) => {
	return {
		reference,
		type: 'SECONDARY_REFERENCE'
	}
}

export const setReference = ( reference, index ) => {
	return {
		reference,
		index,
		type: 'SET_REFERENCE'
	}
}

export const referenceSelectorMobileSetBook = ( bookName, bookIndex, index ) => {
	return {
		bookName,
		bookIndex,
		index,
		type: 'REFERENCE_SELECTOR_MOBILE_SET_BOOK',
	}
}

export const toggleReferenceSelectorMobile = ( index ) => {
	return {
		index,
		type: 'TOGGLE_REFERENCE_SELECTOR_MOBILE',
	}
}
