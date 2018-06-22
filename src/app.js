/**
 * External dependencies
 */
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

/**
 * Internal dependencies
 */
import Root from './components/root';

const routes = {
	path: '/',
	slug: 'root',
	component: Root,
};

export default function App( { history } ) {
	return (
		<BrowserRouter><Route path="/" component={ Root } /></BrowserRouter>
	);
}