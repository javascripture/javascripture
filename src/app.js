/**
 * External dependencies
 */
import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history';
import { connectRouter, ConnectedRouter, routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { HashRouter, Route } from 'react-router-dom';

/**
 * Internal dependencies
 */
import reducers from './reducers';
import Stylizer, { insertCss } from './lib/stylizer';
import Root from './containers/root';

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

const routes = {
	path: '/',
	slug: 'root',
	component: Root,
};

//document.getElementById( 'reference' ).style.display = 'none';

class App extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			highlightedWord: ''
		};
	}
	render() {
			return (
			<Provider store={ store }>
				<ConnectedRouter history={ history }>
					<Stylizer onInsertCss={ insertCss }>
						<HashRouter><Route path="/" render={ () => <Root highlightedWord={ this.state.highlightedWord } /> } /></HashRouter>
					</Stylizer>
				</ConnectedRouter>
			</Provider>
		);
	}
}

export default App;
