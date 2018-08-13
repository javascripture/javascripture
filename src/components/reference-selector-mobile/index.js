// External
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// Internal
import BookSVG from '../svg/book.js';
import { createReferenceLink } from '../../lib/reference.js';
import { setReference, setScrollChapter } from '../../actions'
import styles from './style.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

const initialState = {
	open: false,
	bookIndex: null,
	bookName: null,
};

class ReferenceSelectorMobile extends React.Component{
	state = initialState;

	toggleList = () => {
		this.setState( {
			open: ! this.state.open,
			bookIndex: null,
			bookName: null,
		} );
	};

	openBook = ( book, index ) => {
		this.setState( {
			bookName: book,
			bookIndex: index,
		} );
	};

	close = () => {
		this.setState( initialState );
	};

	goToReference = ( reference ) => {
		this.close();
		if ( this.props.index === 0 ) {
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
		const chapters = bible.Data.verses[ this.state.bookIndex ];
		return (
			<div className={ styles.chapterList }>
				<div className={ styles.chapterName }>{ this.state.bookName }</div>
				<div className={ styles.chapterBlocks }>
					{ chapters.map( ( numberOfVerses, chapterNumber ) => {
						return this.renderReferenceLink( this.state.bookName, chapterNumber + 1, chapterNumber + 1 );
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
		let bookLink = null;

		bookLink = <div onClick={ () => this.openBook( book, index ) }> { book }</div>;
		if ( chapters.length === 1 ) {
			bookLink = this.renderReferenceLink( book, 1, book );
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
				<button className={ this.state.open ? styles.openButton : styles.button } onClick={ this.toggleList }><BookSVG /></button>
				{ this.state.open && <div className={ styles.chapterSelector }>
					{ ! this.state.bookName && this.renderBookList() }
					{ this.state.bookName && this.renderChapterList() }
				</div> }
			</span>
		);
	}
}

const mapStateToProps = ( { reference, settings }, ownProps ) => {
	return {
		inSync: settings.inSync,
		references: reference,
	};
};

const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		setReference: ( reference, index ) => {
			dispatch( setReference( reference, index ) );
			dispatch( setScrollChapter( reference.book, reference.chapter, index ) );
		},
	}
};


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)( withStyles( styles )( ReferenceSelectorMobile ) );

