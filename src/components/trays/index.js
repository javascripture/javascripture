// External dependencies
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';
import SidebarControls from './sidebar-controls';
import Footer from '../footer';

const Trays = ( { children } ) => (
	<div className={ styles.trays }>
		<SidebarControls />
		{ children }
		<Footer />
	</div>
)

export default withStyles( styles )( Trays );
