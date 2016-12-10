import { connect } from 'react-redux'
import find from 'lodash/find';
import { goToReference, goToNextCurrentVerse, goToPreviousCurrentVerse, toggleTray } from '../actions'
import TrayList from '../components/trays/tray-list';

function getCurrentReferenceOffset( state, offset ) {
	const activeTerm = find( state.searchTerms, searchTerm => searchTerm.hasOwnProperty( 'activeReference' ) );

	if ( activeTerm ) {
		return activeTerm.results[ activeTerm.activeReference + offset ];
	}
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
