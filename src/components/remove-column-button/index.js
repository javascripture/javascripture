// External
import React from 'react';
import { useDispatch } from 'react-redux';

// Internal
import { removeColumn } from '../../actions';
import RemoveSvg from '../svg/remove';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

const RemoveColumnButton = React.memo( ( { index } ) => {
	const dispatch = useDispatch();
	const fill = '#333333';
	return (
		<button type="button" onClick={ () => dispatch( removeColumn( index ) ) }>
			<RemoveSvg fill={ fill } />
		</button>
	);
} );

export default RemoveColumnButton;
