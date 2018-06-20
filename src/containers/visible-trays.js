import { connect } from 'react-redux';
import findIndex from 'lodash/findIndex';
import { toggleTray } from '../actions'
import TrayList from '../components/trays/tray-list';

const mapStateToProps = ( state ) => {
	return {
		trays: state.trays,
		filter: state.trayVisibilityFilter,
	}
}

const mapDispatchToProps = ( dispatch ) => {
	return {
		onTrayClick: ( id ) => {
			dispatch( toggleTray( id ) )
		},
	}
}

const VisibleTrayList = connect(
	mapStateToProps,
	mapDispatchToProps
)( TrayList )

export default VisibleTrayList
