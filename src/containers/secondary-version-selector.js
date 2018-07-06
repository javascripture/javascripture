// External
import { connect } from 'react-redux';
import find from 'lodash/find';
import isEqual from 'lodash/isEqual';

// Internal
import SecondaryVersionSelector from '../components/secondary-version-selector';
import { changeVersion, secondaryReference } from '../actions'

const getReferenceValue = ( state ) => {
	const chapter = state.secondaryScrollChapter.chapter ? state.secondaryScrollChapter.chapter : state.secondaryReference.chapter;
	const book = state.secondaryScrollChapter.book ? state.secondaryScrollChapter.book : state.secondaryReference.book;

	return book + ' ' + chapter;
};

const mapStateToProps = ( state, ownProps ) => {
	return {
		version: state.version,
		value: getReferenceValue( state ),
	}
};

const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		changeVersion: ( side, version ) => {
			dispatch( changeVersion( side, version ) );
		},
		setSecondaryReference: ( reference ) => {
			dispatch( secondaryReference( reference ) );
		},
	}
};

const SecondaryVersionSelectorContainer = connect(
 	mapStateToProps,
 	mapDispatchToProps
)( SecondaryVersionSelector )

export default SecondaryVersionSelectorContainer;
