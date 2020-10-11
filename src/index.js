import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
//lazy loading
import { hydrate } from 'react-dom';
import { loadableReady } from '@loadable/component';

//redux

import { Provider } from "react-redux";
import { store } from './redux.js'

//custom components
ReactDOM.render(
  <Provider store = {store}>
  <App />
</Provider>,
document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
