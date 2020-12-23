var cache = 'javascripture.22.0.1608725883';

import xhr from 'xhr';
import { createReferenceLink, getAllLemmasFromReference } from '../lib/reference.js';

export const goToReference = ( reference ) => {
	window.location.hash = createReferenceLink( reference );
}

export const setTrayVisibilityFilter = ( filter ) => {
	return {
		type: 'SET_TRAY_VISIBILITY_FILTER',
		filter
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

export const findSimilarReferences = ( reference ) => {
	return function( dispatch, getState ) {
		const searchParameters = {
			clusivity: 'inclusive',
			version: 'original',
			lemma: getAllLemmasFromReference( reference, getState().data.original ),
			range: 'verse',
		};

		// Send data to our worker.
		postMessageToWorker( 'search', searchParameters, getState() );

		dispatch( {
			reference,
			type: 'FIND_SIMILAR_REFERENCES'
		} );
	}
}

function postMessageToWorker( task, parameters, state ) {
	let data = state.data[ parameters.version ];
	if ( parameters.version === 'LC' ) {
		data = state.data[ 'original' ];
	}
	worker.postMessage( {
		task,
		parameters,
		data,
	} );
}

export const addWord = ( { strongsNumber, open, morphology, version, clickedWord } ) => {
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
			subdue: getState().settings.subdue,
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

export const clearSearch = ( terms ) => {
	return {
		terms,
		type: 'CLEAR_SEARCH'
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

export const openReferenceSelectorMobile = ( index ) => {
	return {
		index,
		type: 'OPEN_REFERENCE_SELECTOR_MOBILE',
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

export const setReferenceInfo = ( reference ) => {
	return {
		type: 'SET_REFERENCE_INFO',
		reference: reference,
	}
}

export const setReferenceInfoCompareWith = ( referenceToCompareWith ) => {
	return {
		type: 'SET_REFERENCE_INFO_COMPARE_WITH',
		referenceToCompareWith: referenceToCompareWith,
	}
}

export const setReferenceInfoLimit = ( limit ) => {
	return {
		type: 'SET_REFERENCE_INFO_LIMIT',
		limit,
	}
}

export const openSidebar = () => {
	return {
		type: 'OPEN_SIDEBAR',
	}
}

export const closeSidebar = () => {
	return {
		type: 'CLOSE_SIDEBAR',
	}
}

export const toggleSidebar = () => {
	return {
		type: 'TOGGLE_SIDEBAR',
	}
}

export const selectWord = ( props ) => {
	const { word, lemma, morph, version } = props;
	return function( dispatch, getState ) {
		const searchSelect = getState().searchSelect;
		if ( searchSelect ) {
			dispatch( appendToSearchForm( searchSelect, props[ searchSelect ] ) );
			dispatch( updateSearchForm( 'version', version ) );
			dispatch( deactivateSearchSelect() );
		} else {
			dispatch( setTrayVisibilityFilter( 'word' ) );

			lemma && lemma.split( ' ' ).map( strongsNumber => {
				if ( strongsNumber === "G3588" ) {
					return;
				}

				dispatch( addWord( {
					strongsNumber,
					open: true,
					morphology: morph,
					version: version,
					clickedWord: word,
				} ) );
			} );
		}
	}

};

export const addToList = ( item ) => {
	return {
		type: 'ADD_TO_LIST',
		item: item,
	}
};

export const removeFromList = ( item ) => {
	return {
		type: 'REMOVE_FROM_LIST',
		item: item,
	}
};

export const removeTypeFromList = ( listType ) => {
	return {
		type: 'REMOVE_TYPE_FROM_LIST',
		listType: listType,
	}
};

export const toggleListItemVisible = ( item ) => {
	return {
		type: 'TOGGLE_LIST_ITEM_VISIBLE',
		item: item,
	}
};
