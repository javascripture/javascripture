// External dependencies
import classnames from 'classnames';
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';

const Collapsible = React.memo( ( { children, header, open, onToggle, title } ) => {
	return (
		<div className={ styles.collapsible }>
			<div
				className={ classnames( styles.header, open ? styles.open : styles.closed ) }
				onClick={ () => onToggle() }
				title={ title }
			>
				{ header }
			</div>
			<div className={ classnames( styles.content, open ? styles.visible : styles.hidden ) }>{ children }</div>
		</div>
	)
} );

export default withStyles( styles )( Collapsible );
