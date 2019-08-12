// External dependencies
import React from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import some from 'lodash/some';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import { setTrayVisibilityFilter } from '../../actions'
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

const mapStateToProps = ( state, ownProps ) => {
	return {
		active: state.trays.some( tray => {
			return ( tray.id === ownProps.filter && tray.visible );
		} )
	}
};

const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		activate: () => {
			dispatch( setTrayVisibilityFilter( ownProps.filter ) )
		},
		hideAll: () => {
			dispatch( setTrayVisibilityFilter( 'SHOW_NONE' ) )
		}
	}
};

const ConnectedTrayFilter = connect(
	mapStateToProps,
	mapDispatchToProps
)( TrayFilter )

export default withStyles( styles )( ConnectedTrayFilter );
