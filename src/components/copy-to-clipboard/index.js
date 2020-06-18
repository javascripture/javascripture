// External dependencies
import React from 'react';

// Internal dependencies
import CopySvg from '../svg/copy.js';

const copyToClipboardHelper = ( event, textToCopy ) => {
	if ( textToCopy.current ) {
		textToCopy = textToCopy.current.innerText;
	}

	event.stopPropagation();
	const textarea = document.createElement( 'textarea' )
	textarea.value = textToCopy;
	document.body.appendChild( textarea );
	textarea.select();
	document.execCommand('copy');
	textarea.remove();
	event.target.focus();
};

const CopyToClipboard = ( { fill, textToCopy } ) => {
	return (
		<a onClick={ ( event ) => copyToClipboardHelper( event, textToCopy ) }>
			<CopySvg fill={ fill } />
		</a>
	);
}

export default CopyToClipboard;
