import { connect } from 'react-redux';
import { addWord, removeWordHighlight, setWordHighlight, setTrayVisibilityFilter } from '../actions';
import WordSingle from '../components/reference/word-single';

const mapStateToProps = ( state, ownProps ) => {
	return {
		highlighted: state.wordHighlight
	}
};

const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		highlightOn: () => {
			dispatch( setWordHighlight( ownProps.lemma.split(' ') ) )
		},
		highlightOff: () => {
			dispatch( removeWordHighlight( ownProps.lemma.split( ' ' ) ) )
		},
		click: () => {
			dispatch( setTrayVisibilityFilter( 'word' ) );

			ownProps.lemma.split( ' ' ).map( strongsNumber => {
				dispatch( addWord( { strongsNumber, open: true, morphology: ownProps.morph } ) );
			} );
		},
	}
};

const WordSingleContainer = connect(
 	mapStateToProps,
 	mapDispatchToProps
)( WordSingle )

export default WordSingleContainer;
