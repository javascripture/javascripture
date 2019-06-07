// External dependencies
import { Link } from 'react-router-dom';
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';
import Cancel from '../svg/cancel';
import { createReferenceLink } from '../../lib/reference';
import ReferenceText from '../reference-text';

//The right way to do a link
class BookMark extends React.Component{
	removeBookmark = () => {
		this.props.removeBookmark( this.props.bookmark );
	};

	render() {
		const bookmark = this.props.bookmark;
		return (
			<div className={ styles.bookmark }>
				<Link to={ createReferenceLink( bookmark ) }>
					{ ( this.props.number + 1 ) }. <ReferenceText reference={ bookmark } />
				</Link>
				<a onClick={ this.removeBookmark } className={ styles.cancel }><Cancel fill="#000000" /></a>
			</div>
		);
	}
}

export default withStyles( styles )( BookMark );
