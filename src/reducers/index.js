import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import bookmarks from './bookmarks';
import references from './references';
import scrollChapter from './scroll-chapter';
import trays from './trays';
import wordHighlight from './word-highlight';

const app = combineReducers( {
	bookmarks,
	references,
	scrollChapter,
	trays,
	wordHighlight,
	routing: routerReducer
} );

export default app;
