// External
import React from 'react';
import { connect } from 'react-redux';

// Internal
import Reference from '../../containers/reference';
import styles from './style.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

class ReferenceWrapper extends React.Component{
	render() {
		const inSync = this.props.inSync === 'sync';
		let references = this.props.references.map( ( reference, index ) => {
			return ( <Reference highlightWord={ this.props.highlightWord } reference={ reference } key={ index } index={ index } /> );
		} );

		if ( inSync ) {
			references = <Reference highlightWord={ this.props.highlightWord } reference={ this.props.references[ 0 ] }  index={ 0 } />
		}

		return (
			<div className={ styles.referenceWrapper }>
				{ references }
			</div>
		);
	}
}

export default withStyles( styles )( ReferenceWrapper );