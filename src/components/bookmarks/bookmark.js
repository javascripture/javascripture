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
		const bookmarkText = bookmark.book + ' ' + bookmark.chapter + ':' + bookmark.verse;
		return (
			<li>
				<Link to={ createReferenceLink( bookmark ) } onClick={ this.props.showCrossReferences }>{ bookmarkText }</Link>
			 	<a onClick={ this.removeBookmark }><Cancel fill="#000000" /></a>
			</li>
		);
	}
}

export default withStyles( styles )( BookMark );
