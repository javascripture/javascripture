import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import ReferenceInput from '../components/reference-input';

const mapStateToProps = ( state, ownProps ) => {
	if ( state.scrollChapter.book ) {
		return {
			book: state.scrollChapter.book,
			chapter: state.scrollChapter.chapter
		};
	}

	return {};
};

const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		goToReference: ( reference ) => {
			const referenceObj = bible.parseReference( reference );
			if( referenceObj.bookID > 0 ) {
				hashHistory.push( '/' + referenceObj.getBook() + '/' + referenceObj.chapter + '/' );
			} else {
				alert( 'No such reference' );
			}
		}
	}
};

const ReferenceInputContainer = connect(
 	mapStateToProps,
 	mapDispatchToProps
)( ReferenceInput )

export default ReferenceInputContainer;
