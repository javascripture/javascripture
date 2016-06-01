// External dependencies
import { Link } from 'react-router';
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';

//The right way to do a link <Link to={ '/#/' + bookmark.book + '/' + bookmark.chapter + '/' + bookmark.verse }>{ bookmark.book + ' ' + bookmark.chapter + ':' + bookmark.verse }</Link>

const BookMarks =  ( { bookmarks } ) => (
	<ol className={ styles.bookmarks }>
		{ bookmarks.map( bookmark => {
			return (
				<li>
				 	<a href={ '/#/' + bookmark.book + '/' + bookmark.chapter + '/' + bookmark.verse }>{ bookmark.book + ' ' + bookmark.chapter + ':' + bookmark.verse }</a>
				</li>
			);
		} ) }
	</ol>
)

export default withStyles( styles )( BookMarks );
