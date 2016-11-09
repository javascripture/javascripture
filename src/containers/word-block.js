// External
import { connect } from 'react-redux';

// Internal
import WordBlock from '../components/word-details/word-block';
import { addWord, removeWord, toggleWord } from '../actions'

const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		addWord: ( lemma ) => {
			dispatch( addWord( lemma ) );
		},

		removeWord: ( lemma ) => {
			dispatch( removeWord( lemma ) );
		},

		toggleWord: () => {
			dispatch( toggleWord( ownProps.strongsNumber ) );
		}
	}
};

const WordBlockContainer = connect(
 	null,
 	mapDispatchToProps
)( WordBlock )

export default WordBlockContainer;
