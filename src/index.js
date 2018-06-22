/**
 * External dependencies
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history';
import { connectRouter, ConnectedRouter, routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk';
import { REHYDRATE, PURGE, persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

/**
 * Internal dependencies
 */
import App from './app';
//import App from './components/App'
import reducers from './reducers';
import Stylizer, { insertCss } from './lib/stylizer';

const config = {
	key: 'primary',
	storage
}

const history = createBrowserHistory()

let reducer = persistCombineReducers(config, reducers);

const store = createStore(
	connectRouter( history )( reducer ),
	window.devToolsExtension ? window.devToolsExtension() : f => f,
	compose(
		applyMiddleware( routerMiddleware( history ), thunk )
    )
);

persistStore( store );

// Create an enhanced history that syncs navigation events with the store
//const history = syncHistoryWithStore( browserHistory, store );

ReactDOM.render(
	<Provider store={ store }>
		<ConnectedRouter history={ history }>
			<Stylizer onInsertCss={ insertCss }>
				<App history={ history } />
			</Stylizer>
		</ConnectedRouter>
	</Provider>,
	document.getElementById( 'content' )
);