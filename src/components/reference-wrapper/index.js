// External
import React from 'react';
import { connect } from 'react-redux';

// Internal
import Reference from '../../containers/reference';
import SecondaryReference from '../../containers/secondary-reference';
import styles from './style.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

class ReferenceWrapper extends React.Component{
	render() {
		const inSync = this.props.inSync === 'sync';
		return (
			<div className={ styles.referenceWrapper }>
				<div className={ styles.referenceLeft }>
					<Reference highlightWord={ this.props.highlightWord } />
				</div>
				<div className={ styles.referenceRight }>
					{ ! inSync && ( <SecondaryReference highlightWord={ this.props.highlightWord } /> ) }
				</div>
			</div>
		);
	}
}

const mapStateToProps = ( state, ownProps ) => {
	return {
		inSync: state.settings.inSync,
	};
};


export default connect(
  mapStateToProps
)( withStyles( styles )( ReferenceWrapper ) );