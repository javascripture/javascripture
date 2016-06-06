/**
 * External dependencies
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist'

/**
 * Internal dependencies
 */
import App from './app';
//import App from './components/App'
import reducers from './reducers';
import Stylizer, { insertCss } from './lib/stylizer';

const store = createStore(
	reducers,
	window.devToolsExtension ? window.devToolsExtension() : f => f,
	compose(
		autoRehydrate(),
		applyMiddleware( routerMiddleware( browserHistory ), thunk )
    )
);

persistStore( store );

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore( browserHistory, store );

ReactDOM.render(
	<Provider store={ store }>
		<Stylizer onInsertCss={ insertCss }>
			<App history={ history } />
		</Stylizer>
	</Provider>,
	document.getElementById( 'content' )
);