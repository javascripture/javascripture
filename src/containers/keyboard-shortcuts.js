// External
import { connect } from 'react-redux';
import find from 'lodash/find';
import isEqual from 'lodash/isEqual';

// Internal
import KeyboardShortcuts from '../components/keyboard-shortcuts';
import { goToReference, goToNextCurrentVerse, goToPreviousCurrentVerse } from '../actions'

function getCurrentReferenceOffset( searchResults, currentReference, offset ) {
	const currentSearchResults = find( searchResults, searchResult => {
		return isEqual( searchResult.terms, currentReference.terms );
	} )	;

	if ( currentSearchResults ) {
		return currentSearchResults.results[ currentReference.activeReference + offset ];
	}

	return null;
};

const mapStateToProps = ( { searchResults, currentReference, reference } ) => {
	return {
		nextReference: getCurrentReferenceOffset( searchResults, currentReference, 1 ),
		previousReference: getCurrentReferenceOffset( searchResults, currentReference, -1 ),
		reference: reference,
	}
};

const mapDispatchToProps = ( dispatch ) => {
	return {
		markNextCurrentReference: () => {
			dispatch( goToNextCurrentVerse() );
		},
		markPreviousCurrentReference: () => {
			dispatch( goToPreviousCurrentVerse() );
		},
		goToReference: ( reference ) => {
			goToReference( reference );
		}
	}
};

const KeyboardShortcutsContainer = connect(
 	mapStateToProps,
 	mapDispatchToProps,
)( KeyboardShortcuts )

export default KeyboardShortcutsContainer;
