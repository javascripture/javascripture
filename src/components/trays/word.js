// External dependencies
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';

const WordTray = () => (
	<div className={ styles.tray }>
		<div id="wordDetailsPanel" className={ styles.trayContent }>
			<div id="wordControlPanel" className="content">
				<style></style>
				<div className="control-panel content-padding">
					<div classNme="duplicated">Select a word to show more details about it here. Double click to search.</div>
				</div>
			</div>
		</div>
	</div>
);

WordTray.propTypes = {};

export default withStyles( styles )( WordTray );
