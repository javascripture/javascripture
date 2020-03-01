// External dependencies
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Waypoint from 'react-waypoint';
import classnames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

// Internal
import { setScrollChapter } from '../../actions';
import Chapter from './chapter';
import styles from './styles.scss';
import deferComponentRender from '../deferComponentRender';

let oldHeight = 0, scroller = null, isScrolling = false;

const Reference = React.memo( ( props ) => {
	const [ references, setReferences ] = useState( {} );
	const referenceWindow = useRef();
	const inSync = useSelector( state => state.settings.inSync );
	const dispatch = useDispatch();

	useEffect( () => {
		setReferences( getReferences( props ) );
	}, [ props ] );

	useLayoutEffect( () => {
		console && console.log( new Date() - timer );

		if ( typeof ga !== 'undefined' ) {
			ga('send', {
				hitType: 'event',
				eventCategory: 'Reference',
				eventAction: 'change',
				eventLabel: new Date() - timer
			} );
		}
	}, [ references.book, references.chapter ] );

	useEffect( () => {
		if( references.loadingPrev ) {
			const newHeight = referenceWindow.current.scrollHeight;
			document.body.style.overflow = '';

			if ( referenceWindow.current.scrollTop === 0 ) {
				referenceWindow.current.scrollBy( 0, newHeight - oldHeight );
			}
		}
	} );

	const handleScroll = ( event ) => {
		const debouncedScroll = ( callback ) => {
			return setTimeout( callback, 250 );
		};

		if ( ! scroller ) {
			isScrolling = true;
		}
		clearTimeout( scroller );
		scroller = debouncedScroll( () => {
			isScrolling = false;

			if ( referenceWindow.current.scrollTop < 500 ) {
				addPreviousChapter();
			}

			if ( referenceWindow.current.scrollHeight - referenceWindow.current.scrollTop - document.documentElement.clientHeight < 1000 ) {
				addNextChapter();
			}
		} );
	};

	const handleWaypointEnter = ( event, book, chapter ) => {
		if ( event.previousPosition === 'above' ) {
			const currentChapter = bible.parseReference( book + ' ' + chapter );
			const prevChapter = currentChapter.prevChapter();
			if ( prevChapter ) {
				dispatch( setScrollChapter( prevChapter.bookName, prevChapter.chapter1, props.index ) );
			}
		}
	};

	const handleWaypointLeave = ( event, book, chapter ) => {
		if ( event.currentPosition === 'above' ) {
			dispatch( setScrollChapter( book, chapter, props.index ) );
		}
	};

	const addNextChapter = () => {
		var localReferences = references.references.slice(),
			lastReference = localReferences[ localReferences.length - 1 ],
			currentReference = bible.parseReference( lastReference.bookName + ' ' + lastReference.chapter1 );

		const nextChapter = currentReference.nextChapter(),
			nextChapterAlreadyLoaded = nextChapter && find( localReferences, function ( reference ) {
				return reference.bookID === nextChapter.bookID && reference.chapter1 === nextChapter.chapter1;
			} );
		if ( nextChapter && ! nextChapterAlreadyLoaded ) {
			localReferences.push( nextChapter );
		}

		setReferences( {
			book: references.book,
			chapter: references.chapter,
			references: localReferences,
			loadingPrev: false,
		} );
	};

	const addPreviousChapter = () => {
		document.body.style.overflow = 'hidden';

		var localReferences = references.references.slice(),
			firstReference = localReferences[ 0 ],
			currentReference = bible.parseReference( firstReference.bookName + ' ' + firstReference.chapter1 );

		const prevChapter = currentReference.prevChapter(),
			prevChapterAlreadyLoaded = prevChapter && find( localReferences, function ( reference ) {
				return reference.bookID === prevChapter.bookID && reference.chapter1 === prevChapter.chapter1;
			} );

		if ( prevChapter && ! prevChapterAlreadyLoaded ) {
			localReferences.unshift( prevChapter );
		}

		oldHeight = referenceWindow.current.scrollHeight;

		setReferences( {
			book: references.book,
			chapter: references.chapter,
			references: localReferences,
			loadingPrev: true,
		} );
	};

	const getReferences = ( nextProps ) => {
		if ( ! nextProps.reference || ! nextProps.reference.book ) {
			return null
		}

		const book = nextProps.reference.book,
			chapter = nextProps.reference.chapter,
			references = [],
			loadingPrev = false,
			prevChapterData = bible.parseReference( book + ' ' + chapter ).prevChapter(),
			nextChapterData = bible.parseReference( book + ' ' + chapter ).nextChapter();

		if ( prevChapterData ) {
			references.push( Object.assign( {}, prevChapterData ) );
		}
		references.push( Object.assign( {}, bible.parseReference( book + ' ' + chapter ) ) );

		if ( nextChapterData ) {
			references.push( Object.assign( {}, nextChapterData ) );
		}

		return { book, chapter, references, loadingPrev };
	};

	if ( ! references || ! references.book ) {
		return null;
	}

	const currentBook = references.book;
	const currentChapter = references.chapter;
	const classname = classnames( styles.reference, inSync ? null : styles.isNotSync );

	return (
		<div id={ 'referenceWindow' + props.index } className={ classname } key={ currentBook + '-' + currentChapter } ref={ referenceWindow } onScroll={ handleScroll }>
			{ references.references && references.references.map( ( reference ) => {
				const book = bible.getBook( reference.bookID );
				const chapter = reference.chapter1;

				return (
					<div className={ styles.referenceInner } key={ book + chapter }>
						<Waypoint
							onEnter={ ( event ) => handleWaypointEnter( event, book, chapter ) }
							onLeave={ ( event ) => handleWaypointLeave( event, book, chapter ) }
							topOffset={ 1 }
						/>
						<Chapter
							book={ book }
							chapter={ chapter }
							index={ props.index }
						/>
					</div>
				);
			} ) }
		</div>
	);
} );

export default deferComponentRender( withStyles( styles )( Reference ) );
