// External
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

// Internal
import { addColumn, removeColumn } from '../../actions';
import styles from './style.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

const Controls = React.memo( ( { } ) => {
	const dispatch = useDispatch();
	const change = ( event ) => {
		if ( event.target.value === 'add' ) {
			dispatch( addColumn() );
		}

		if( event.target.value === 'delete' ) {
			dispatch( removeColumn() );
		}
		setValue( '' );
		event.target.blur();
	};
	const [ value, setValue ] = useState( '' );

	return (
		<select onChange={ change } className={ styles.extraOptions } value={ value }>
			<option>…</option>
			<option value="add">Add a column</option>
			<option value="delete">Delete column</option>
			<option value="sync">Sync references</option>
			<option value="unsync">Un-sync references</option>
		</select>
	);
} );

export default withStyles( styles )( Controls );
