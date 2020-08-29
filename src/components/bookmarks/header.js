// External dependencies
import { useDispatch } from 'react-redux';
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import { removeBookmark } from '../../actions';
import styles from './styles.scss';
import Remove from '../svg/remove';
import ReferenceLink from '../reference-link';
import CopyToClipboard from '../copy-to-clipboard';

const fill = "#666";

//The right way to do a link
const BookMark = React.memo( ( { bookmark, textToCopy } ) => {
	const dispatch = useDispatch();
	const removeBookmarkAction = ( event ) => {
		event.stopPropagation();
		dispatch( removeBookmark( bookmark ) );
	};

	return (
		<div className={ styles.bookmark }>
			<ReferenceLink reference={ bookmark } />
			<span className={ styles.icon }>
				<CopyToClipboard fill={ fill } textToCopy={ textToCopy } />
				<a onClick={ ( event ) => removeBookmarkAction( event ) }>
					<Remove fill={ fill } />
				</a>
			</span>
		</div>
	);
} )

export default withStyles( styles )( BookMark );
