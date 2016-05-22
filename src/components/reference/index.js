// External dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Waypoint from 'react-waypoint';

// Internal
import SingleReference from '../../containers/single-reference';
import ReferenceInput from '../../containers/reference-input';
import styles from './styles.scss';

// If you make this a stateless component it breaks hot reloading
const Reference = React.createClass( {
	componentDidMount() {
		this.scrollToCurrentChapter();
	},

	componentDidUpdate( prevProps ) {
		// Only scroll if chapter or book changes
		if ( prevProps.book !== this.props.book || prevProps.chapter !== this.props.chapter ) {
			this.scrollToCurrentChapter();
		}
	},

	scrollToCurrentChapter() {
		// ReactDOM.findDOMNode( this.refs.current ).scrollIntoView();
		// window.scrollBy( 0, 10 );
	},

	render() {
		//if ( ! this.props.book ) {
			return null;
		//}

		const book = this.props.book,
			chapter = this.props.chapter,
			references = this.props.references;

		return (
			<div className={ styles.reference }>
				<ReferenceInput book={ book } chapter={ chapter } renderFromScroll={ false } />
				{ references.map( ( reference ) => {
					const book = reference.getBook(),
						chapter = reference.chapter,
						previousReference = bible.getPrevChapter( reference.bookID, reference.chapter ).toObject();

					let ref = null;
					if ( this.props.book === book && this.props.chapter === chapter ) {
						ref = 'current';
					}

					return (
						<SingleReference
							key={ book + chapter }
							book={ book }
							chapter={ chapter }
							previousBook={ previousReference.book }
							previousChapter={ previousReference.chapter }
							reference={ reference }
							ref={ ref } />
					);
				} ) }
			</div>
		);
	}
} );

export default withStyles( styles )( Reference );
