// External dependencies
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import BookSvg from '../svg/book.js';
import BookmarkSvg from '../svg/bookmark.js';
import CogSvg from '../svg/cog.js';
import EyeSvg from '../svg/eye.js';
import SearchSvg from '../svg/search.js';
import FilterTrayLink from '../../containers/FilterTrayLink'
import styles from './styles.scss';

const fill = '#333333';

const Footer = () => (
	<div className={ styles.footer }>
		<FilterTrayLink filter="goto">
			<BookSvg fill={ fill } />
		</FilterTrayLink>
		<FilterTrayLink filter="word">
			<EyeSvg fill={ fill } />
		</FilterTrayLink>
		<FilterTrayLink filter="search">
			<SearchSvg fill={ fill } />
		</FilterTrayLink>
		<FilterTrayLink filter="bookmarks">
			<BookmarkSvg fill={ fill } />
		</FilterTrayLink>
		<FilterTrayLink filter="settings">
			<CogSvg fill={ fill } />
		</FilterTrayLink>
	</div>
)

export default withStyles( styles )( Footer );
