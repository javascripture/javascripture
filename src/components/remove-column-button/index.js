// External
import React from 'react';
import { useDispatch } from 'react-redux';

// Internal
import { removeColumn } from '../../actions';
import RemoveSvg from '../svg/remove';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

const RemoveColumnButton = React.memo( ( { index } ) => {
	const dispatch = useDispatch();

	return (
		<button type="button" onClick={ () => dispatch( removeColumn( index ) ) }>
			<RemoveSvg />
		</button>
	);
} );

export default RemoveColumnButton;
