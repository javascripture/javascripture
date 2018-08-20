// External
import React from 'react';
import { connect } from 'react-redux';

// Internal
import AddColumnButton from '../add-column-button';
import RemoveColumnButton from '../remove-column-button';
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
						return (
							<VersionSelector key={ index } reference={ reference } index={ index } />
						);
					} ) }
					<RemoveColumnButton />
					<SyncButton />
					<AddColumnButton />
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

