// External
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Internal
import BookSVG from '../svg/book.js';
import { createReferenceLink } from '../../lib/reference.js';
import { closeReferenceSelectorMobile, toggleReferenceSelectorMobile, referenceSelectorMobileSetBook, setReference, setScrollChapter } from '../../actions'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import styles from './style.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

const ReferenceSelectorMobile = React.memo( ( { index, version } ) => {
	const dispatch = useDispatch();
	const inSync = useSelector( state => state.settings.inSync );
	const references = useSelector( state => state.references );
	const open = useSelector( state => state.referenceSelectorMobile[ index ].open );
	const bookIndex = useSelector( state => state.referenceSelectorMobile[ index ].bookIndex );
	const bookName = useSelector( state => state.referenceSelectorMobile[ index ].bookName );

	const toggleList = () => {
		console.log('here');
		dispatch( toggleReferenceSelectorMobile( index ) );
	};

	const openBook = ( bookName, bookIndex ) => {
		dispatch( referenceSelectorMobileSetBook( bookName, bookIndex, index ) );
	};

	const close = () => {
		dispatch( closeReferenceSelectorMobile( index ) );
	};

	const goToReference = ( reference ) => {
		close();
		if ( index === 0 || inSync ) {
			window.location.hash = createReferenceLink( reference );
		} else {
			dispatch( setReference( reference, index ) );
			dispatch( setScrollChapter( reference.book, reference.chapter, index ) );
		}
	};

	const backToBooks = ( event ) => {
		event.preventDefault();
		toggleList()
		toggleList();
	};

	const renderReferenceLink = ( book, chapter, linkText ) => {
		return (
			<a
				className={ styles.referenceLink }
				key={ book + chapter }
				onClick={ () => goToReference( {
					book: book,
					chapter: chapter,
					verse: 1
				} ) }
			>
				{ linkText }
			</a>
		);
	};

	const renderChapterList = () => {
		const chapters = bible.Data.verses[ bookIndex ];
		return (
			<div className={ styles.chapterList }>
				<a className={ styles.back } onClick={ ( event ) => backToBooks( event ) }>
					<ArrowBackIcon />
				</a>
				<div className={ styles.chapterName }>
					{ bible.getTranslatedBookName( bookName, version ) }
				</div>
				<div className={ styles.chapterBlocks }>
					{ chapters.map( ( numberOfVerses, chapterNumber ) => {
						return renderReferenceLink( bookName, chapterNumber + 1, chapterNumber + 1 );
					} ) }
				</div>
			</div>
		);
	};

	const renderBookList = () => {
		return (
			<div className={ styles.bookList }>
				<div className={ styles.bookColumn }>
					<strong>Old</strong>
					{ bible.Data.books.slice( 0, 39 ).map( ( book, index ) => {
						return renderBookLink( book[ 0 ], index );
					} ) }
				</div>
				<div className={ styles.bookColumn }>
					<strong>New</strong>
					{ bible.Data.books.slice( 39, 66 ).map( ( book, index ) => {
						return renderBookLink( book[ 0 ], index + 39 );
					} ) }
				</div>
			</div>
		);
	};

	const renderBookLink = ( book, index ) => {
		const chapters = bible.Data.verses[ index ];
		const tranlatedBook = bible.getTranslatedBookName( book, version );
		let bookLink = null;

		bookLink = <div onClick={ () => openBook( book, index ) }> { tranlatedBook }</div>;
		if ( chapters.length === 1 ) {
			bookLink = renderReferenceLink( book, 1, tranlatedBook );
		}

		return (
			<div key={ index } className={ styles.bookLink }>
				{ bookLink }
			</div>
		);
	};

	return (
		<span className={ styles.referenceSelectorMobile }>
			<button type="button" className={ open ? styles.openButton : styles.button } onClick={ ( event ) => toggleList( event ) }><BookSVG /></button>
			{ open && <div className={ styles.chapterSelector }>
				{ ! bookName && renderBookList() }
				{ bookName && renderChapterList() }
			</div> }
		</span>
	);
} );

export default withStyles( styles )( ReferenceSelectorMobile );
