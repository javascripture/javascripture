import { connect } from 'react-redux';
import ReferenceWrapper from '../components/reference-wrapper';

const mapStateToProps = ( { reference, settings }, ownProps ) => {
	return {
		inSync: settings.inSync,
		references: reference,
	}
};

const ReferenceWrapperContainer = connect(
 	mapStateToProps,
)( ReferenceWrapper )

export default ReferenceWrapperContainer;
