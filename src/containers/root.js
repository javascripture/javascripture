import { connect } from 'react-redux';
import Root from '../components/root';

const mapStateToProps = ( state, ownProps ) => {
	return {
		settings: state.settings,
	};
};

const RootContainer = connect(
 	mapStateToProps
)( Root );

export default Root;
