// External dependencies
import classnames from 'classnames';
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';

const Collapsible = React.memo( ( { children, header, open, onToggle } ) => {
	return (
		<div>
			<div className={ classnames( styles.header, open ? styles.open : styles.closed ) } onClick={ () => onToggle() }>{ header }</div>
			{ open && ( <div className={ styles.content }>{ children }</div> ) }
		</div>
	)
} );

export default withStyles( styles )( Collapsible );