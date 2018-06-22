// External dependencies
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';

const TrayFilter = ( { active, children, activate, hideAll } ) => {
	let classeName = styles.trayFilter;
	if ( active ) {
		classeName = styles.active
	}

	return (
		<span className={ classeName }
			onClick={ event => {
				event.preventDefault()
				if ( active ) {
					hideAll();
				} else {
					activate();
				}
			} }
		>
			{ children }
		</span>
	);
};

TrayFilter.propTypes = {
	active: PropTypes.bool.isRequired,
	children: PropTypes.node.isRequired,
	activate: PropTypes.func.isRequired,
	hideAll: PropTypes.func.isRequired
};

export default withStyles( styles )( TrayFilter );