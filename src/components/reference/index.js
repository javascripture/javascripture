// External dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Waypoint from 'react-waypoint';
import classnames from 'classnames';
import { connect } from 'react-redux';

// Internal
import { setScrollChapter } from '../../actions';
import SingleReference from './single-reference';
import styles from './styles.scss';

let oldHeight = 0, scroller = null, isScrolling = false;

// If you make this a stateless component it breaks hot reloading
class Reference extends React.Component{
	componentWillMount() {
		this.setState( {
			references: this.getReferences( this.props ),
		} );
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

	componentDidUpdate( prevProps, prevState ) {
		if ( typeof ga !== 'undefined' ) {
			ga('send', {
				hitType: 'event',
				eventCategory: 'Reference',
				eventAction: 'change',
				eventLabel: new Date() - timer
			} );
		}

		if ( console ) {
			console.log( new Date() - timer );
		}

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
				const newHeight = this.reference.scrollHeight;
				document.body.style.overflow = '';
				var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
				if ( ! isChrome || ( isChrome && this.reference.scrollTop === 0 ) ) {
					this.reference.scrollBy( 0, newHeight - oldHeight );
				}
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
			if ( this.reference.scrollTop < 500 ) {
				this.addPreviousChapter();
			}

			if ( this.reference.scrollHeight - this.reference.scrollTop - document.documentElement.clientHeight < 1000 ) {
				this.addNextChapter();
			}
		} );
	};

	handleWaypointEnter( event, book, chapter ) {
		if ( event.previousPosition === 'above' ) {
			this.props.setScrollChapterPrevious( book, chapter, this.props.index );
		}
	}

	handleWaypointLeave( event, book, chapter ) {
		if ( event.currentPosition === 'above' ) {
			this.props.setScrollChapter( book, chapter, this.props.index );
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

		oldHeight = this.reference.scrollHeight;

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
	}

	render() {
		const references = this.state.references;

		if ( ! references || ! references.book ) {
			return null;
		}

		const currentBook = references.book,
			currentChapter = references.chapter,
			classname = classnames( styles.reference, this.props.inSync ? null : styles.isNotSync );

		return (
			<div id={ 'referenceWindow' + this.props.index } className={ classname } key={ currentBook + '-' + currentChapter } ref={ (ref) => this.reference = ref } onScroll={ this.handleScroll }>
				{ references.references && references.references.map( ( reference ) => {
					const book = bible.getBook( reference.bookID ),
						chapter = reference.chapter1;

					return (
						<div className={ styles.referenceInner } key={ book + chapter }>
							<Waypoint
								onEnter={ ( ( event ) => this.handleWaypointEnter( event, book, chapter ) ) }
								onLeave={ ( ( event ) => this.handleWaypointLeave( event, book, chapter ) ) }
								topOffset={ 1 }
							/>
							<SingleReference
								book={ book }
								chapter={ chapter }
								index={ this.props.index }
							/>
						</div>
					);
				} ) }
			</div>
		);
	}
}

const mapStateToProps = ( state, ownProps ) => {
	return {
		inSync: state.settings.inSync,
	}
};

const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		setScrollChapter: ( book, chapter, index ) => {
			dispatch( setScrollChapter( book, chapter, index ) );
		},
		setScrollChapterPrevious: ( book, chapter, index ) => {
			const currentChapter = bible.parseReference( book + ' ' + chapter );
			const prevChapter = currentChapter.prevChapter();
			if ( prevChapter ) {
				dispatch( setScrollChapter( prevChapter.bookName, prevChapter.chapter1, index ) );
			}
		},
	}
};

const ReferenceContainer = connect(
 	mapStateToProps,
 	mapDispatchToProps
)( Reference )

export default withStyles( styles )( ReferenceContainer );
