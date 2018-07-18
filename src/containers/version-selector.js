// External
import { connect } from 'react-redux';
import find from 'lodash/find';
import isEqual from 'lodash/isEqual';

// Internal
import VersionSelector from '../components/version-selector';
import { changeVersion } from '../actions'

const getReferenceValue = ( state, index ) => {
	const chapter = ( state.scrollChapter[ index ] && state.scrollChapter[ index ].chapter ) ? state.scrollChapter[ index ].chapter : state.reference[ index ].chapter;
	const book = ( state.scrollChapter[ index ] && state.scrollChapter[ index ].book ) ? state.scrollChapter[ index ].book : state.reference[ index ].book;

	return book + ' ' + chapter;
};

const mapStateToProps = ( state, ownProps ) => {
	return {
		inSync: state.settings.inSync,
		version: state.version,
		value: getReferenceValue( state, ownProps.index ),
	}
};

const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		changeVersion: ( side, version ) => {
			dispatch( changeVersion( side, version ) );
		},
	}
};

const VersionSelectorContainer = connect(
 	mapStateToProps,
 	mapDispatchToProps
)( VersionSelector )

export default VersionSelectorContainer;
