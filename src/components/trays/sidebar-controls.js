// External dependencies
import React, { useEffect } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';

// Internal dependencies
import { clearAll, removeAllBookmarks, toggleSidebar, clearSearch, fetchData, settingsChange } from '../../actions';
import BookSvg from '../svg/book.js';
import EyeSvg from '../svg/eye.js';
import SearchSvg from '../svg/search.js';
import BookmarksSvg from '../svg/bookmarks.js';
import HelpSvg from '../svg/help.js';
import InfoSvg from '../svg/info.js';
import ClearSvg from '../svg/clear.js';
import styles from './styles.scss';
import MenuOpenSvg from '../svg/menu-open.js';
import MenuCloseSvg from '../svg/menu-close.js';
import { mapVersionToData } from '../../lib/reference';
import VersionSelect from '../version-select';

const icons = {
	BookSvg: <BookSvg />,
	EyeSvg: <EyeSvg />,
	SearchSvg: <SearchSvg />,
	BookmarksSvg: <BookmarksSvg />,
	HelpSvg: <HelpSvg />,
	InfoSvg: <InfoSvg />,
};

const SidebarControls = React.memo( () => {
	const dispatch = useDispatch();
	const selectedTray = useSelector( state => state.trays.find( tray => {
		return tray.visible;
	} ) );
	const wordDetails = useSelector( state => state.wordDetails );
	const bookmarks = useSelector( state => state.bookmarks );
	const searchTerms = useSelector( state => state.searchTerms );
	const sidebarOpen = useSelector( state => state.sidebar );
	const interfaceLanguage = useSelector( state => state.settings.interfaceLanguage );
	const icon = selectedTray && selectedTray.icon;
	const title = selectedTray && selectedTray.text;

	useEffect( () => {
		// Load data for OT and NT
		const otData = mapVersionToData( 'Genesis', interfaceLanguage );
		const ntData = mapVersionToData( 'Matthew', interfaceLanguage )
		dispatch( fetchData( otData ) );
		if ( ntData !== otData ) {
			dispatch( fetchData( ntData ) );
		}
	}, [ interfaceLanguage ] );

	let clearControls;
	if ( selectedTray.id === 'bookmarks' ) {
		clearControls = ( bookmarks.length > 0 && (
			<a href="#" onClick={ ( event ) => {
				event.preventDefault();
				dispatch( removeAllBookmarks() );
			} } title="Clear bookmarks">
				<ClearSvg />
			</a>
		) );
	}

	if ( selectedTray.id === 'word' ) {
		clearControls = ( wordDetails.length > 0 && (
			<a href="#" onClick={ ( event ) => {
				event.preventDefault();
				dispatch( clearAll() );
			} } title="Clear words">
				<ClearSvg />
			</a>
		) );
	}

	if ( selectedTray.id === 'search' ) {
		clearControls = ( searchTerms.length > 0 && (
			<a href="#" onClick={ ( event ) => {
				event.preventDefault();
				dispatch( clearSearch() );
			} } title="Clear words">
				<ClearSvg />
			</a>
		) );
	}

	return (
		<div className={ styles.sidebarControls }>
			<span className={ styles.sidebarControlsInner }>
				{ icons[ icon ] }
				<span className={ styles.sidebarControlsTitle }>{ title }</span>
			</span>

			<VersionSelect name="version" value={ interfaceLanguage } onChange={
				( event ) => {
					dispatch( settingsChange( 'interfaceLanguage', event.target.value ) );
					event.target.blur();
				}
			} />

			<span className={ styles.sidebarControlsRight }>
				{ clearControls }
				<a href="#" onClick={ ( event ) => {
					event.preventDefault();
					dispatch( toggleSidebar() );
				} } title="Close sidebar" className={ classnames( sidebarOpen ? null : styles.closeWithSidebarClosed ) }>
					{ sidebarOpen ? <MenuOpenSvg /> : <MenuCloseSvg /> }
				</a>
			</span>
		</div>
	);
} );

export default withStyles( styles )( SidebarControls );
