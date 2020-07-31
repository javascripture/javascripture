// External dependencies
import React from 'react';

// Internal dependencies
import CopySvg from '../svg/copy.js';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './styles.scss';

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
		<a className={ styles.copyToClipboard } onClick={ ( event ) => copyToClipboardHelper( event, textToCopy ) }>
			<CopySvg fill={ fill } />
		</a>
	);
}

export default withStyles( styles )( CopyToClipboard );
