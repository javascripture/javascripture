// External
import { connect } from 'react-redux';

// Internal
import VersionSelector from '../components/version-selector';
import { changeVersion } from '../actions'

const mapStateToProps = ( state, ownProps ) => {
	return {
		version: state.version
	}
};

const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		changeVersion: ( side, version ) => {
			dispatch( changeVersion( side, version ) );
			javascripture.modules.reference.loadReferenceFromHash();
		}
	}
};

const VersionSelectorContainer = connect(
 	mapStateToProps,
 	mapDispatchToProps
)( VersionSelector )

export default VersionSelectorContainer;
