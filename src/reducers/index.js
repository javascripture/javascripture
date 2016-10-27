import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import bookmarks from './bookmarks';
import references from './references';
import scrollChapter from './scroll-chapter';
import settings from './settings';
import trays from './trays';
import wordHighlight from './word-highlight';
import crossReferences from './cross-references';

const app = combineReducers( {
	bookmarks,
	crossReferences,
	references,
	scrollChapter,
	settings,
	trays,
	wordHighlight,
	routing: routerReducer
} );

export default app;
