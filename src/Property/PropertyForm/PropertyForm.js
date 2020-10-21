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
import FormLayout from '../../FormLayout';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import ImagesPicker from '../ImagesPicker';
import ComissionPicker from '../../utils/ComissionPicker';
import Modal from '@material-ui/core/Modal';

//ios switch
import Switch from '@material-ui/core/Switch';


import ImagesPreview from './ImagesPreview.js';

import { AuthContext } from "../../Auth";

//redux imports
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux'

import { setStepAction, showAlertAction, setMapAction } from '../../redux.js';
import { setPropAction } from './../property-reducer'
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
    },
    picker:{
        color: 'white',
        position: 'absolute',
        overflow: 'scroll',
        padding:10
    }
}));

const Map = lazy(() => import('../../Map'));

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

export default function PropertyForm(props) {
    const classes = useStyles();

    //forms hook
    const { register, errors, handleSubmit, setValue, control } = useForm();

    const [modalStyle] = React.useState(getModalStyle);

    const pickPercent = (name,value) => {
        setValue(name,value);
    }
    const [pickerHidden, hidePicker] = useState(true);

    const pickerBody = (
        <div style={modalStyle} className={classes.picker}>
            <ComissionPicker pickPercent={pickPercent} hidePicker={hidePicker}/>
        </div>
    );


    const setProp = (prop, index) => { dispatch(setPropAction(prop, index)) }

    const history = useHistory();

    const dispatch = useDispatch();
    //user managment
    const { currentUser } = useContext(AuthContext);
    var uid = currentUser.uid;
    //mapbox map
    const map = useSelector((state) => state.general.map);
    const setMap = map => dispatch(setMapAction(map));
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

    //image local files
    const [imgFiles, setImgFiles] = useState([]);
    // local (images view)
    const [imgRefs, setImgRefs] = useState([]);

    const [updateImages, setUpdateImages] = useState(props.location ? false : true);

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

    const uploadImages = (docRef) => {
        let id = docRef.id;
        console.log(id);
        console.log('uploading')
        var progressBar = document.getElementById('progressBar');
        Array.prototype.forEach.call(imgFiles,
            async (imgFile) => {

                const { firebase } = await import('./../../base');

                //create storage ref
                let storageRef = firebase.storage().ref(`properties/${currentUser.uid}/${id}/${imgFile.name}`);
                //upload file
                let task = storageRef.put(imgFile);
                //
                console.log(storageRef);

                //update progress bar
                const unsuscribe = task.on('state_changed', function progress(snap) {
                    if (progressBar) {

                        var percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
                        progressBar.value = percentage;

                    }

                },
                    function error(err) {

                    },
                    async function complete(err) {

                        if (props.location) {
                            await docRef.set({
                                photos: []
                            }, { merge: true });
                        }

                        //unsuscribe
                        unsuscribe();

                        // Upload completed successfully, now we can get the download URL
                        task.snapshot.ref.getDownloadURL().then(async (downloadURL) => {
                            const { firebase } = await import('./../../base');

                            //update photos atribute (array) of the prop doc
                            docRef.set({
                                photos: firebase.firestore.FieldValue.arrayUnion(downloadURL)
                            }, { merge: true });

                            setStep(activeStep + 1);
                        });

                    },
                )

            }
        );
    }

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

        if (imgFiles.length == 0 && !props.location) {
            showAlert('Debes agregar almenos una foto');
            return;
        }

        const { app, firebase } = await import('./../../base');

        let ref = app.firestore().collection('properties');
        //comission
        const comission = {
            percent: Number(data.percent),
            value: data.price * data.percent * 0.01
        }
        delete data.percent;
        //edit and create
        var property = { ...data, map, comission, propType, operation, uid, date:firebase.firestore.Timestamp.now()};

        if (props.location) {//on edit
            ref = ref.doc(props.location.propData.id);
            property = { ...property, id: props.location.propData.id }
        } else {            //on create
            ref = ref.doc()
            const id = ref.id
            property = { ...property, id: id }
        }

        //create or update firestore doc
        ref.set(property, { merge: true }).then(
            () => {
                if (props.location) {//on edit
                    if (updateImages && imgFiles.length > 0) {
                        //upload loaded images to firestore storage
                        uploadImages(ref);
                    }
                } else {//on create
                    uploadImages(ref);
                }
                //redirect to mypanel, reset selected prop (forces list refresh)
                if (props.location?.propData) {
                    history.push(
                        {
                            pathname: "/Home/MyPanel",
                            tab: 0
                        }
                    );
                    setProp({});
                }

            }
        );
    }


    return (
        <FormLayout>
            <form onSubmit={handleSubmit(submit)}>
                <Typography style={{ color: 'white' }} variant="h6" gutterBottom>
                    Características del Inmueble
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
                        rules={{ required: true, minLength:30,maxLength:60 }}
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

                    <Grid item xs={12} sm={12}>
                        <Typography style={{ color: 'white' }} variant="h6" gutterBottom>
                            Fotos
                    </Typography>

                        <div className={classes.placeholder}>
                            (5 máximo)
                    </div>
                        {props.location &&
                            <div>
                                <Typography gutterBottom>
                                    ¿Quieres actualizar las fotos?
                            </Typography>
                                <Switch checked={updateImages} onChange={() => setUpdateImages(!updateImages)} name="checkedB" />
                            </div>
                        }
                    </Grid>

                    <Grid align="left" item xs={12}>

                        <Box display={updateImages ? "inline" : "none"}>
                            {/* imgs preview if img references exists */}
                            {(imgRefs.length > 0) &&
                                <ImagesPreview urls={imgRefs} />
                            }
                            <ImagesPicker setImgFiles={setImgFiles} setImgRefs={setImgRefs} />
                        </Box>

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
                        <TextField
                            onClick={operation=='Alquiler'?() => hidePicker(false) : () => console.log('venta')}
                            inputRef={register({ required:true})}
                            helperText={errors.percent && "valor obligatorio"}
                            defaultValue={props.location ? props.location.propData.comission.percent : null}
                            id="percent"
                            name="percent"
                            label={(operation === 'Venta') ? ' % Comisión' : ' % del canon (ejm:10,20...) '}
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                readOnly: operation=='Alquiler',
                            }}
                            inputProps={{
                                step:0.1
                            }}
                            variant="outlined"
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth className={classes.margin} variant="outlined"
                        >
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
                <Modal
                    open={!pickerHidden}
                    onClose={()=>hidePicker(true)}
                >
                    {pickerBody}
                </Modal>
            </form>
        </FormLayout>
    );
}