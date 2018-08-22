// External
import React from 'react';
import { connect } from 'react-redux';

// Internal
import { removeColumn } from '../../actions';
import RemoveSvg from '../svg/remove';
import styles from './style.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

const fill = '#333333';

class RemoveColumnButton extends React.Component{
	render() {
		return (
			<button type="button" onClick={ this.props.removeColumn }>
				<RemoveSvg fill={ fill } />
			</button>
		);
	}
}

const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		removeColumn: () => {
			dispatch( removeColumn( ownProps.index ) )
		}
	};
};

export default connect(
	null,
	mapDispatchToProps,
)( withStyles( styles )( RemoveColumnButton ) );
