// External dependencies
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';

const Trays = ( { children } ) => (
	<div className={ styles.trays }>
		{ children }
	</div>
)

export default withStyles( styles )( Trays );
