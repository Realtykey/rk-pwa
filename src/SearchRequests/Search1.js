import React, { useEffect, useState, useContext } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

import CancelIcon from '@material-ui/icons/Cancel';
import Chip from '@material-ui/core/Chip';

import TagFacesIcon from '@material-ui/icons/TagFaces';
import clsx from 'clsx';
import SearchResults from './SearchResults1'

//custom input
import SearchLoader from './SearchLoader1.js';
import SearchInput from './SearchInput1.js'

//prop info icons
import Grid from '@material-ui/core/Grid';

//redux imports
import { useSelector, useDispatch } from 'react-redux'
import { AuthContext } from "../Auth.js";
//database
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';


import $ from 'jquery'

const useStyles = makeStyles((theme) => ({
  //public area
  controllers: {
    paddingTop: '20px',
    paddingBottom: '50px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    paddingTop: '30px',
    margin: '0 auto',
    textAlign: 'center'
  },
  searchBar: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: theme.spacing(1),
  },

  chipsContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(1),
  },
  chip: {
    margin: theme.spacing(0.5),
  },

  margin: {
    margin: theme.spacing(1),
  },
  padding: {
    padding: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    position: 'relative',
    width: window.screen.width < 600 ? window.screen.width : 600,
  },

}));



export default function Search(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [properties, setProps] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const [hiddenFilter, hideFilter] = useState(false);
  const setLoading = (isLoading)=> dispatch({type:'SET_LOADING',payload:isLoading})

  const loadFilteredProps = async () => {
    const db = firebase.firestore();
    let uid = currentUser.uid;
    let ref = db.collection('properties');
    //store modified
    setLoading(true);

    for (var [key, value] of Object.entries({
      operation: $('#operation').val() ? $('#operation').val() : '',
      propType: $('#propType').val() ? $('#propType').val() : '',
      area: $('#area').val() ? Number($('#area').val()) : '',
      bathrooms: $('#bathrooms').val() ? Number($('#bathrooms').val()) : '',
      parkings: $('#parkings').val() ? Number($('#parkings').val()) : '',
      dormitories: $('#dormitories').val() ? Number($('#dormitories').val()) : '',
    })) {
      console.log(key + ' ' + value);

      if (value != '') {
        ref = ref.where(key, '==', value)
      }
    }

    ref.get().then(async (snap) => {
      if (snap.docs.length === 0) {
        setProps([]);
      } else {
        console.log("props gathered " + snap.docs.length);
        setProps(snap.docs);
      }
      //store modified
      setLoading(false);
    }
    );
  }


  return (
    <div className={classes.root}>
      <div className={classes.searchBar} >
        <SearchInput className={clsx(classes.margin, classes.textField)} />
      </div>

      <div className={classes.controllers}>
        <Button
          variant="smooth"
          onClick={loadFilteredProps}
          style={{ color: 'rgb(64	100	205)', backgroundColor: 'rgb(236	241	254)', borderRadius: '50px', marginRight: '5px' }} variant="contained"
        >
          buscar
        </Button>

        <Button style={{ color: '#8f6512', backgroundColor: !hiddenFilter ? '#ffefd1' : 'inherit', borderRadius: '25px', marginLeft: '5px' }}
          onClick={() => hideFilter(!hiddenFilter)}
          variant="contained">
          mostrar filtros
        </Button>
      </div>

      {!hiddenFilter && (<div>
        <Grid className={classes.chipsContainer} spacing={3} container >

          <Grid item>
            <TextField label="Operación" id="operation" variant="outlined" />

          </Grid>

          <Grid item>
            <TextField label="Tipo" id="propType" variant="outlined" />

          </Grid>

          <Grid item>
            <TextField label="Baños" id="bathrooms" type="number" variant="outlined" />

          </Grid>

          <Grid item>
            <TextField label="Parqueaderos" id="parkings" type="number" variant="outlined" />

          </Grid>

          <Grid item>
            <TextField label="Dormitorios" id="dormitories" type="number" variant="outlined" />

          </Grid>
          <Grid item>
            <TextField label="Área" id="area" type="number" variant="outlined" />

          </Grid>
        </Grid>
      </div>
      )

      }

      <SearchResults properties = {properties}/>

    </div>
  );
}