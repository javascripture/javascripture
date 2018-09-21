// External
import { connect } from 'react-redux';

// Internal
import WordBlock from '../components/word-details/word-block';
import { addWord, removeSearch, removeWord, settingsChange, toggleWord } from '../actions'

const mapStateToProps = ( state, ownProps ) => {
	return {
		settings: state.settings,
	};
};

const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		addWord: ( strongsNumber, subdue ) => {
			dispatch( addWord( {
				strongsNumber: strongsNumber,
				subdue,
				open: true,
				morphology: null,
				version: ownProps.version,
			} ) );
		},

		removeWord: ( lemma, version ) => {
			const searchParameters = {
				clusivity: 'exclusive',
				version: version,
				lemma: lemma,
				range: 'verse',
			};

			dispatch( removeWord( lemma ) );
			dispatch( removeSearch( searchParameters ) );
		},

		toggleWord: () => {
			dispatch( toggleWord( ownProps.strongsNumber ) );
		},

		expandSearchResults: () => {
			dispatch( settingsChange( 'expandedSearchResults', true ) );
		},

		collapseSearchResults: () => {
			dispatch( settingsChange( 'expandedSearchResults', false ) );
		},

	}
};

const WordBlockContainer = connect(
	mapStateToProps,
	mapDispatchToProps,
)( WordBlock )

export default WordBlockContainer;
