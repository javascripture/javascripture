// External dependencies
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import WordDetails from '../../containers/word-details';
import styles from './styles.scss';

const WordTray = () => (
	<div className={ styles.tray }>
		<div id="wordDetailsPanel" className={ styles.trayContent }>
			<WordDetails />
		</div>
	</div>
);

WordTray.propTypes = {};

export default withStyles( styles )( WordTray );
