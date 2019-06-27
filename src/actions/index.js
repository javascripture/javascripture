var cache = 'javascripture.22.0.1560597788';

import { createReferenceLink } from '../lib/reference.js';
import xhr from 'xhr';

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

function postMessageToWorker( task, parameters, state ) {
	worker.postMessage( {
		task,
		parameters,
		data: state.data[ parameters.version ],
	} );
}

export const addWord = ( { strongsNumber, subdue, open, morphology, version, clickedWord } ) => {
	return function( dispatch, getState ) {
		const searchParameters = {
			clusivity: 'exclusive',
			version: version,
			lemma: strongsNumber,
			range: 'verse',
			clickedWord: clickedWord,
		};

		// Send data to our worker.
		postMessageToWorker( 'search', searchParameters, getState() );

		dispatch( {
			strongsNumber,
			subdue,
			open,
			morphology,
			version,
			clickedWord,
			type: 'ADD_WORD',
		} );
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

export const openAdvancedSearch = () => {
		return {
		type: 'OPEN_ADVANCED_SEARCH'
	}
};

export const closeAdvancedSearch = () => {
		return {
		type: 'CLOSE_ADVANCED_SEARCH'
	}
};

export const addSearch = ( terms, target ) => {
	return function( dispatch, getState ) {
		// Send data to our worker.
		postMessageToWorker( target, terms, getState() );

		dispatch( {
			open: true,
			target,
			terms,
			type: 'ADD_SEARCH'
		} );
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

export const closeReferenceSelectorMobile = ( index ) => {
	return {
		index,
		type: 'CLOSE_REFERENCE_SELECTOR_MOBILE',
	}
}

export const toggleReferenceSelectorMobile = ( index ) => {
	return {
		index,
		type: 'TOGGLE_REFERENCE_SELECTOR_MOBILE',
	}
}

export const addColumn = () => {
	return {
		type: 'ADD_COLUMN'
	}
}

export const removeColumn = ( index ) => {
	return {
		index,
		type: 'REMOVE_COLUMN'
	}
}

export const activateSearchSelect = ( target ) => {
	return {
		target,
		type: 'ACTIVATE_SEARCH_SELECT',
	}
}

export const deactivateSearchSelect = () => {
	return {
		type: 'DEACTIVATE_SEARCH_SELECT',
	}
}

export const updateSearchForm = ( name, value ) => {
	return {
		name,
		value,
		type: 'UPDATE_SEARCH_FORM',
	}
}

export const appendToSearchForm = ( name, value ) => {
	return {
		name,
		value,
		type: 'APPEND_TO_SEARCH_FORM',
	}
}

export const clearSearchForm = () => {
	return {
		type: 'CLEAR_SEARCH_FORM',
	}
}

function requestData( key ) {
	return {
		type: 'REQUEST_DATA',
		key,
	}
}

function receiveData( key, data ) {
	return {
		type: 'RECEIVE_DATA',
		key,
		data,
	}
}

export const fetchData = ( key ) => {
	return function( dispatch, getState ) {
		const { data } = getState(); // check that the data isn't already in state
		if ( data[ key ] ) {
			return;
		}

		dispatch( requestData( key ) );

		return xhr( {
			method: "get",
			uri: "/bibles/" + key + ".json",
			headers: {
				"Content-Type": "application/json"
			}
		}, function ( error, response, body ) {
			dispatch( receiveData( key, JSON.parse( body ).books ) );
			caches.open( cache ).then( function( cache ) {
				return cache.addAll([
					'/bibles/' + key +'.json'
				]);
			});
		} );
	}
}
