// External
import React from 'react';
import { connect } from 'react-redux';

// Internal
import SyncButton from '../sync-button';
import VersionSelector from '../../containers/version-selector';
import styles from './style.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

class Dock extends React.Component{
	render() {
		return (
			<div className={ styles.dock }>
				<div className={ styles.dockVersionSelectors }>
					{ this.props.references.map( ( reference, index ) => {
						return <VersionSelector reference={ reference } key={ index } index={ index } />
					} ) }
				</div>
				<div className={ styles.syncButton }>
					<SyncButton />
				</div>
			</div>
		);
	}
}

const mapStateToProps = ( { reference, settings }, ownProps ) => {
	return {
		inSync: settings.inSync,
		references: reference,
	};
};

export default connect(
  mapStateToProps
)( withStyles( styles )( Dock ) );

