// External
import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

// Internal
import VersionSelector from '../version-selector';
import styles from './style.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

class Dock extends React.Component{
	render() {
		const numberOfColumns = this.props.references.length;
		const className = classnames( styles.dock, this.props.sidebarOpen ? styles.dockWithSidebarOpen : null );
		return (
			<div className={ className }>
				<div className={ styles.dockVersionSelectors }>
					{ this.props.references.map( ( reference, index ) => {
						return (
							<VersionSelector key={ index } reference={ reference } index={ index } last={ ( index + 1 ) === numberOfColumns } />
						);
					} ) }
				</div>
			</div>
		);
	}
}

const mapStateToProps = ( { reference, settings, sidebar }, ownProps ) => {
	return {
		inSync: settings.inSync,
		references: reference,
		sidebarOpen: sidebar,
	};
};

export default connect(
	mapStateToProps
)( withStyles( styles )( Dock ) );
