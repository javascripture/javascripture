// External
import React from 'react';
import { connect } from 'react-redux';

// Internal
import { settingsChange } from '../../actions';
import SyncSvg from '../svg/sync';
import SyncDisabledSvg from '../svg/sync-disabled';
import styles from './style.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

const fill = '#333333';

class SyncButton extends React.Component{
	changeSync = () => {
		this.props.settingsChange( 'inSync', ! this.props.inSync );
	};

	render() {
		return (
			<button className={ styles.syncButton } onClick={ this.changeSync }>
				{ this.props.inSync ?  <SyncSvg fill={ fill } /> : <SyncDisabledSvg fill={ fill } /> }
			</button>
		);
	}
}

const mapStateToProps = ( { settings }, ownProps ) => {
	return {
		inSync: settings.inSync,
	};
};

const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		settingsChange: ( settingName, settingValue ) => {
			dispatch( settingsChange( settingName, settingValue ) )
		}
	};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)( withStyles( styles )( SyncButton ) );

