// External
import { connect } from 'react-redux';
import find from 'lodash/find';
import isEqual from 'lodash/isEqual';

// Internal
import SearchLink from '../components/search/search-link';
import { setCurrentVerse } from '../actions';

function isActive( currentReference, ownProps ) {
	if( ownProps.terms === currentReference.terms && currentReference.activeReference === ownProps.index ) {
		return true;
	}

	return false;
}

const mapStateToProps = ( state, ownProps ) => {
	return {
		isActive: isActive( state.currentReference, ownProps ),
		expandedSearchResults: state.settings.expandedSearchResults,
		highlightSearchResults: state.settings.highlightSearchResults,
		data: state.data,
	};
};

const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		setCurrentVerse: ( index ) => {
			dispatch( setCurrentVerse( ownProps.terms, index ) );
		},
	}
};

const SearchLinkContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)( SearchLink )

export default SearchLinkContainer;
