// External
import React from 'react';
import { connect } from 'react-redux';

// Internal
import VersionSelector from '../../containers/version-selector';
import styles from './style.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

class Dock extends React.Component{
	render() {
		let scrollChapter = null;

		if ( this.props.scrollChapter ) {
			scrollChapter = this.props.scrollChapter.map( ( reference, index ) => {
				return <VersionSelector reference={ reference } key={ index } index={ index } />
			} );
		}

		if ( this.props.inSync !== 'different' ) {
			scrollChapter = <VersionSelector reference={ reference[ 0 ] } index={ 0 } />
		}

		return (
			<div className={ styles.dock }>
				{ scrollChapter }
			</div>
		);
	}
}

const mapStateToProps = ( { settings, scrollChapter }, ownProps ) => {
	return {
		inSync: settings.inSync,
		scrollChapter: scrollChapter
	};
};

export default connect(
  mapStateToProps
)( withStyles( styles )( Dock ) );

