import { connect } from 'react-redux'
import some from 'lodash/some';

import { setTrayVisibilityFilter } from '../actions'
import TrayLink from '../components/trays/filter'

const mapStateToProps = ( state, ownProps ) => {
	return {
		active: state.trays.some( tray => {
			return ( tray.id === ownProps.filter && tray.visible );
		} )
	}
};

const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		activate: () => {
			dispatch( setTrayVisibilityFilter( ownProps.filter ) )
		},
		hideAll: () => {
			dispatch( setTrayVisibilityFilter( 'SHOW_NONE' ) )
		}
	}
};

const TrayFilter = connect(
 	mapStateToProps,
 	mapDispatchToProps
)( TrayLink )

export default TrayFilter;
