import { connect } from 'react-redux';
import {
	addWord,
	deactivateSearchSelect,
	removeWordHighlight,
	setWordHighlight,
	setTrayVisibilityFilter,
	updateSearchForm,
	appendToSearchForm
} from '../actions';
import WordSingle from '../components/reference/word-single';

const mapStateToProps = ( state, ownProps ) => {
	return {
		highlighted: state.wordHighlight,
		searchSelect: state.searchSelect,
		settings: state.settings,
	}
};

const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		highlightOn: () => {
			dispatch( setWordHighlight( ownProps.lemma.split(' ') ) )
		},
		highlightOff: () => {
			dispatch( removeWordHighlight( ownProps.lemma.split( ' ' ) ) )
		},
		selectSearchTerm: ( name, value ) => {
			dispatch( appendToSearchForm( name, value ) );
			dispatch( updateSearchForm( 'version', ownProps.language ) );
			dispatch( deactivateSearchSelect() );
		},
		addWord: ( subdue ) => {
			dispatch( setTrayVisibilityFilter( 'word' ) );

			ownProps.lemma && ownProps.lemma.split( ' ' ).map( strongsNumber => {
				if ( strongsNumber === "G3588" ) {
					return;
				}

				dispatch( addWord( {
					strongsNumber,
					subdue,
					open: true,
					morphology: ownProps.morph,
					version: ownProps.language,
					clickedWord: ownProps.word,
				} ) );
			} );
		},
	}
};

const WordSingleContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)( WordSingle )

export default WordSingleContainer;
