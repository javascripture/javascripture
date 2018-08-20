// External
import React from 'react';
import { connect } from 'react-redux';

// Internal
import { addColumn } from '../../actions';
import AddSvg from '../svg/add';
import styles from './style.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

const fill = '#333333';

class AddColumnButton extends React.Component{
	render() {
		return (
			<button onClick={ this.props.addColumn }>
				<AddSvg fill={ fill } />
			</button>
		);
	}
}

const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		addColumn: () => {
			dispatch( addColumn() )
		}
	};
};

export default connect(
	null,
	mapDispatchToProps,
)( withStyles( styles )( AddColumnButton ) );
