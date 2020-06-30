// External dependencies
import React from 'react';
import classnames from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import RemoveSvg from '../svg/remove.js';
import styles from './styles.scss';
import CopyToClipboard from '../copy-to-clipboard';

const fill = '#fff';

const WordBlockHeader = React.memo( ( { children, className, textToCopy, title, onClick, onRemove } ) => {
	return (
		<h2
			className={ classnames( className, styles.title ) }
			title={ title }
			onClick={ () => onClick() }>
				{ children }
				<span className={ styles.copy }>
					<CopyToClipboard fill={ fill } textToCopy={ textToCopy } />
				</span>
				<a className={ styles.remove } onClick={ () => onRemove() }>
					<RemoveSvg fill={ fill } />
				</a>
		</h2>
	);
} );

export default withStyles( styles )( WordBlockHeader );
