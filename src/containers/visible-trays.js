import { connect } from 'react-redux'
import { toggleTray } from '../actions'
import TrayList from '../components/trays/tray-list'

// set up global - to be deleted
javascripture.state = {};

const mapStateToProps = ( state ) => {
  // remove this line
  javascripture.state.subdue = state.subdue;

  return {
    trays: state.trays,
    filter: state.trayVisibilityFilter,
    subdue: state.subdue
  }
}

const mapDispatchToProps = ( dispatch ) => {
  return {
    onTrayClick: ( id ) => {
      dispatch( toggleTray( id ) )
    }
  }
}

const VisibleTrayList = connect(
  mapStateToProps,
  mapDispatchToProps
)( TrayList )

export default VisibleTrayList
