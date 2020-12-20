// External dependencies
import React, { Fragment } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { useDispatch, useSelector } from 'react-redux';

// Internal dependencies
import { changeVersion } from '../../actions'
import AddColumnButton from '../add-column-button';
import ReferenceSelectorMobile from '../reference-selector-mobile';
import RemoveColumnButton from '../remove-column-button';
import SyncButton from '../sync-button';
import ReferenceInput from '../reference-input';
import VersionSelect from '../version-select';

// Internal dependencies
import styles from './styles.scss';

const Navigation = React.memo( ( { index, version, last } ) => {
	const dispatch = useDispatch();
	const inSync = useSelector( ( state ) => state.settings.inSync );
	const references = useSelector( ( state ) => state.reference );
	const handleChangeVersion = ( event ) => {
		dispatch( changeVersion( event.target.name, event.target.value ) );
		event.target.blur();
	};
	const value = references[ index ].version ? references[ index ].version : '';

	return (
		<Fragment>
			<ReferenceSelectorMobile index={ index } version={ version } inSync={ inSync } />
			<ReferenceInput version={ version } index={ index } />
			<VersionSelect name={ index } value={ value } onChange={ handleChangeVersion } />
			{ index === 0 ? <SyncButton /> : <RemoveColumnButton index={ index } /> }
			{ last && <AddColumnButton /> }
		</Fragment>
	);
} );

export default withStyles( styles )( Navigation );
