// External dependencies
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import BookSvg from '../svg/book.js';
import BookmarksSvg from '../svg/bookmarks.js';
import HelpSvg from '../svg/help.js';
import EyeSvg from '../svg/eye.js';
import InfoSvg from '../svg/info.js';
import SearchSvg from '../svg/search.js';
import TrayFilter from '../../components/trays/filter.js';
import styles from './styles.scss';

const fill = '#333333';

const Footer = () => (
	<div className={ styles.footer }>
		<TrayFilter filter="goto">
			<BookSvg fill={ fill } />
		</TrayFilter>
		<TrayFilter filter="word">
			<EyeSvg fill={ fill } />
		</TrayFilter>
		<TrayFilter filter="search">
			<SearchSvg fill={ fill } />
		</TrayFilter>
		<TrayFilter filter="bookmarks">
			<BookmarksSvg fill={ fill } />
		</TrayFilter>
		<TrayFilter filter="reference">
			<InfoSvg fill={ fill } />
		</TrayFilter>
		<TrayFilter filter="settings">
			<HelpSvg fill={ fill } />
		</TrayFilter>
	</div>
)

export default withStyles( styles )( Footer );
