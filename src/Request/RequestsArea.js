//
import React, { useState, useContext, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { useSelector } from 'react-redux'

import { AuthContext } from "./Auth.js";
//custom comps
import PropertyCard from './PropertyCard/PropertyCard.js'

import Search from './Search/Search.js'

import './App.css'

//database
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';


const db = firebase.firestore();
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary">
      {'Copyright © '}
      <Link color="inherit" href="#">
        Valeria
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: window.screen.height,
    paddingTop: '100px',
  },
  main: {
    width: '100%',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
  },
  search: {
    padding: theme.spacing(3, 2),
    height: 'auto',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
  },
  cardGrid: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(8),
  },
  resultsCount: {
    textAlign: 'center',
    color: 'gray'
  }
}));

export default function RequestsArea() {
  const classes = useStyles();

  const [props, setProps] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const searchParams = useSelector(state => state.general.searchParams);

  const loadFilteredProps = async () => {
    const db = firebase.firestore();
    let uid = currentUser.uid;

    let ref = db.collection('properties');

    for (var [key, value] of Object.entries(searchParams)) {
      console.log(key + ' ' + value);

      if (value != '') {
        ref = ref.where(key, '==', value)
      }
    }

    ref.get().then(async (snap) => {
      if (snap.docs.length === 0) {
        // console.log('empty props');
      } else {
        console.log("props gathered " + snap.docs.length);
        setProps(snap.docs);
      }
    }
    );
  }


  useEffect(() => {

    //store props in state
    loadFilteredProps();
  }, [])


  return (
    <div className={classes.root}>
      <Search />

      <footer className={classes.footer}>
        <Container align="center" maxWidth="sm">
          <Typography variant="body1"> Realty key</Typography>
          <Copyright />
        </Container>
      </footer>
    </div>
  );
}