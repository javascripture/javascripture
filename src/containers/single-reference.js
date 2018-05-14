import { connect } from 'react-redux';
import { addNextChapter, addPreviousChapter, setScrollChapter } from '../actions';
import SingleReference from '../components/reference/single-reference';

const mapStateToProps = ( state, ownProps ) => {
	return {
		scrollChapter: state.scrollChapter
	}
};

const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		setScrollChapterNext: () => {
			dispatch( setScrollChapter( ownProps.book, ownProps.chapter ) );
		},
		setScrollChapterPrevious: () => {
			const currentChapter = bible.parseReference( ownProps.book + ' ' + ownProps.chapter );
			const prevChapter = currentChapter.prevChapter();
			dispatch( setScrollChapter( prevChapter.bookName, prevChapter.chapter1 ) );
		},
		addPreviousChapter: () => {
			dispatch( addPreviousChapter( ownProps.reference ) );
		},
		addNextChapter: () => {
			dispatch( addNextChapter( ownProps.reference ) );
		}
	}
};

const SingleReferenceContainer = connect(
 	mapStateToProps,
 	mapDispatchToProps
)( SingleReference )

export default SingleReferenceContainer;
