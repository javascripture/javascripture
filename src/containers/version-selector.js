// External
import { connect } from 'react-redux';

// Internal
import VersionSelector from '../components/version-selector';
import { changeVersion } from '../actions';

const getReferenceValue = ( state ) => {
	const chapter = state.scrollChapter.chapter ? state.scrollChapter.chapter : state.reference.chapter;
	const book = state.scrollChapter.book ? state.scrollChapter.book : state.reference.book;

	return book + ' ' + chapter;
};

const mapStateToProps = ( state, ownProps ) => {
	return {
		version: state.version,
		value: getReferenceValue( state )
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
