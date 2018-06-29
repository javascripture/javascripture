/**
 * External dependencies
 */
import React from 'react';
import { render } from 'react-dom';

import App from './app';
render( <App />, document.getElementById('content') );

if (module.hot) {
	module.hot.accept( './app', () => {
		const NextRootContainer = require('./app').default;
		render( <NextRootContainer />, document.getElementById('content') );
	} );
};
