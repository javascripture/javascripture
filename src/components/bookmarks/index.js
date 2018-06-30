// External dependencies
import { Link } from 'react-router-dom';
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import Cancel from '../svg/cancel';
import styles from './styles.scss';
import { createReferenceLink } from '../../lib/reference';

//The right way to do a link
class BookMark extends React.Component{
	removeBookmark = () => {
		this.props.removeBookmark( this.props.bookmark );
	};

	render() {
		const bookmark = this.props.bookmark;
		const bookmarkText = bookmark.book + ' ' + bookmark.chapter + ':' + bookmark.verse;
		return (
			<li>
				<Link to={ createReferenceLink( bookmark ) }>{ bookmarkText }</Link>
			 	<a onClick={ this.removeBookmark }><Cancel fill="#000000" /></a>
			</li>
		);
	}
}

const BookMarks = ( { bookmarks, removeBookmark } ) => (
	<div className={ styles.bookmarks }>
		<h2 className={ styles.title }>Bookmarks</h2>
		<ol className={ styles.bookmarksList }>
			{ bookmarks.map( ( bookmark, key ) => {
				return <BookMark bookmark={ bookmark } removeBookmark={ removeBookmark } key={ key } />;
			} ) }
		</ol>
	</div>
)

export default withStyles( styles )( BookMarks );
