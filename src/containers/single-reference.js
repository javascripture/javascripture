import { connect } from 'react-redux';
import { addNextChapter, addPreviousChapter, setScrollChapter } from '../actions';
import SingleReference from '../components/reference/single-reference';

function documentHeight() {
	const body = document.body;
	return Math.max( body.scrollHeight, body.offsetHeight );
}

const mapStateToProps = ( state, ownProps ) => {
	return {
		scrollChapter: state.scrollChapter
	}
};

const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		setScrollChapterNext: () => {
			dispatch( addNextChapter( ownProps.reference ) );
			dispatch( setScrollChapter( ownProps.book, ownProps.chapter ) );
		},
		setScrollChapterPrevious: () => {
			const oldHeight = documentHeight();
			dispatch( addPreviousChapter( ownProps.reference ) );
			const newHeight = documentHeight();
			window.scrollBy( 0, newHeight - oldHeight );
			const currentChapter = bible.parseReference( ownProps.book + ' ' + ownProps.chapter );
			const prevChapter = currentChapter.prevChapter();
			dispatch( setScrollChapter( prevChapter.bookName, prevChapter.chapter1 ) );
		}
	}
};

const SingleReferenceContainer = connect(
 	mapStateToProps,
 	mapDispatchToProps
)( SingleReference )

export default SingleReferenceContainer;
