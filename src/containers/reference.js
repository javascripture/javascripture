import { connect } from 'react-redux';
import Reference from '../components/reference';

const mapStateToProps = ( state, ownProps ) => {
	return state.references;
};

const ReferenceContainer = connect(
 	null
)( Reference )

export default ReferenceContainer;
