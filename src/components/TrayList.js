import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import styles from './trays/styles.scss';

const TrayList = ( { trays, filter, onTrayClick } ) => {
	return (
		<div>
			{ trays.map( tray =>
				<div
					key={tray.id}
					className={ tray.visible ? styles.visible : styles.hidden }
					{...tray}
				>
					<tray.component />
				</div>
			) }
		</div>
	);
};

TrayList.propTypes = {
	trays: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string.isRequired,
		visible: PropTypes.bool.isRequired,
		text: PropTypes.string.isRequired
	}).isRequired).isRequired
};

export default withStyles( styles )( TrayList );
