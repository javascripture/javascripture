// External dependencies
import React, { Fragment } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { useDispatch, useSelector } from 'react-redux';

// Internal dependencies
import { changeVersion } from '../../actions'
import ReferenceSelectorMobile from '../reference-selector-mobile';
import ReferenceInput from '../reference-input';
import VersionSelect from '../version-select';

// Internal dependencies
import styles from './styles.scss';

const Navigation = React.memo( ( { index, last } ) => {
	const dispatch = useDispatch();
	const inSync = useSelector( ( state ) => state.settings.inSync );
	const references = useSelector( ( state ) => state.reference );
	const handleChangeVersion = ( event ) => {
		dispatch( changeVersion( event.target.name, event.target.value ) );
		event.target.blur();
	};
	const version = references[ index ].version ? references[ index ].version : '';
	const isRTL = bible.isRtlVersion( version );

	return (
		<div className={ styles.navigation } dir={ isRTL ? 'rtl' : 'ltr' }>
			<ReferenceSelectorMobile index={ index } version={ version } inSync={ inSync } />
			<ReferenceInput version={ version } index={ index } />
			<VersionSelect name={ index } value={ version } onChange={ handleChangeVersion } />
		</div>
	);
} );

export default withStyles( styles )( Navigation );
