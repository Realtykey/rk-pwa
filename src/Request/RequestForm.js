import React, { useEffect, useState, useContext, lazy, Suspense } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
//select
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputAdornment from '@material-ui/core/InputAdornment';
//custom comps
import FormLayout from '../FormLayout';
import OutlinedInput from '@material-ui/core/OutlinedInput';

import { AuthContext } from "../Auth";

//redux imports
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux'

import { setStepAction, showAlertAction, setMapAction } from '../redux.js';
import { setReqAction } from './request-reducer';
//form hook
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router-dom";

import Box from '@material-ui/core/Box';


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    padding: '20px 20px 0 20px',
    overflow: 'scroll',
    whiteSpace: 'nowrap',
    paddingTop: 100,
    paddingBottom: 30,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.primary.contrastText
  }
  , map: {
    height: 400

  }
  ,
  placeholder: {
    color: "gray"
  }
}));

const Map = lazy(() => import('../Map'));

const actualDate = () => {

  var today = new Date();
  var dd = today.getDate();

  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }

  if (mm < 10) {
    mm = '0' + mm;
  }

  return `${mm} / ${dd} / ${yyyy}`
}

export function RequestForm(props) {
  const setReq = (prop, index) => { dispatch(setReqAction(prop, index)) }

  const history = useHistory();

  const dispatch = useDispatch();
  //user managment
  const { currentUser } = useContext(AuthContext);
  var uid = currentUser.uid;
  //mapbox map
  const map = useSelector((state) => state.general.map);
  const setMap = map => dispatch(setMapAction(map));
  //forms hook
  const { register, errors, handleSubmit, setValue, control } = useForm();
  //error
  const showAlert = (errorMessage) => dispatch(showAlertAction(errorMessage));

  //select inputs state
  const [propType, setType] = React.useState(props.location ? props.location.propData.propType : 'Casa');

  const handleType = (event) => {
    setType(event.target.value);
  };

  const [operation, setOperation] = React.useState(props.location ? props.location.propData.operation : 'Venta');

  const handleOperation = (event) => {
    setOperation(event.target.value);
  };

  //stepper state 
  const activeStep = useSelector((state) => state.general.activeStep);
  const setStep = (step) => dispatch(setStepAction(step));

  //activar listener para boton de upload i2mages
  useEffect(() => {
    //on edit
    if (props.location) {
      setMap(props.location.propData.map);
    }
    console.log('prop form mounted');
    return () => { console.log('prop form umounted') }

  }, []);

  const submit = async (data) => {

    if (data.parkings) {
      data['parkings'] = Number(data.parkings);
    }

    if (data.area) {
      data['area'] = Number(data.area);
    }


    if (data.bathrooms) {
      data['bathrooms'] = Number(data.bathrooms);
    }

    if (data.dormitories) {
      data['dormitories'] = Number(data.dormitories);
    }

    data['price'] = Number(data.price);

    const { app, firebase } = await import('./../base');

    var request = { ...data, map, propType, operation, uid , date:firebase.firestore.Timestamp.now()};

    let ref = app.firestore().collection('requests');

    if (props.location) {//on edit
      ref = ref.doc(props.location.propData.id);
      request = { ...request, id: props.location.propData.id }
    } else {            //on create
      ref = ref.doc()
      const id = ref.id
      request = { ...request, id: id }
    }

    //create or update firestore doc
    await ref.set(request, { merge: true });

    //redirect to mypanel, reset selected prop (forces list refresh)
    if (props.location?.propData) {
      history.push(
        {
          pathname:"/Home/MyPanel",
          tab: 1
        }
      );
      setReq({});
    }
    setStep(activeStep + 1);
  }

  const classes = useStyles();

  return (
    <FormLayout>
      <form onSubmit={handleSubmit(submit)}>
        <Typography style={{ color: 'white' }} variant="h6" gutterBottom>
          Detalles del Requerimiento
          </Typography>

        <Grid container spacing={3}>

        <Grid item xs={12} sm={12}>
          <Controller 
            as={<TextField 
            inputProps={{ maxLength: 60 }}
            fullWidth 
            label="Título de publicación" 
            variant="outlined"
            helperText={
            errors.title?.type === "minLength" ? "mínimo 30 caracteres" : ""+
            errors.title?.type === "required" ? "título obligatorio" : ""
            }    
            />} 
            name="title" 
            control={control} 
            defaultValue={props.location ? props.location.propData.title : ''}
            rules={{ required: true, minLength:30 }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>

            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">Tipo de inmueble</InputLabel>
              <Select
                labelId="propType"
                id="demo-simple-select-outlined"
                onChange={handleType}
                label="Tipo de inmueble"
                value={propType}
              >
                <MenuItem value={'Casa'}>Casa</MenuItem>
                <MenuItem value={'Casa Rentera'}>Casa Rentera</MenuItem>
                <MenuItem value={'Terreno'}>Terreno</MenuItem>
                <MenuItem value={'Bodega'}>Bodega</MenuItem>
                <MenuItem value={'Consultorio'}>Consultorio</MenuItem>
                <MenuItem value={'Departamento'}>Departamento</MenuItem>
                <MenuItem value={'Duplex'}>Duplex</MenuItem>
                <MenuItem value={'Edificio'}>Edificio</MenuItem>
                <MenuItem value={'Hacienda'}>Hacienda</MenuItem>
                <MenuItem value={'Hotel'}>Hotel</MenuItem>
                <MenuItem value={'Loft'}>Loft</MenuItem>
                <MenuItem value={'Oficina'}>Oficina</MenuItem>
                <MenuItem value={'Villa'}>Villa</MenuItem>
                <MenuItem value={'Suite'}>Suite</MenuItem>
                <MenuItem value={'Galpon'}>Galpón</MenuItem>
                <MenuItem value={'Local Comercial'}>Local Comercial</MenuItem>
                <MenuItem value={'Otros'}>Otros</MenuItem>

              </Select>
            </FormControl>

          </Grid>

          <Grid item xs={12} sm={6}>

            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">Operación</InputLabel>
              <Select
                labelId="propType"
                id="demo-simple-select-outlined"
                onChange={handleOperation}
                label="Tipo de inmueble"
                value={operation}
              >
                <MenuItem value={'Venta'}>Venta</MenuItem>
                <MenuItem value={'Alquiler'}>Alquiler</MenuItem>
                <MenuItem value={'Anticresis'}>Anticresis</MenuItem>

              </Select>
            </FormControl>

          </Grid>
          {propType !== 'Terreno' && (
            <Grid item xs={12} sm={6}>
              <TextField
                inputRef={register({ required: true })}
                helperText={errors.bathrooms && "número de baños obligatorio"}
                defaultValue={props.location ? props.location.propData.bathrooms : ''}
                id="bathrooms"
                name="bathrooms"
                label="Baños"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />
            </Grid>
          )}

          {propType !== 'Terreno' && (
            <Grid item xs={12} sm={6}>
              <TextField
                inputRef={register({ required: true })}
                helperText={errors.parkings && "número de parqueaderos obligatorio"}
                defaultValue={props.location ? props.location.propData.parkings : ''}
                id="parkings"
                name="parkings"
                label="Parqueaderos"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />
            </Grid>
          )}


          {propType !== 'Terreno' && (

            <Grid item xs={12} sm={6}>
              <TextField
                inputRef={register({ required: true })}
                helperText={errors.dormitories && "número de dormitorios obligatorio"}
                defaultValue={props.location ? props.location.propData.dormitories : ''}
                id="dormitories"
                name="dormitories"
                label="Dormitorios"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />

            </Grid>


          )}

          <Grid item xs={12} sm={6}>
            <TextField
              inputRef={register({ required: true })}
              helperText={errors.area && "área obligatoria"}
              defaultValue={props.location ? props.location.propData.area : ''}
              id="area"
              name="area"
              label="Area m²"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              inputRef={register({ required: true })}
              helperText={errors.description && "descripción obligatoria"}
              defaultValue={props.location ? props.location.propData.description : ''}
              name="description"
              id="description"
              label="Descripción"
              fullWidth
              inputProps={{ maxLength: 300 }}
              multiline
              autoComplete="billing address-line1"
              variant="outlined"
            />
          </Grid>


          <Grid item xs={12} sm={6}>
            <Typography style={{ color: 'white' }} variant="h6" gutterBottom>
              Ubicación
                    </Typography>
          </Grid>

          <Grid item xs={12} sm={12}>
            <Suspense fallback={<div>cargando mapa</div>}>
              <div>{map.address}</div>
              <Map />
            </Suspense>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth className={classes.margin} variant="outlined">
                <InputLabel htmlFor="price">Precio</InputLabel>
                <OutlinedInput
                    inputRef={register({ required: true})}
                    defaultValue={props.location ? props.location.propData.price : ''}
                    id="price"
                    name="price"
                    type="number"
                    inputProps={{
                    step:0.1
                    }}
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                />
            </FormControl>
        </Grid>

          <Grid item xs={12}>
            {/* {(imgFiles.length > 0) && */}
            <Button
              variant="outlined"
              type="submit"
              className={classes.button}
            >Confirmar</Button>
            {/* } */}
          </Grid>

        </Grid>
      </form>
    </FormLayout>
  );
}

export default RequestForm
