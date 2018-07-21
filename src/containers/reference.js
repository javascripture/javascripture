import { connect } from 'react-redux';
import { setScrollChapter } from '../actions';
import Reference from '../components/reference';


const mapStateToProps = ( state, ownProps ) => {
	return {
		inSync: state.settings.inSync,
	}
};

const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		setScrollChapter: ( book, chapter, index ) => {
			dispatch( setScrollChapter( book, chapter, index ) );
		},
		setScrollChapterPrevious: ( book, chapter, index ) => {
			const currentChapter = bible.parseReference( book + ' ' + chapter );
			const prevChapter = currentChapter.prevChapter();
			if ( prevChapter ) {
				dispatch( setScrollChapter( prevChapter.bookName, prevChapter.chapter1, index ) );
			}
		},
	}
};

const ReferenceContainer = connect(
 	mapStateToProps,
 	mapDispatchToProps
)( Reference )

export default ReferenceContainer;
