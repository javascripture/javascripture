// External
import React from 'react';

// Internal
import styles from './styles.scss';

const SingleReference = React.memo( ( { children } ) => {
	return (
		<div className={ styles.singleReference }>
			{ children }
		</div>
	);
} );

export default SingleReference;
