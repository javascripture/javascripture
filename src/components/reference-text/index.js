// External
import { useSelector } from 'react-redux';

const ReferenceText = ( { reference } ) => {
	const interfaceLanguage = useSelector( state => state.settings.interfaceLanguage );
	let text = bible.getTranslatedBookName( reference.book, interfaceLanguage );
	if ( reference.chapter ) {
		text +=  ' ' + reference.chapter;
	}

	if ( reference.verse ) {
		text += ':' + reference.verse;
	}
	return text;
};


export default ReferenceText;
