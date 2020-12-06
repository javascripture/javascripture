// External dependencies
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classnames from 'classnames';

// Internal dependencies
import BookSvg from '../svg/book.js';
import BookmarksSvg from '../svg/bookmarks.js';
import HelpSvg from '../svg/help.js';
import EyeSvg from '../svg/eye.js';
import InfoSvg from '../svg/info.js';
import SearchSvg from '../svg/search.js';
import TrayFilter from '../../components/trays/filter.js';
import MenuOpenSvg from '../svg/menu-open.js';
import MenuCloseSvg from '../svg/menu-close.js';
import { toggleSidebar } from '../../actions';

import styles from './styles.scss';

const Footer = React.memo( () => {
	const sidebarOpen = useSelector( state => state.sidebar );
	const dispatch = useDispatch();

	return (
	<div className={ styles.footer }>
		<TrayFilter filter="goto">
			<BookSvg />
		</TrayFilter>
		<TrayFilter filter="word">
			<EyeSvg />
		</TrayFilter>
		<TrayFilter filter="search">
			<SearchSvg />
		</TrayFilter>
		<TrayFilter filter="bookmarks">
			<BookmarksSvg />
		</TrayFilter>
		<TrayFilter filter="reference">
			<InfoSvg />
		</TrayFilter>
		<TrayFilter filter="settings">
			<HelpSvg />
		</TrayFilter>

		<button onClick={ ( event ) => {
			event.preventDefault();
			dispatch( toggleSidebar() );
		} } title="Close sidebar" className={ classnames( styles.sidebarButton, sidebarOpen ? null : styles.closeWithSidebarClosed ) }>
			{ sidebarOpen ? <MenuOpenSvg /> : <MenuCloseSvg /> }
		</button>
	</div>
) } );

export default withStyles( styles )( Footer );
