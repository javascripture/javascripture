// External dependencies
import { useDispatch } from 'react-redux';
import React from 'react';

// Internal dependencies
import { removeBookmark } from '../../actions';
import Remove from '../svg/remove';
import ReferenceLink from '../reference-link';
import CopyToClipboard from '../copy-to-clipboard';

const fill = "#fff";

//The right way to do a link
const BookMarkHeader = React.memo( ( { bookmark, textToCopy } ) => {
	const dispatch = useDispatch();
	const removeBookmarkAction = ( event ) => {
		event.stopPropagation();
		dispatch( removeBookmark( bookmark ) );
	};

	return (
		<div>
			<ReferenceLink reference={ bookmark } />
			<span>
				<CopyToClipboard fill={ fill } textToCopy={ textToCopy } />
				<a onClick={ ( event ) => removeBookmarkAction( event ) }>
					<Remove fill={ fill } />
				</a>
			</span>
		</div>
	);
} )

export default BookMarkHeader;
