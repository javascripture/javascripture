// External dependencies
import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { find } from 'lodash';


// Internal dependencies
import { clearAll, closeSidebar } from '../../actions'
import BookSvg from '../svg/book.js';
import EyeSvg from '../svg/eye.js';
import SearchSvg from '../svg/search.js';
import BookmarkSvg from '../svg/bookmark.js';
import HelpSvg from '../svg/help.js';
import InfoSvg from '../svg/info.js';
import ClearSvg from '../svg/clear.js';
import CloseSvg from '../svg/close.js';
import styles from './styles.scss';

const icons = {
	BookSvg: <BookSvg />,
	EyeSvg: <EyeSvg />,
	SearchSvg: <SearchSvg />,
	BookmarkSvg: <BookmarkSvg />,
	HelpSvg: <HelpSvg />,
	InfoSvg: <InfoSvg />,
};

const SidebarControls = ( { clearAll, closeSidebar, words, icon, title } ) => (
	<div className={ styles.sidebarControls }>
		<span className={ styles.sidebarControlsInner }>
			{ icons[ icon ] }
			<span className={ styles.sidebarControlsTitle }>{ title }</span>
		</span>

		<span className={ styles.sidebarControlsRight }>
			{ words.length > 0 && (
				<a href="#" onClick={ clearAll } title="Clear all">
					<ClearSvg />
				</a>
			) }
			<a href="#" onClick={ closeSidebar } title="Close sidebar">
				<CloseSvg />
			</a>
		</span>
	</div>
)

const mapStateToProps = ( state, ownProps ) => {
	const selectedTray = state.trays.find( tray => {
		return tray.visible;
	} );

	return {
		words: state.wordDetails,
		icon: selectedTray && selectedTray.icon,
		title: selectedTray&& selectedTray.text,
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
