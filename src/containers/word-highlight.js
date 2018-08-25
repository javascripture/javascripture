import { connect } from 'react-redux';
import WordHighlight from '../components/word-highlight';

const mapStateToProps = ( state, ownProps ) => {
	return {
		wordHighlight: state.wordHighlight,
		settings: state.settings,
		searchSelect: state.searchSelect,
	}
};

const WordHighlightContainer = connect(
 	mapStateToProps
)( WordHighlight )

export default WordHighlightContainer;
