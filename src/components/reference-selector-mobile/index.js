// External
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// Internal
import BookSVG from '../svg/book.js';
import { createReferenceLink } from '../../lib/reference.js';
import { closeReferenceSelectorMobile, toggleReferenceSelectorMobile, referenceSelectorMobileSetBook, setReference, setScrollChapter } from '../../actions'
import styles from './style.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';


class ReferenceSelectorMobile extends React.Component{
	toggleList = ( event ) => {
		this.props.toggleReferenceSelectorMobile( this.props.index );
	};

	openBook = ( bookName, bookIndex ) => {
		this.props.referenceSelectorMobileSetBook( bookName, bookIndex, this.props.index );
	};

	close = () => {
		this.props.closeReferenceSelectorMobile( this.props.index );
	};

	goToReference = ( reference ) => {
		this.close();
		if ( this.props.index === 0 || this.props.inSync ) {
			window.location.hash = createReferenceLink( reference );
		} else {
			this.props.setReference( reference, this.props.index );
		}
	};

	renderReferenceLink( book, chapter, linkText ) {
		return (
			<a
				className={ styles.referenceLink }
				key={ book + chapter }
				onClick={ this.goToReference.bind( this, {
					book: book,
					chapter: chapter,
					verse: 1
				} ) }
			>
				{ linkText }
			</a>
		);
	}

	renderChapterList() {
		const chapters = bible.Data.verses[ this.props.bookIndex ];
		return (
			<div className={ styles.chapterList }>
				<div className={ styles.chapterName }>
					{ bible.getTranslatedBookName( this.props.bookName, this.props.version ) }
				</div>
				<div className={ styles.chapterBlocks }>
					{ chapters.map( ( numberOfVerses, chapterNumber ) => {
						return this.renderReferenceLink( this.props.bookName, chapterNumber + 1, chapterNumber + 1 );
					} ) }
				</div>
			</div>
		);
	}

	renderBookList() {
		return (
			<div className={ styles.bookList }>
				<div className={ styles.bookColumn }>
					{ bible.Data.books.slice( 0, 22 ).map( ( book, index ) => {
						return this.renderBookLink( book[ 0 ], index );
					} ) }
				</div>
				<div className={ styles.bookColumn }>
					{ bible.Data.books.slice( 22, 44 ).map( ( book, index ) => {
						return this.renderBookLink( book[ 0 ], index + 22 );
					} ) }
				</div>
				<div className={ styles.bookColumn }>
					{ bible.Data.books.slice( 44, 66 ).map( ( book, index ) => {
						return this.renderBookLink( book[ 0 ], index + 44 );
					} ) }
				</div>
			</div>
		);
	}

	renderBookLink( book, index ) {
		const chapters = bible.Data.verses[ index ];
		const tranlatedBook = bible.getTranslatedBookName( book, this.props.version );
		let bookLink = null;

		bookLink = <div onClick={ () => this.openBook( book, index ) }> { tranlatedBook }</div>;
		if ( chapters.length === 1 ) {
			bookLink = this.renderReferenceLink( book, 1, tranlatedBook );
		}

		return (
			<div key={ index } className={ styles.bookLink }>
				{ bookLink }
			</div>
		);
	}

	render() {
		return (
			<span className={ styles.referenceSelectorMobile }>
				<button type="button" className={ this.props.open ? styles.openButton : styles.button } onClick={ this.toggleList }><BookSVG /></button>
				{ this.props.open && <div className={ styles.chapterSelector }>
					{ ! this.props.bookName && this.renderBookList() }
					{ this.props.bookName && this.renderChapterList() }
				</div> }
			</span>
		);
	}
}

const mapStateToProps = ( { reference, settings, referenceSelectorMobile }, ownProps ) => {
	return {
		inSync: settings.inSync,
		references: reference,
		open: referenceSelectorMobile[ ownProps.index ].open,
		bookIndex: referenceSelectorMobile[ ownProps.index ].bookIndex,
		bookName: referenceSelectorMobile[ ownProps.index ].bookName,
	};
};

const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		setReference: ( reference, index ) => {
			dispatch( setReference( reference, index ) );
			dispatch( setScrollChapter( reference.book, reference.chapter, index ) );
		},
		closeReferenceSelectorMobile: ( index ) => {
			dispatch( closeReferenceSelectorMobile( index ) );
		},
		toggleReferenceSelectorMobile: ( index ) => {
			dispatch( toggleReferenceSelectorMobile( index ) );
		},
		referenceSelectorMobileSetBook: ( bookName, bookIndex, index ) => {
			dispatch( referenceSelectorMobileSetBook( bookName, bookIndex, index ) );
		},
	}
};


export default connect(
	mapStateToProps,
	mapDispatchToProps,
)( withStyles( styles )( ReferenceSelectorMobile ) );

