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

	let className = styles.trayFilter;
	if ( active ) {
		className = styles.active
	}

	return (
		<span className={ className }
			onClick={ event => {
				event.preventDefault()
				activate();
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
	}
};

const ConnectedTrayFilter = connect(
	mapStateToProps,
	mapDispatchToProps
)( TrayFilter )

export default withStyles( styles )( ConnectedTrayFilter );
