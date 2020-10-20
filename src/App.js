import React, { Suspense, lazy, useState } from 'react';
import './App.css';


//custom comps
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { AuthProvider } from './Auth'
//tema personalizado
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';

//
// import { AuthProvider } from "./Auth.js";
import PrivateRoute from "./PrivateRoute.js";
import ReverseRoute from './InternalRoute'
import loadable from '@loadable/component';

//redux imports
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux'
import { closeAlertAction } from './redux';

/*ENRUTAMIENTO*/
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

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

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#272331',
  },
  background: {
    backgroundImage: 'url(/bg02.jpg)',
  },
  messageChart: {
    color: 'white',
    position: 'absolute',
    width: 'auto',
    height: 200,
    overflow: 'scroll',
    padding: 50,
  },
}));

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    borderRadius:8,
    background: '#272331',
    outline: 'none',
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    border: 'none'
  };
}
const SignIn = loadable(() => import('./SignIn/SignIn'));
const SignUp = loadable(() => import('./SignUp/SignUp'));
const Home = loadable(() => import('./Home/Home'));

function App() {
  const dispatch = useDispatch();
  //tema global
  const classes = useStyles();

  const [signed, setSigned] = useState(false);
  //error
  const closeAlert = () => dispatch(closeAlertAction());

  var errorMessage = useSelector(state => state.general.errorMessage);

  const [modalStyle] = React.useState(getModalStyle);

  const body = (
    <div style={modalStyle} className={classes.messageChart}>
      {errorMessage}
    </div>
  );

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <PrivateRoute path="/Home" component={Home} />
            <Route exact path="/" component={SignIn} />
            <Route  path="/SignIn" component={SignIn} />
            <Route  path="/SignUp" component={SignUp} />
          </Switch>
        </Router>
        <Modal
          open={errorMessage != ''}
          onClose={closeAlert}
        >
          {body}
        </Modal>
      </ThemeProvider>
    </div>
  );
}

export default App;


