/**
 * External dependencies
 */
import React from 'react';
import { Router, Route, hashHistory } from 'react-router';

/**
 * Internal dependencies
 */
import Reference from './containers/reference';
import Root from './components/root';

const routes = {
	path: '/',
	slug: 'root',
	component: Root,
	childRoutes: [
		{
			path: '*',
			component: Reference,
			slug: 'reference'
		}
	]
};

export default function App( { history } ) {
	return (
		<Router history={ history } routes={ routes } />
	);
}