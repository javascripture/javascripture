/**
 * External dependencies
 */
import React from 'react';
import { createStore, compose, applyMiddleware } from 'redux'
import { Provider, ReactReduxContext } from 'react-redux'
import { createBrowserHistory } from 'history';
import { ConnectedRouter, routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { HashRouter, Route } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react'

/**
 * Internal dependencies
 */
import rootReducer from './reducers';
import Stylizer, { insertCss } from './lib/stylizer';
import Root from './components/root';

const config = {
	key: 'primary',
	storage,
	blacklist: [ 'data' ],
};

const history = createBrowserHistory()

let persistedReducer = persistCombineReducers(config, rootReducer( history ) );

let store = createStore( persistedReducer, compose(
	window.devToolsExtension ? window.devToolsExtension() : f => f,
	applyMiddleware( routerMiddleware( history ), thunk )
) );

let persistor = persistStore( store );

class App extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			highlightedWord: ''
		};
	}
	render() {
		return (
			<Provider store={ store } context={ ReactReduxContext }>
				<PersistGate loading={null} persistor={ persistor }>
					<ConnectedRouter history={ history } context={ ReactReduxContext }>
						<Stylizer onInsertCss={ insertCss }>
							<HashRouter>
								<Route path="/" render={ () => <Root highlightedWord={ this.state.highlightedWord } /> } />
							</HashRouter>
						</Stylizer>
					</ConnectedRouter>
				</PersistGate>
			</Provider>
		);
	}
}

export default App;
