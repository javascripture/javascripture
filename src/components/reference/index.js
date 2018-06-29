// External dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Waypoint from 'react-waypoint';

// Internal
import SingleReference from '../../containers/single-reference';
import styles from './styles.scss';

let oldHeight = 0, scroller = null, isScrolling = false;

function documentHeight() {
	const body = document.body;
	return Math.max( body.scrollHeight, body.offsetHeight );
}

// If you make this a stateless component it breaks hot reloading
class Reference extends React.Component{
	componentWillMount() {
		this.setState( {
			references: this.getReferences(),
		} );

		window.addEventListener( 'scroll', this.handleScroll );
	}

	componentWillUnmount() {
		window.removeEventListener( 'scroll', this.handleScroll );
	}

	state = {
		references: {},
	};

	componentWillReceiveProps( nextProps ) {
		this.setState( {
			references: this.getReferences( nextProps ),
		} );
	}

	shouldComponentUpdate( nextProps, nextState ) {
		return ! isScrolling;
	}

	/*componentWillUpdate() {
		oldHeight = documentHeight();
	},*/

	componentDidUpdate( prevProps, prevState ) {
		// Only scroll if chapter or book changes
		const references = this.state.references;

		if ( ! references || ! prevProps ) {
			return;
		}

		const prevReference = prevProps.reference;
		if ( ! prevReference || prevReference.book !== references.book || prevReference.chapter !== references.chapter ) {
			// do nothing
		} else {
			if( this.state.references.loadingPrev ) {
				const newHeight = documentHeight();
				window.scrollBy( 0, newHeight - oldHeight );
				document.body.style.overflow = '';
			}
		}
	}

	handleScroll = ( event ) => {
		const debouncedScroll = ( callback ) => {
			return setTimeout( callback, 250 );
		};

		if ( ! scroller ) {
			isScrolling = true;
		}
		clearTimeout( scroller );
		scroller = debouncedScroll( () => {
			isScrolling = false;
			event.pageY;
			if ( event.pageY < 500 ) {
				this.addPreviousChapter();
			}

			if ( documentHeight() - event.pageY - document.documentElement.clientHeight < 1000 ) {
				this.addNextChapter();
			}
		} );
	};

	handleWaypointEnter( event, book, chapter ) {
		if ( event.previousPosition === 'above' ) {
			this.props.setScrollChapterPrevious( book, chapter );
		}
	}

	handleWaypointLeave( event, book, chapter ) {
		if ( event.currentPosition === 'above' ) {
			this.props.setScrollChapter( book, chapter );
		}
	}

	addNextChapter = () => {
		var references = this.state.references.references.slice(),
			lastReference = references[ references.length - 1 ],
			currentReference = bible.parseReference( lastReference.bookName + ' ' + lastReference.chapter1 );

		const nextChapter = currentReference.nextChapter(),
			nextChapterAlreadyLoaded = nextChapter && find( this.state.references.references, function ( reference ) {
				return reference.bookID === nextChapter.bookID && reference.chapter1 === nextChapter.chapter1;
			} );
		if ( nextChapter && ! nextChapterAlreadyLoaded ) {
			references.push( nextChapter );
		}

		this.setState( {
			references: {
				book: this.state.references.book,
				chapter: this.state.references.chapter,
				references,
				loadingPrev: false,
			},
		} );
	};

	addPreviousChapter = () => {
		document.body.style.overflow = 'hidden';

		var references = this.state.references.references.slice(),
			firstReference = references[ 0 ],
			currentReference = bible.parseReference( firstReference.bookName + ' ' + firstReference.chapter1 );

		const prevChapter = currentReference.prevChapter(),
			prevChapterAlreadyLoaded = prevChapter && find( this.state.references.references, function ( reference ) {
				return reference.bookID === prevChapter.bookID && reference.chapter1 === prevChapter.chapter1;
			} );

		if ( prevChapter && ! prevChapterAlreadyLoaded ) {
			references.unshift( prevChapter );
		}

		oldHeight = documentHeight();

		this.setState( {
			references: {
				book: this.state.references.book,
				chapter: this.state.references.chapter,
				references,
				loadingPrev: true,
			}
		} );
	};

	getReferences( nextProps ) {
		if ( ! nextProps ) {
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
	}

	render() {
		const references = this.state.references;

		if ( ! references || ! references.book ) {
			return null;
		}

		const currentBook = references.book,
			currentChapter = references.chapter,
			allReferences = references.references ? references.references : null;

		return (
			<div className={ styles.reference } key={ currentBook + '-' + currentChapter }>
				{ allReferences && allReferences.map( ( reference ) => {
					const book = bible.getBook( reference.bookID ),
						chapter = reference.chapter1;

					let ref = null;
					if ( reference.bookName === currentBook && reference.chapter1 === currentChapter ) {
						ref = 'current';
					}

					return (
						<div className={ styles.referenceInner } key={ book + chapter }>
							<Waypoint
								onEnter={ ( ( event ) => this.handleWaypointEnter( event, book, chapter ) ) }
								onLeave={ ( ( event ) => this.handleWaypointLeave( event, book, chapter ) ) }
							/>
							<SingleReference
								book={ book }
								chapter={ chapter }
								hash={ this.props.hash }
								reference={ reference }
								highlightWord={ this.props.highlightWord }
								ref={ ref } />
						</div>
					);
				} ) }
			</div>
		);
	}
}

export default withStyles( styles )( Reference );
