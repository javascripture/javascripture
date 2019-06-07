// External
import { connect } from 'react-redux';

const ReferenceText = ( { reference, interfaceLanguage } ) => {
	return bible.getTranslatedBookNameByLanguage( reference.book, interfaceLanguage ) + ' ' + reference.chapter + ':' + reference.verse;
};

const mapStateToProps = ( state, ownProps ) => {
	return {
		interfaceLanguage: state.settings.interfaceLanguage,
	};
};

export default connect(
	mapStateToProps,
)( ReferenceText )
