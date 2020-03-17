import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers'
import { Provider } from 'react-redux'
import App from './App'
import './index.css';

ReactDOM.render(<Provider store={ createStore(reducers, applyMiddleware(thunk)) }><App /></Provider>, document.getElementById('root'));
