// External dependencies
import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import { clearAll, closeSidebar } from '../../actions'
import ClearSVG from '../svg/clear.js';
import CloseSVG from '../svg/close.js';
import styles from './styles.scss';

const SidebarControls = ( { clearAll, closeSidebar, words } ) => (
	<div className={ styles.sidebarControls }>
		{ words.length > 0 && (
			<a href="#" onClick={ clearAll } title="Clear all">
				<ClearSVG />
			</a>
		) }
		<a href="#" onClick={ closeSidebar } title="Close sidebar">
			<CloseSVG />
		</a>
	</div>
)

const mapStateToProps = ( state, ownProps ) => {
	return {
		words: state.wordDetails
	}
};


const mapDispatchToProps = ( dispatch ) => {
	return {
		clearAll: () => {
			dispatch( clearAll() );
		},
		closeSidebar: () => {
			dispatch( closeSidebar() );
		},
	}
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( withStyles( styles )( SidebarControls ) )
