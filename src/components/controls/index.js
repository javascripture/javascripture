// External
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Internal
import { addColumn, removeColumn, settingsChange } from '../../actions';
import styles from './style.scss';

const Controls = React.memo( ( { } ) => {
	const dispatch = useDispatch();
	const inSync = useSelector( state => state.settings.inSync );
	const reference = useSelector( state => state.reference );
	const change = ( event ) => {
		if ( event.target.value === 'add' ) {
			dispatch( addColumn() );
		}

		if( event.target.value === 'delete' ) {
			dispatch( removeColumn( reference.length - 1 ) );
		}

		if ( event.target.value === "sync" ) {
			dispatch( settingsChange( 'inSync', true ) )
		}

		if ( event.target.value === "unsync" ) {
			dispatch( settingsChange( 'inSync', false ) )
		}

		setValue( '' );
		event.target.blur();
	};
	const [ value, setValue ] = useState( '' );

	return (
		<select onChange={ change } className={ styles.extraOptions } value={ value }>
			<option>…</option>
			<option value="add">Add a column</option>
			{ reference.length > 1 && <option value="delete">Delete column</option> }
			{ reference.length > 1 && ( inSync ? <option value="unsync">Un-sync references</option> : <option value="sync">Sync references</option> ) }
		</select>
	);
} );

export default Controls;
