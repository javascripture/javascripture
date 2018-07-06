// External
import React from 'react';
import { connect } from 'react-redux';

// Internal
import SecondaryVersionSelector from '../../containers/secondary-version-selector';
import VersionSelector from '../../containers/version-selector';
import styles from './style.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

class Dock extends React.Component{
	render() {
		return (
			<div className={ styles.dock }>
				<VersionSelector />
				{ ( this.props.inSync === 'different' ) && <SecondaryVersionSelector /> }
			</div>
		);
	}
}

const mapStateToProps = ( state, ownProps ) => {
	return {
		inSync: state.settings.inSync
	};
};

export default connect(
  mapStateToProps
)( withStyles( styles )( Dock ) );

