// External dependencies
import React, { useRef, useState, useEffect } from 'react';
import mousetrap from 'mousetrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { useDispatch, useSelector } from 'react-redux';

// Internal dependencies
import { closeReferenceSelectorMobile, toggleReferenceSelectorMobile, referenceSelectorMobileSetBook, setReference, setScrollChapter } from '../../actions';
import { createReferenceLink } from '../../lib/reference.js';

// Internal dependencies
import styles from './styles.scss';

const getBookFromState = ( reference, scrollChapter ) => {
	if ( scrollChapter && scrollChapter.book ) {
		return scrollChapter.book;
	} else {
		if ( reference ) {
			return reference.book;
		}
	}
}
const getReferenceValue = ( reference, scrollChapter, version ) => {
	const chapter = ( scrollChapter && scrollChapter.chapter ) ? scrollChapter.chapter : reference.chapter;
	const book = getBookFromState( reference, scrollChapter );
	const tranlatedBook = bible.getTranslatedBookName( book, version );
	return tranlatedBook + ' ' + chapter;
};

const ReferenceInput = React.memo( ( { index, last } ) => {
	const dispatch = useDispatch();
	const inSync = useSelector( ( state ) => state.settings.inSync );
	const localIndex = inSync ? 0 : index;
	const reference = useSelector( ( state ) => state.reference );
	const scrollChapter = useSelector( ( state ) => state.scrollChapter[ localIndex ] );
	const version = reference[ index ].version;
	const referenceValue = getReferenceValue( reference[ localIndex ], scrollChapter, version );
	const [ localReference, setLocalReference ] = useState( referenceValue );
	const referenceInputField = useRef();

	const change = ( event ) => {
		setLocalReference( event.target.value )
	};

	const goToReferenceField = ( event ) => {
		event.preventDefault();
		referenceInputField.current.focus();
		referenceInputField.current.selectionStart = referenceInputField.current.selectionEnd = 0;
		setLocalReference( event.key );
	}

	const goToReference = ( event ) => {
		event.preventDefault();
		const reference = bible.parseReference( localReference );
		reference.book = bible.Data.books[reference.bookID - 1][0];
		if ( index === 0 || inSync ) {
			window.location.hash = createReferenceLink( reference );
		} else {
			dispatch( setReference( reference, index ) );
			dispatch( setScrollChapter( reference.book, reference.chapter, index ) );
		}
		referenceInputField.current.blur();
	};

	useEffect( () => {
		console.log( referenceValue );
		setLocalReference( referenceValue );
	}, [ reference, scrollChapter, inSync ] );

	useEffect( () => {
		if ( index === 0 ) {
			mousetrap.bind( [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' ], goToReferenceField );
		}
		if ( index === 1 ) {
			mousetrap.bind( [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' ], goToReferenceField );
		}
	} );

	const focusAndBlur = () => {
		//dispatch( toggleReferenceSelectorMobile( index ) );
	};

	return (
		<div className={ styles.versionSelectorFlexible }>
			<form onSubmit={ goToReference } className={ styles.versionSelectorInput} >
				<input type="text" id="goToReference" name="reference" placeholder="Go to reference" className={ styles.input } value={ localReference } onChange={ change } ref={ referenceInputField } onFocus={ focusAndBlur } onBlur={ focusAndBlur } />
			</form>
		</div>
	);
} );

export default withStyles( styles )( ReferenceInput );
