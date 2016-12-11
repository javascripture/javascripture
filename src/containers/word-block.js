// External
import { connect } from 'react-redux';

// Internal
import WordBlock from '../components/word-details/word-block';
import { addWord, removeSearch, removeWord, toggleWord } from '../actions'

const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		addWord: ( lemma ) => {
			dispatch( addWord( lemma ) );
		},

		removeWord: ( lemma ) => {
			const searchParameters = {
				clusivity: 'exclusive',
				language: 'kjv',
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
 	null,
 	mapDispatchToProps
)( WordBlock )

export default WordBlockContainer;
