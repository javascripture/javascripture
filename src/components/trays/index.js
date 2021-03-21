// External dependencies
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';
import SidebarControls from './sidebar-controls';
import TrayList from './tray-list';
import Footer from '../footer';

const Trays = React.memo( () => (
	<div className={ styles.trays }>
		<SidebarControls />
		<TrayList />
		<Footer />
	</div>
) );

export default withStyles( styles )( Trays );
