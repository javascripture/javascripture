// External dependencies
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import BookmarkSvg from '../svg/bookmark.js';
import CogSvg from '../svg/cog.js';
import EyeSvg from '../svg/eye.js';
import SearchSvg from '../svg/search.js';
import TrayFilter from '../../components/trays/filter.js';
import styles from './styles.scss';

const fill = '#333333';

const Footer = () => (
	<div className={ styles.footer }>
		<TrayFilter filter="word">
			<EyeSvg fill={ fill } />
		</TrayFilter>
		<TrayFilter filter="search">
			<SearchSvg fill={ fill } />
		</TrayFilter>
		<TrayFilter filter="bookmarks">
			<BookmarkSvg fill={ fill } />
		</TrayFilter>
		<TrayFilter filter="settings">
			<CogSvg fill={ fill } />
		</TrayFilter>
	</div>
)

export default withStyles( styles )( Footer );
