// External
import { connect } from 'react-redux';
import find from 'lodash/find';
import isEqual from 'lodash/isEqual';

// Internal
import VersionSelector from '../components/version-selector';
import { changeVersion, setReference, setScrollChapter } from '../actions'

const getReferenceValue = ( state, index ) => {
	const chapter = ( state.scrollChapter[ index ] && state.scrollChapter[ index ].chapter ) ? state.scrollChapter[ index ].chapter : state.reference[ index ].chapter;
	const book = ( state.scrollChapter[ index ] && state.scrollChapter[ index ].book ) ? state.scrollChapter[ index ].book : state.reference[ index ].book;

	return book + ' ' + chapter;
};

const mapStateToProps = ( state, ownProps ) => {
	return {
		inSync: state.settings.inSync,
		references: state.reference,
		value: getReferenceValue( state, ownProps.index ),
	}
};

const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		changeVersion: ( index, version ) => {
			dispatch( changeVersion( index, version ) );
		},
		setReference: ( reference, index ) => {
			dispatch( setReference( reference, index ) );
			dispatch( setScrollChapter( reference.book, reference.chapter, index ) );
		},
	}
};

const VersionSelectorContainer = connect(
 	mapStateToProps,
 	mapDispatchToProps
)( VersionSelector )

export default VersionSelectorContainer;
