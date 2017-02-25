import { connect } from 'react-redux'
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import { goToReference, goToNextCurrentVerse, goToPreviousCurrentVerse, toggleTray } from '../actions'
import isEqual from 'lodash/isEqual';
import TrayList from '../components/trays/tray-list';

function getCurrentReferenceOffset( state, offset ) {
	const currentSearchResults = find( state.searchResults, searchResult => {
		return isEqual( searchResult.terms, state.currentReference.terms );
	} )	;

	if ( currentSearchResults ) {
		return currentSearchResults.results[ state.currentReference.activeReference + offset ];
	}

	return null;
}

const mapStateToProps = ( state ) => {
	return {
		trays: state.trays,
		filter: state.trayVisibilityFilter,
		nextReference: getCurrentReferenceOffset( state, 1 ),
		previousReference: getCurrentReferenceOffset( state, -1 ),
	}
}

const mapDispatchToProps = ( dispatch ) => {
	return {
		onTrayClick: ( id ) => {
			dispatch( toggleTray( id ) )
		},
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
}

const VisibleTrayList = connect(
	mapStateToProps,
	mapDispatchToProps
)( TrayList )

export default VisibleTrayList
