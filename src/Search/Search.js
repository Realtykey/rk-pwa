import React, { useState , useEffect} from 'react';
import { Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


import clsx from 'clsx';
import SearchResults from './SearchResults'

//custom input
import SearchInput from './SearchInput.js'

//prop info icons
import Grid from '@material-ui/core/Grid';

//redux imports
import { useDispatch } from 'react-redux'



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
  const [hiddenFilter, hideFilter] = useState(true);
  const setLoading = (isLoading) => dispatch({ type: 'SET_LOADING', payload: isLoading })

  useEffect(
    () => {
      console.log('tipo de area '+props.type)
    },
    []
  )

  //results managment
  const loadFilteredProps = async () => {
    const { app } = await import('./../base');

    let ref = app.firestore().collection('properties');
    //store modified
    setLoading(true);
    console.log('props fetched')

    const fields = {
      operation: $('#operation').val() ? $('#operation').val() : '',
      propType: $('#propType').val() ? $('#propType').val() : '',
      area: $('#area').val() ? Number($('#area').val()) : '',
      bathrooms: $('#bathrooms').val() ? Number($('#bathrooms').val()) : '',
      parkings: $('#parkings').val() ? Number($('#parkings').val()) : '',
      dormitories: $('#dormitories').val() ? Number($('#dormitories').val()) : '',
      name: $('#name').val() ? $('#name').val() : '',
      description: $('#sinput').val() ? $('#sinput').val() : '',
    }
    console.log(fields);
    
    for (var [key, value] of Object.entries(fields)) {
      console.log(key + ' ' + value);

      if (value != '') {
        ref = ref.where(key, '==', value)
      }
    }
    console.log()
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
          onClick={loadFilteredProps}
          variant="contained"
          color="primary"
        >
          buscar
        </Button>

        <Button
          style={{ marginLeft: 20 }}
          color="secondary"
          onClick={() => hideFilter(!hiddenFilter)}
          variant="contained"

        >
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

          <Grid item>
            <TextField label="Usuario" id="name" type="text" variant="outlined" />
          </Grid>

        </Grid>
      </div>
      )

      }
      <SearchResults properties={properties} />

    </div>
  );
}