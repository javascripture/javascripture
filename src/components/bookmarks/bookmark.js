// External dependencies
import { useDispatch } from 'react-redux';
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import { removeBookmark } from '../../actions';
import styles from './styles.scss';
import Remove from '../svg/remove';
import ReferenceLink from '../reference-link';

//The right way to do a link
const BookMark = React.memo( ( { bookmark } ) => {
	const dispatch = useDispatch();
	const removeBookmarkAction = ( event ) => {
		event.stopPropagation();
		dispatch( removeBookmark( bookmark ) );
	};


	return (
		<div className={ styles.bookmark }>
			<ReferenceLink reference={ bookmark } />
			<a onClick={ ( event ) => removeBookmarkAction( event ) } className={ styles.cancel }>
				<Remove fill="#666" />
			</a>
		</div>
	);
} )

export default withStyles( styles )( BookMark );
