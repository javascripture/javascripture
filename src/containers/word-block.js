// External
import { connect } from 'react-redux';

// Internal
import WordBlock from '../components/word-details/word-block';
import { addWord, removeSearch, removeWord, toggleWord } from '../actions'

const mapStateToProps = ( state, ownProps ) => {
	return {
		settings: state.settings,
	};
};

const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		addWord: ( strongsNumber ) => {
			dispatch( addWord( {
				strongsNumber: strongsNumber,
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
		}
	}
};

const WordBlockContainer = connect(
 	mapStateToProps,
 	mapDispatchToProps,
)( WordBlock )

export default WordBlockContainer;
