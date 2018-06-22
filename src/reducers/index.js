//import { routerReducer } from 'react-router-redux'

import bookmarks from './bookmarks';
import reference from './reference';
import references from './references';
import scrollChapter from './scroll-chapter';
import searchResults from './search-results';
import searchTerms from './search-terms';
import settings from './settings';
import trays from './trays';
import wordDetails from './word-details';
import wordHighlight from './word-highlight';
import crossReferences from './cross-references';
import currentReference from './current-reference';
import version from './version';

const app = {
	bookmarks,
	crossReferences,
	currentReference,
	reference,
	references,
	scrollChapter,
	searchResults,
	searchTerms,
	settings,
	trays,
	version,
	wordDetails,
	wordHighlight,
	//routing: routerReducer
};

export default app;
