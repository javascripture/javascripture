// External dependencies
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import WordDetails from '../word-details';
import styles from './styles.scss';

const WordTray = () => (
	<div className={ styles.trayContent }>
		<WordDetails />
	</div>
);

WordTray.propTypes = {};

export default withStyles( styles )( WordTray );
