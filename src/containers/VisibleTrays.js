import { connect } from 'react-redux'
import { toggleTray } from '../actions'
import TrayList from '../components/TrayList'

const mapStateToProps = ( state ) => {
  return {
    trays: state.trays,
    filter: state.trayVisibilityFilter
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
