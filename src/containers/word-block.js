// External
import { connect } from 'react-redux';

// Internal
import WordBlock from '../components/word-details/word-block';
import { addWord, removeWord } from '../actions'

const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		addWord: ( lemma ) => {
			dispatch( addWord( lemma ) );
		},

		removeWord: ( lemma ) => {
			dispatch( removeWord( lemma ) );
		}
	}
};

const WordBlockContainer = connect(
 	null,
 	mapDispatchToProps
)( WordBlock )

export default WordBlockContainer;
