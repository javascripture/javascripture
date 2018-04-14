// External dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Waypoint from 'react-waypoint';

// Internal
import SingleReference from '../../containers/single-reference';
import styles from './styles.scss';

// If you make this a stateless component it breaks hot reloading
const Reference = React.createClass( {
	componentDidMount() {
		this.scrollToCurrentChapter();
	},

	shouldComponentUpdate(nextProps, nextState) {
		console.log( nextProps );
		console.log( this.props );
		return true;
	},

	componentDidUpdate( prevProps ) {
		// Only scroll if chapter or book changes
		const references = this.props.references;
		if ( prevProps.book !== references.book || prevProps.chapter !== references.chapter ) {
			this.scrollToCurrentChapter();
		}
	},

	scrollToCurrentChapter() {
		const currrentChapter = ReactDOM.findDOMNode( this.refs.current );
		if ( currrentChapter ) {
			currrentChapter.scrollIntoView();
			window.scrollBy( 0, 1 );
		}
	},

	render() {
		console.log('render index');
		const references = this.props.references;

		if ( ! references.book ) {
			return null;
		}

		const currentBook = references.book,
			currentChapter = references.chapter,
			threeReferences = references.references ? references.references : null;

		return (
			<div className={ styles.reference } key={ currentBook + '-' + currentChapter }>
				{ threeReferences && threeReferences.map( ( reference ) => {
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
