// External dependencies
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import ReferenceSelector from '../reference-selector';
import styles from './styles.scss';

const GotoTray = () => (
	<div className={ styles.tray }>
		<ReferenceSelector />
	</div>
);

GotoTray.propTypes = {};

export default withStyles( styles )( GotoTray );
