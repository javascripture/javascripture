// External dependencies
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';

const SearchTray = () => (
	<div className={ styles.tray }>
		<div id="referenceTracking">
		</div>
	</div>
);

SearchTray.propTypes = {};

export default withStyles( styles )( SearchTray );
