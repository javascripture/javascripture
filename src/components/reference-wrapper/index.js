// External
import React from 'react';
import { useSelector } from 'react-redux';
import classnames from 'classnames';

// Internal
import Reference from '../reference';
import styles from './style.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

const ReferenceWrapper = React.memo( () => {
	const reference = useSelector( state => state.reference );
	const inSync = useSelector( state => state.settings.inSync );
	const searchSelect = useSelector( state => state.searchSelect );
	const sidebarOpen = useSelector( state => state.sidebar );

	let references = reference.map( ( singleReference, index ) => {
		return ( <Reference reference={ singleReference } key={ index } index={ index } /> );
	} );

	if ( inSync ) {
		references = <Reference reference={ reference[ 0 ] } index={ 0 } />
	}

	const className = classnames( styles.referenceWrapper, sidebarOpen ? styles.referenceWrapperSidebarOpen : null, searchSelect ? 'search-select' : null );
	return (
		<div className={ className }>
			<div className={ styles.referenceWrapperInner }>
				{ references }
			</div>
		</div>
	);
} );

export default withStyles( styles )( ReferenceWrapper );
