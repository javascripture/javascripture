// External
import { connect } from 'react-redux';

const ReferenceText = ( { reference, interfaceLanguage } ) => {
	let text = bible.getTranslatedBookNameByLanguage( reference.book, interfaceLanguage );
	if ( reference.chapter ) {
		text +=  ' ' + reference.chapter;
	}

	if ( reference.verse ) {
		text += ':' + reference.verse;
	}
	return text;
};

const mapStateToProps = ( state, ownProps ) => {
	return {
		interfaceLanguage: state.settings.interfaceLanguage,
	};
};

export default connect(
	mapStateToProps,
)( ReferenceText )
