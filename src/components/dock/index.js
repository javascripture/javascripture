// External
import React from 'react';
import { connect } from 'react-redux';

// Internal
import VersionSelector from '../version-selector';
import styles from './style.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

class Dock extends React.Component{
	render() {
		const numberOfColumns = this.props.references.length;
		return (
			<div className={ styles.dock }>
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

const mapStateToProps = ( { reference, settings }, ownProps ) => {
	return {
		inSync: settings.inSync,
		references: reference,
	};
};

export default connect(
	mapStateToProps
)( withStyles( styles )( Dock ) );

