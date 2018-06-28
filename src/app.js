/**
 * External dependencies
 */
import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

/**
 * Internal dependencies
 */
import Root from './containers/root';

const routes = {
	path: '/',
	slug: 'root',
	component: Root,
};

export default function App( { history } ) {
	return (
		<HashRouter><Route path="/" component={ Root } /></HashRouter>
	);
}