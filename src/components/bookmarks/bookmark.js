// External dependencies
import { Link } from 'react-router-dom';
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';
import Cancel from '../svg/cancel';
import { createReferenceLink } from '../../lib/reference';
import ReferenceLink from '../reference-link';

//The right way to do a link
class BookMark extends React.Component{
	removeBookmark = () => {
		this.props.removeBookmark( this.props.bookmark );
	};

	render() {
		const bookmark = this.props.bookmark;
		return (
			<div className={ styles.bookmark }>
				<ReferenceLink reference={ bookmark } number={ this.props.number } />
				<a onClick={ this.removeBookmark } className={ styles.cancel }><Cancel fill="#000000" /></a>
			</div>
		);
	}
}

export default withStyles( styles )( BookMark );
