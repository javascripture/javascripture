// External
import { connect } from 'react-redux';

// Internal
import WordDetails from '../components/word-details';
import { addWord, clearAll, removeWord } from '../actions'

const mapStateToProps = ( state, ownProps ) => {
	return {
		words: state.wordDetails
	}
};

const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		addWord: ( lemma, open, morphology, version ) => {
			dispatch( addWord( { lemma, open, morphology, version } ) );
		},

		clearAll: () => {
			dispatch( clearAll() );
		},

		removeWord: ( lemma ) => {
			dispatch( removeWord( lemma ) );
		},
	}
};

const WordDetailsContainer = connect(
 	mapStateToProps,
 	mapDispatchToProps
)( WordDetails )

export default WordDetailsContainer;
