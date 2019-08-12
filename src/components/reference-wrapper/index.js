// External
import React from 'react';
import { connect } from 'react-redux';

// Internal
import Reference from '../reference';
import styles from './style.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

class ReferenceWrapper extends React.Component{
	render() {
		let references = this.props.references.map( ( reference, index ) => {
			return ( <Reference reference={ reference } key={ index } index={ index } /> );
		} );

		if ( this.props.inSync ) {
			references = <Reference reference={ this.props.references[ 0 ] } index={ 0 } />
		}

		return (
			<div className={ styles.referenceWrapper }>
				<div className={ styles.referenceWrapperInner }>
					{ references }
				</div>
			</div>
		);
	}
}

const mapStateToProps = ( { reference, settings }, ownProps ) => {
	return {
		inSync: settings.inSync,
		references: reference,
	}
};

const ReferenceWrapperContainer = connect(
	mapStateToProps,
)( ReferenceWrapper )

export default withStyles( styles )( ReferenceWrapperContainer );
