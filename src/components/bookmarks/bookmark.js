// External dependencies
import { Link } from 'react-router-dom';
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';
import Cancel from '../svg/cancel';
import { createReferenceLink } from '../../lib/reference';

//The right way to do a link
class BookMark extends React.Component{
	removeBookmark = () => {
		this.props.removeBookmark( this.props.bookmark );
	};

	render() {
		const bookmark = this.props.bookmark;
		const bookmarkText = ( this.props.number + 1 ) + '. ' + bookmark.book + ' ' + bookmark.chapter + ':' + bookmark.verse;
		return (
			<div className={ styles.bookmark }>
				<Link to={ createReferenceLink( bookmark ) }>{ bookmarkText }</Link>
				<a onClick={ this.removeBookmark } className={ styles.cancel }><Cancel fill="#000000" /></a>
			</div>
		);
	}
}

export default withStyles( styles )( BookMark );
