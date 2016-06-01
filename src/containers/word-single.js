import { connect } from 'react-redux';
import { removeWordHighlight, setWordHighlight } from '../actions';
import WordSingle from '../components/reference/word-single';

const mapStateToProps = ( state, ownProps ) => {
	return {
		highlighted: state.wordHighlight
	}
};

const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		highlightOn: () => {
			dispatch( setWordHighlight( ownProps.lemma ) )
		},
		highlightOff: () => {
			dispatch( removeWordHighlight( ownProps.lemma ) )
		}
	}
};

const WordSingleContainer = connect(
 	mapStateToProps,
 	mapDispatchToProps
)( WordSingle )

export default WordSingleContainer;
