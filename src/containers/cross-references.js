import { connect } from 'react-redux'
import some from 'lodash/some';

import { showCrossReferences } from '../actions'
import CrossReferences from '../components/cross-references'

const mapStateToProps = ( state, ownProps ) => {
	return {
		reference: state.crossReferences
	};
};

const mapDispatchToProps = ( dispatch, ownProps ) => {
	// Delete later
	javascripture.reactHelpers.showCrossReferences = showCrossReferences;

	return {
		showCrossReferences: ( reference ) => {
			dispatch( showCrossReferences( reference ) )
		}
	}
};

const CrossReferencesContainer = connect(
 	mapStateToProps,
 	mapDispatchToProps
)( CrossReferences )

export default CrossReferencesContainer;
