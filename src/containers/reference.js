import { connect } from 'react-redux';
import Reference from '../components/reference';

const mapStateToProps = ( state, ownProps ) => {
	return state.reference;
};

const ReferenceContainer = connect(
 	mapStateToProps
)( Reference )

export default ReferenceContainer;
