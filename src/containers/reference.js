import { connect } from 'react-redux';
import { setScrollChapter } from '../actions';
import Reference from '../components/reference';

const mapStateToProps = ( { reference }, ownProps ) => {
	return {
		reference: reference
	}
};

const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		setScrollChapter: ( book, chapter ) => {
			dispatch( setScrollChapter( book, chapter ) );
		},
		setScrollChapterPrevious: ( book, chapter ) => {
			const currentChapter = bible.parseReference( book + ' ' + chapter );
			const prevChapter = currentChapter.prevChapter();
			if ( prevChapter ) {
				dispatch( setScrollChapter( prevChapter.bookName, prevChapter.chapter1 ) );
			}
		},
	}
};

const ReferenceContainer = connect(
 	mapStateToProps,
 	mapDispatchToProps
)( Reference )

export default ReferenceContainer;
