// External dependencies
import classnames from 'classnames';
import React from 'react';
import WordBlockHeader from '../word-block-header';

// Internal dependencies
import styles from './styles.scss';

const Collapsible = React.memo( ( { children, className, header, open, onToggle, textToCopy, title, onRemove } ) => {
	return (
		<div className={ styles.collapsible }>
			<div
				className={ classnames( styles.header, open ? styles.open : styles.closed ) }
				onClick={ () => onToggle() }
				title={ title }
			>
				<WordBlockHeader
					className={ className }
					textToCopy={ textToCopy }
					onRemove={ onRemove }
				>
					{ header }
				</WordBlockHeader>
			</div>
			<div className={ classnames( styles.content, open ? styles.visible : styles.hidden ) }>
				{ children }
			</div>
		</div>
	)
} );

export default Collapsible;
