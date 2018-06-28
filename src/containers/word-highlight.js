import { connect } from 'react-redux';
import WordHighlight from '../components/word-highlight';

const mapStateToProps = ( state, ownProps ) => {
	return {
		wordHighlight: state.wordHighlight,
		settings: state.settings,
	}
};

const WordHighlightContainer = connect(
 	mapStateToProps
)( WordHighlight )

export default WordHighlightContainer;
