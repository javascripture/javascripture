/**
 * External dependencies
 */
import React from 'react';
import { Router, Route } from 'react-router';

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
		<Router history={ history } routes={ routes } />
	);
}