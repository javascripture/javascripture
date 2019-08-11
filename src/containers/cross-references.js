import { connect } from 'react-redux';
import some from 'lodash/some';

import { showCrossReferences, findSimilarReferences, removeSearch } from '../actions';
import CrossReferences from '../components/cross-references';

const mapStateToProps = ( state, ownProps ) => {
	return {
		reference: state.crossReferences,
		data: state.data,
		showSimilarVerses: state.similarReferences === state.crossReferences,
	};
};

const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		findSimilarReferences: ( reference ) => {
			dispatch( findSimilarReferences( reference ) );
		},
		removeSearch: ( terms ) => {
			dispatch( removeSearch( terms ) );
		},
	}
};

const CrossReferencesContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)( CrossReferences )

export default CrossReferencesContainer;
