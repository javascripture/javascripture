// External
import React from 'react';
import { connect } from 'react-redux';
import { makeStyles, useTheme, styled } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles( theme => ({
	formControl: {
		margin: 0,
		minWidth: 120,
		maxWidth: 300,
		zIndex: -1,
	},
	chips: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	chip: {
		margin: 2,
	},
	noLabel: {
		marginTop: theme.spacing(3),
	},
} ) );

const StyledFormControl = styled( FormControl )( {
	left: '34px',
	position: 'absolute',
	top: 0,
} );

const StyledSelect = styled( Select )( {
	background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
	border: 0,
	color: 'white',
	padding: '0',
	position: 'absolute',
	top: 0,
	left: 0,
} );

// Internal
import BookSVG from '../svg/book.js';
import { createReferenceLink } from '../../lib/reference.js';
import { closeReferenceSelectorMobile, toggleReferenceSelectorMobile, referenceSelectorMobileSetBook, setReference, setScrollChapter } from '../../actions'
import styles from './style.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';


function ReferenceSelectorSimple( props ) {
	const classes = useStyles();
	const theme = useTheme();
	const [ open, setOpen ] = React.useState( false );
	const [ bookName, setBookName ] = React.useState( false );

	const handleChange = event => {
		setBookName(event.target.value);
		console.log( event.target.value );
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleOpen = () => {
		setOpen(true);
	};


	const toggleList = ( event ) => {
		props.toggleReferenceSelectorMobile( props.index );
	};

	const openBook = ( bookName, bookIndex ) => {
		props.referenceSelectorMobileSetBook( bookName, bookIndex, props.index );
	};

	const close = () => {
		props.closeReferenceSelectorMobile( props.index );
	};

	const goToReference = ( reference ) => {
		close();
		if ( props.index === 0 || props.inSync ) {
			window.location.hash = createReferenceLink( reference );
		} else {
			props.setReference( reference, props.index );
		}
	};

	const renderReferenceLink = ( book, chapter, linkText ) => {
		return (
			<option
				className={ styles.referenceLink }
				key={ book + chapter }
				onClick={ goToReference.bind( this, {
					book: book,
					chapter: chapter,
					verse: 1
				} ) }
			>
				{ linkText }
			</option>
		);
	};

	const renderChapters = () => {
		const chapters = bible.Data.verses[ props.bookIndex ];
		return (
			<StyledSelect
				value={ props.bookName }
				inputProps={{
					id: 'select-multiple-native',
				}}
				open={open}
				onClose={handleClose}
				onOpen={handleOpen}
				onChange={handleChange}
			>
				{ chapters.map( ( numberOfVerses, chapterNumber ) => {
					return renderReferenceLink( props.bookName, chapterNumber + 1, bible.getTranslatedBookName( props.bookName, props.version ) + ' ' + ( chapterNumber + 1 ) );
				} ) }
			</StyledSelect>
		);
	};

	const renderBooks = () => {
		return (
			<StyledSelect
				value={ props.bookName}
				inputProps={{
					id: 'select-multiple-native',
				}}
				open={open}
				onClose={handleClose}
				onOpen={handleOpen}
				onChange={handleChange}
			>
				{ bible.Data.books.map( ( book, index ) => renderBookLink( book[ 0 ], index ) ) }
			</StyledSelect>
		);
	};

	const renderBookLink = ( book, index ) => {
		const chapters = bible.Data.verses[ index ];
		const tranlatedBook = bible.getTranslatedBookName( book, props.version );
		let bookLink = null;

		bookLink = <option key={ index } onClick={ () => openBook( book, index ) }> { tranlatedBook }</option>;
		if ( chapters.length === 1 ) {
			bookLink = renderReferenceLink( book, 1, tranlatedBook );
		}

		return bookLink;
	};

	return (
		<div className={ styles.chapterSelector }>
			<button type="button" className={ props.open ? styles.openButton : styles.button } onClick={ handleOpen }><BookSVG /></button>
			<StyledFormControl className={classes.formControl}>
				{ props.bookName ? renderChapters() : renderBooks() }
			</StyledFormControl>
		</div>
	);
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
)( withStyles( styles )( ReferenceSelectorSimple ) );
