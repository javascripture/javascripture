// External dependencies
import { Link } from 'react-router';
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import Cancel from '../svg/cancel';
import styles from './styles.scss';

//The right way to do a link <Link to={ '/#/' + bookmark.book + '/' + bookmark.chapter + '/' + bookmark.verse }>{ bookmark.book + ' ' + bookmark.chapter + ':' + bookmark.verse }</Link>
const BookMark = React.createClass( {
	removeBookmark() {
		this.props.removeBookmark( this.props.bookmark );
	},

	render() {
		const bookmark = this.props.bookmark;
		return (
			<li>
			 	<a href={ '/#/' + bookmark.book + '/' + bookmark.chapter + '/' + bookmark.verse }>{ bookmark.book + ' ' + bookmark.chapter + ':' + bookmark.verse }</a>
			 	<a onClick={ this.removeBookmark }><Cancel fill="#000000" /></a>
			</li>
		);
	}
} );

const BookMarks =  ( { bookmarks, removeBookmark } ) => (
	<ol className={ styles.bookmarks }>
		{ bookmarks.map( ( bookmark, key ) => {
			return <BookMark bookmark={ bookmark } removeBookmark={ removeBookmark } key={ key } />;
		} ) }
	</ol>
)

export default withStyles( styles )( BookMarks );
