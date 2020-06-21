// External dependencies
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { useDispatch, useSelector } from 'react-redux';
import { find } from 'lodash';
import classnames from 'classnames';

// Internal dependencies
import { clearAll, toggleSidebar } from '../../actions'
import BookSvg from '../svg/book.js';
import EyeSvg from '../svg/eye.js';
import SearchSvg from '../svg/search.js';
import BookmarkSvg from '../svg/bookmark.js';
import HelpSvg from '../svg/help.js';
import InfoSvg from '../svg/info.js';
import ClearSvg from '../svg/clear.js';
import styles from './styles.scss';
import MenuOpenSvg from '../svg/menu-open.js';
import MenuCloseSvg from '../svg/menu-close.js';

const icons = {
	BookSvg: <BookSvg />,
	EyeSvg: <EyeSvg />,
	SearchSvg: <SearchSvg />,
	BookmarkSvg: <BookmarkSvg />,
	HelpSvg: <HelpSvg />,
	InfoSvg: <InfoSvg />,
};

const SidebarControls = React.memo( () => {
	const dispatch = useDispatch();
	const selectedTray = useSelector( state => state.trays.find( tray => {
		return tray.visible;
	} ) );
	const words = useSelector( state => state.wordDetails );
	const sidebarOpen = useSelector( state => state.sidebar );
	const icon = selectedTray && selectedTray.icon;
	const title = selectedTray&& selectedTray.text;

	return (
		<div className={ styles.sidebarControls }>
			<span className={ styles.sidebarControlsInner }>
				{ icons[ icon ] }
				<span className={ styles.sidebarControlsTitle }>{ title }</span>
			</span>

			<span className={ styles.sidebarControlsRight }>
				{ words.length > 0 && (
					<a href="#" onClick={ () => dispatch( clearAll() ) } title="Clear all">
						<ClearSvg />
					</a>
				) }
				<a href="#" onClick={ () => dispatch( toggleSidebar() ) } title="Close sidebar" className={ classnames( sidebarOpen ? null : styles.closeWithSidebarClosed ) }>
					{ sidebarOpen ? <MenuOpenSvg /> : <MenuCloseSvg /> }
				</a>
			</span>
		</div>
	);
} );

export default withStyles( styles )( SidebarControls );
