import { connect } from 'react-redux';
import { setSecondaryScrollChapter } from '../actions';
import Reference from '../components/reference';

const mapStateToProps = ( { secondaryReference }, ownProps ) => {
	return {
		reference: secondaryReference
	}
};

const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		setScrollChapter: ( book, chapter ) => {
			dispatch( setSecondaryScrollChapter( book, chapter ) );
		},
		setScrollChapterPrevious: ( book, chapter ) => {
			const currentChapter = bible.parseReference( book + ' ' + chapter );
			const prevChapter = currentChapter.prevChapter();
			if ( prevChapter ) {
				dispatch( setSecondaryScrollChapter( prevChapter.bookName, prevChapter.chapter1 ) );
			}
		},
	}
};

const SecondaryReferenceContainer = connect(
 	mapStateToProps,
 	mapDispatchToProps
)( Reference )

export default SecondaryReferenceContainer;
