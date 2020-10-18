// External dependencies
import React from 'react';

// Internal dependencies
import RemoveSvg from '../svg/remove.js';
import CopyToClipboard from '../copy-to-clipboard';

const fill = '#fff';

const WordBlockHeader = React.memo( ( { children, className, textToCopy, onRemove } ) => {
	return (
		<div className={ className }>
				{ children }
				<span>
					{ textToCopy && <CopyToClipboard fill={ fill } textToCopy={ textToCopy } /> }
					{ onRemove && (
						<a onClick={ ( event ) => {
							event.stopPropagation();
							onRemove();
						} }>
							<RemoveSvg fill={ fill } />
						</a>
					) }
				</span>
		</div>
	);
} );

export default WordBlockHeader;
