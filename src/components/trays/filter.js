// External dependencies
import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import some from 'lodash/some';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import { setTrayVisibilityFilter } from '../../actions'
import styles from './styles.scss';

const TrayFilter = ( { activate, children, filter } ) => {
	const dispatch = useDispatch();
	const active = useSelector( state => state.trays.some( tray => {
		return ( tray.id === filter && tray.visible );
	} ) );
	let className = styles.trayFilter;
	if ( active ) {
		className = styles.active
	}

	return (
		<span className={ className }
			onClick={ event => {
				event.preventDefault()
				dispatch( setTrayVisibilityFilter( filter ) )
			} }
		>
			{ children }
		</span>
	);
};

export default withStyles( styles )( TrayFilter );
