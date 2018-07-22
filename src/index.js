/**
 * External dependencies
 */
import React from 'react';
import { render } from 'react-dom';

import App from './app';

const getRandomReference = function() {
	var bookNumber = Math.floor(Math.random() * bible.Data.books.length),
		chapterNumber = Math.floor(Math.random() * bible.Data.verses[bookNumber].length),
		numberOfVerses = bible.Data.verses[bookNumber][chapterNumber],
		verseNumber = Math.floor(Math.random() * numberOfVerses),
		referenceObject = {};
	referenceObject.book = bible.Data.books[bookNumber][0];
	referenceObject.chapter = chapterNumber + 1;
	referenceObject.verse = verseNumber + 1;
	return referenceObject;
};

const randomReference = getRandomReference();
if ( window.location.hash.length < 3 ) {
	window.location.hash = '#/' + randomReference.book + '/' + randomReference.chapter + '/' + randomReference.verse;
}

render( <App />, document.getElementById('content') );

if (module.hot) {
	module.hot.accept( './app', () => {
		const NextRootContainer = require('./app').default;
		render( <NextRootContainer />, document.getElementById('content') );
	} );
};
