import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
//lazy loading
import { hydrate } from 'react-dom';
import { loadableReady } from '@loadable/component';

//theme
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';

//redux

import { Provider } from "react-redux";
import { store } from './redux.js'


//tema global
const theme = createMuiTheme(
  {
    palette: {
      type: 'dark',
      primary: {
        main: 'rgb(95	99	233	)',
        light: 'rgb(72, 72, 212)',
        dark: 'pink',
        contrastText: '#fff',
      },
      secondary: {
        main: 'rgb(95	99	233	)',
        light: 'rgb(95	99	233	)',
        dark: 'rgb(95	99	233	)',
        contrastText: '#fff',
      },
      background: {
        paper: '#312A3D',
        custom: '#433B52',
        default: '#272331'
      }
    },
    customlink: {
      background: 'white',
      borderRadius: 3,
      border: 0,
      color: 'white',
      height: 48,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
  }
);


//custom components
ReactDOM.render(
  <Provider store = {store}>
      <ThemeProvider theme={theme}>
      <App />
  </ThemeProvider>

</Provider>,
document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
