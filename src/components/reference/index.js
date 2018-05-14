// External dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Waypoint from 'react-waypoint';

// Internal
import SingleReference from '../../containers/single-reference';
import styles from './styles.scss';

let oldHeight = 0;

function documentHeight() {
	const body = document.body;
	return Math.max( body.scrollHeight, body.offsetHeight );
}

// If you make this a stateless component it breaks hot reloading
const Reference = React.createClass( {
	componentDidMount() {
		this.scrollToCurrentChapter();
	},

	componentWillUpdate() {
		oldHeight = documentHeight();
	},

	componentDidUpdate( prevProps ) {
		// Only scroll if chapter or book changes
		const references = this.props.references;
		const prevReferences = prevProps.references;
		if ( prevReferences.book !== references.book || prevReferences.chapter !== references.chapter ) {
			this.scrollToCurrentChapter();
		} else {
			if( this.props.references.loadingPrev ) {
				const newHeight = documentHeight();
				window.scrollBy( 0, newHeight - oldHeight );
			}
		}
	},

	scrollToCurrentChapter() {
		console.log( 'scrollToCurrentChapter' );
		const currrentChapter = ReactDOM.findDOMNode( this.refs.current );
		if ( currrentChapter ) {
			currrentChapter.scrollIntoView();
			window.scrollBy( 0, 1 );
		}
	},

	render() {
		const references = this.props.references;

		if ( ! references.book ) {
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
						<SingleReference
							key={ book + chapter }
							book={ book }
							chapter={ chapter }
							reference={ reference }
							highlightWord={ this.props.highlightWord }
							ref={ ref } />
					);
				} ) }
			</div>
		);
	}
} );

export default withStyles( styles )( Reference );
