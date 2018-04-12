import { connect } from 'react-redux';
import Reference from '../components/reference';

const mapStateToProps = ( state, ownProps ) => {
	return {
		references: state.references
	}
};

const ReferenceContainer = connect(
 	mapStateToProps
)( Reference )

export default ReferenceContainer;
