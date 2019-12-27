// External
import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

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

		const className = classnames( styles.referenceWrapper, this.props.searchSelect ? 'search-select' : null );
		return (
			<div className={ className }>
				<div className={ styles.referenceWrapperInner }>
					{ references }
				</div>
			</div>
		);
	}
}

const mapStateToProps = ( { reference, settings, searchSelect }, ownProps ) => {
	return {
		inSync: settings.inSync,
		references: reference,
		searchSelect,
	}
};

const ReferenceWrapperContainer = connect(
	mapStateToProps,
)( ReferenceWrapper )

export default withStyles( styles )( ReferenceWrapperContainer );
