import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import references from './references';
import scrollChapter from './scroll-chapter';
import trays from './trays';
import wordHighlight from './word-highlight';

const app = combineReducers( {
	references,
	scrollChapter,
	trays,
	wordHighlight,
	routing: routerReducer
} );

export default app;
