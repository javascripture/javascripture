// External dependencies
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import Search from '../search';
import styles from './styles.scss';

const SearchTray = () => (
	<div className={ styles.tray }>
		<div id="referenceTracking">
			<Search />
		</div>
	</div>
);

SearchTray.propTypes = {};

export default withStyles( styles )( SearchTray );
