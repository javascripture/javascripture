// External
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classnames from 'classnames';

// Internal
import Navigation from '../navigation';
import Controls from '../controls';
import styles from './style.scss';

const Dock = React.memo( () => {
	const reference = useSelector( state => state.reference );
	const numberOfColumns = reference.length
	const sidebarOpen = useSelector( state => state.sidebar );
	const className = classnames( styles.dock, sidebarOpen ? styles.dockWithSidebarOpen : null );
	return (
		<div className={ className }>
			<div className={ styles.dockVersionSelectors }>
				{ reference.map( ( reference, index ) => {
					return (
						<Navigation key={ index } reference={ reference } index={ index } last={ ( index + 1 ) === numberOfColumns } />
					);
				} ) }
				<Controls />
			</div>
		</div>
	);
} );

export default Dock;
