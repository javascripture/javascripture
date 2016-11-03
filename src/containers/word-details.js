// External
import { connect } from 'react-redux';

// Internal
import WordDetails from '../components/word-details';
import { addWord, removeWord } from '../actions'

const mapStateToProps = ( state, ownProps ) => {
	return {
		words: state.wordDetails
	}
};

const mapDispatchToProps = ( dispatch, ownProps ) => {
	javascripture.reactHelpers.addWord = addWord;
	javascripture.reactHelpers.removeWord = removeWord;

	return {
		addWord: ( lemma ) => {
			console.log('addWord');
			dispatch( addWord( lemma ) );
		},

		removeWord: ( lemma ) => {
			dispatch( removeWord( lemma ) );
		}
	}
};

const WordDetailsContainer = connect(
 	mapStateToProps,
 	mapDispatchToProps
)( WordDetails )

export default WordDetailsContainer;
