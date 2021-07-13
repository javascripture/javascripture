// External
import React from 'react';
import Sidebar from 'react-sidebar';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';

// Internal
import Dock from './dock';
import ReferenceWrapper from '../components/reference-wrapper';
import KeyboardShortcuts from './keyboard-shortcuts';
import Trays from './trays';
import WordHighlight from './word-highlight';
import styles from './root.scss';
import { closeReferenceSelectorMobile, toggleSidebar } from '../actions'

const Root = React.memo( ( { highlightedWord } ) => {
	const dispatch = useDispatch();
	const sidebarOpen = useSelector( state => state.sidebar );
	const darkMode = useSelector( state => state.settings.darkMode );
	const compareMode = useSelector( state => state.settings.compareMode );
	const getBodyStyles = () => {
		const fontFamily = useSelector( state => state.settings.fontFamily );
		const fontSize = useSelector( state => state.settings.fontSize );

		var bodyStyles = 'body, .root { ';
		bodyStyles += 'font-family: ' + fontFamily + ';';
		bodyStyles += 'font-size: ' + fontSize + ';';
		bodyStyles += '}';
		return bodyStyles;
	};
	const clearReferenceSelector = () => {
		dispatch( closeReferenceSelectorMobile() )
	};

	return (
		<div className={ classnames( 'root', { 'dark-mode-on': darkMode === true, 'dark-mode-off': darkMode === false } ) }>
			<Sidebar
				sidebar={
					<Trays />
				}
				open={ sidebarOpen }
				onSetOpen={ () => dispatch( toggleSidebar() ) }
				shadow={ false }
				styles={{
					sidebar: { background: "var(--background)", borderTop: "1px solid var(--mid)", boxShadow: "var(--shadow) 2px 2px 4px", overflowY: "none", width: "320px", zIndex: "10" },
					overlay: { disply: "none", bottom: "auto", right: "auto" },
					content: { background: "var(--background)" },
				}}
			>
				<div className={ styles.root }>
					<style>{ getBodyStyles() }</style>
					<KeyboardShortcuts />
					<WordHighlight word={ highlightedWord } />
					{ compareMode ? null : <Dock /> }
					<div onClick={ clearReferenceSelector }>
						<ReferenceWrapper />
					</div>

				</div>
			</Sidebar>
		</div>
	);
} );

export default Root;
