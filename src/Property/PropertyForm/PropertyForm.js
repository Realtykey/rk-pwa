import React, {
  useEffect,
  useLayoutEffect,
  useState,
  useContext,
  lazy,
  Suspense
} from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormLayout from '../../FormLayout'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import ImagesPicker from '../ImagesPicker'
import ComissionPicker from '../../utils/ComissionPicker'
import Modal from '@material-ui/core/Modal'
import Box from '@material-ui/core/Box'
import Switch from '@material-ui/core/Switch'

import ImagesPreview from './ImagesPreview.js'

import { AuthContext } from '../../Auth'

import { useDispatch, useSelector } from 'react-redux'

import { setStepAction, setMapAction } from '../../redux.js'
import { useForm, Controller } from 'react-hook-form'
import { useHistory, useLocation } from 'react-router-dom'
import { useAlert } from 'src/components/globals/Alert'
import { useLocalStorage } from '../../hooks'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  root: {
    padding: '20px 20px 0 20px',
    overflow: 'scroll',
    whiteSpace: 'nowrap',
    paddingTop: 100,
    paddingBottom: 30,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.primary.contrastText
  },
  map: {
    height: 400
  },
  placeholder: {
    color: 'gray'
  },
  picker: {
    color: 'white',
    position: 'absolute',
    overflow: 'scroll',
    padding: 10
  }
}))

const Map = lazy(() => import('../../Map'))

function getModalStyle () {
  const top = 50
  const left = 50

  return {
    borderRadius: 8,
    background: '#272331',
    outline: 'none',
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    border: 'none'
  }
}

export default function PropertyForm (props) {
  const classes = useStyles()
  const { register, errors, handleSubmit, setValue, control } = useForm()

  const { location: routeLocation } = props

  // on edit, page refresh persistance
  const location = useLocation()
  const { propData } = location
  const [storedProperty, storeProperty] = useLocalStorage(
    'storedProperty',
    propData
  )

  useLayoutEffect(() => {
    if (propData !== undefined) {
      storeProperty(propData)
    }

    return () => {
      localStorage.removeItem('storedProperty')
    }
  }, [])

  const alert = useAlert()

  const [modalStyle] = useState(getModalStyle)

  const pickPercent = (name, value) => {
    setValue(name, value)
  }
  const [pickerHidden, hidePicker] = useState(true)

  const pickerBody = (
    <div style={modalStyle} className={classes.picker}>
      <ComissionPicker pickPercent={pickPercent} hidePicker={hidePicker} />
    </div>
  )

  const history = useHistory()

  const dispatch = useDispatch()
  // user managment
  const { currentUser } = useContext(AuthContext)
  const uid = currentUser.uid
  // mapbox map
  const map = useSelector((state) => state.general.map)
  const setMap = (map) => dispatch(setMapAction(map))
  // select inputs state
  const [propType, setType] = useState(
    storedProperty ? storedProperty?.propType : 'Casa'
  )

  const handleType = (event) => {
    setType(event.target.value)
  }

  const [operation, setOperation] = useState(
    storedProperty ? storedProperty?.operation : 'Venta'
  )

  const handleOperation = (event) => {
    setOperation(event.target.value)
    setValue('percent', 5)
  }

  // image local files
  const [imgFiles, setImgFiles] = useState([])
  // local (images view)
  const [imgRefs, setImgRefs] = useState([])

  const [updateImages, setUpdateImages] = useState(!routeLocation)

  // stepper state
  const activeStep = useSelector((state) => state.general.activeStep)
  const setStep = (step) => dispatch(setStepAction(step))

  // activar listener para boton de upload i2mages
  useEffect(() => {
    // on edit
    if (storedProperty) {
      setMap(storedProperty?.map)
    }
    console.log('prop form mounted')
    return () => {
      console.log('prop form umounted')
    }
  }, [])

  // errors alert
  useEffect(() => {
    for (const [key] of Object.entries(errors)) {
      if (errors[key]) {
        alert.setMessage(errors[key].message)
        return
      }
    }
  }, [errors])

  const uploadImages = (docRef) => {
    const id = docRef.id
    console.log(id)
    console.log('uploading')
    const progressBar = document.getElementById('progressBar')
    Array.prototype.forEach.call(imgFiles, async (imgFile) => {
      const { firebase } = await import('./../../base')

      // create storage ref
      const storageRef = firebase
        .storage()
        .ref(`properties/${currentUser.uid}/${id}/${imgFile.name}`)
      // upload file
      const task = storageRef.put(imgFile)
      //
      console.log(storageRef)

      // update progress bar
      const unsuscribe = task.on(
        'state_changed',
        function progress (snap) {
          if (progressBar) {
            const percentage = (snap.bytesTransferred / snap.totalBytes) * 100
            progressBar.value = percentage
          }
        },
        function error (err) {
          console.log(err)
        },
        async function complete () {
          if (storedProperty) {
            await docRef.set(
              {
                photos: []
              },
              { merge: true }
            )
          }

          // unsuscribe
          unsuscribe()

          // Upload completed successfully, now we can get the download URL
          task.snapshot.ref.getDownloadURL().then(async (downloadURL) => {
            const { firebase } = await import('./../../base')

            // update photos atribute (array) of the prop doc
            docRef.set(
              {
                photos: firebase.firestore.FieldValue.arrayUnion(downloadURL)
              },
              { merge: true }
            )

            setStep(activeStep + 1)
          })
        }
      )
    })
  }

  const submit = async (data) => {
    const { percent, parkings, area, bathrooms, dormitories, price } = data

    if (percent > 9) {
      alert.setMessage('La comisión no puede ser mayor a 9%.')
      return
    }

    if (parkings) {
      data.parkings = Number(parkings)
    }

    if (area) {
      data.area = Number(area)
    }

    if (bathrooms) {
      data.bathrooms = Number(bathrooms)
    }

    if (dormitories) {
      data.dormitories = Number(dormitories)
    }

    data.price = Number(price)

    if (imgFiles.length === 0 && !location) {
      alert.setMessage('Debes agregar una o varias fotos')
      return
    }

    if (map.address === '') {
      alert.setMessage('Debes marcar una ubicación en el mapa')
      return
    }
    const { app, firebase } = await import('./../../base')

    let ref = app.firestore().collection('properties')
    // comission
    const comission = {
      percent: Number(percent),
      value: price * percent * 0.01
    }
    delete data.percent
    // edit and create
    let property = {
      ...data,
      map,
      comission,
      propType,
      operation,
      uid,
      date: firebase.firestore.Timestamp.now()
    }

    if (storedProperty) {
      // on edit
      ref = ref.doc(storedProperty?.id)
      property = { ...property, id: storedProperty?.id }
    } else {
      // on create
      ref = ref.doc()
      const id = ref.id
      property = { ...property, id: id }
    }

    // create or update firestore doc
    ref.set(property, { merge: true }).then(() => {
      if (storedProperty) {
        // on edit
        if (updateImages && imgFiles.length > 0) {
          // upload loaded images to firestore storage
          uploadImages(ref)
        }
      } else {
        // on create
        uploadImages(ref)
      }
      // redirect to mypanel, reset selected prop (forces list refresh)
      if (storedProperty) {
        history.push({
          pathname: '/Home/MyPanel',
          tab: 0
        })
      }
    })
    // reset map
    setMap({
      lat: 0,
      lng: 0,
      zoom: 1,
      snapUrl: '',
      address: ''
    })
  }

  return (
    <FormLayout>
      <form onSubmit={handleSubmit(submit)}>
        <Typography style={{ color: 'white' }} variant="h6" gutterBottom>
          Características del Inmueble
        </Typography>
        {/* button added to prevent any implicit submition of the form from conflicting with geocoder input behaviour */}
        {/* for more details please refer to: https://stackoverflow.com/questions/895171/prevent-users-from-submitting-a-form-by-hitting-enter */}
        {/* https://www.w3.org/TR/2018/SPSD-html5-20180327/forms.html#implicit-submission */}
        <button
          type="submit"
          disabled
          style={{ display: 'none' }}
          aria-hidden="true"
        />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <Controller
              as={
                <TextField
                  inputProps={{ maxLength: 60 }}
                  fullWidth
                  label="Título de publicación"
                  variant="outlined"
                  data-cy="title"
                  helperText={
                    errors.title?.type === 'minLength'
                      ? 'Mínimo 30 caracteres'
                      : '' + errors.title?.type === 'required'
                        ? 'Título obligatorio'
                        : ''
                  }
                />
              }
              name="title"
              control={control}
              defaultValue={storedProperty ? storedProperty?.title : ''}
              rules={{
                required: 'Debes ingresar el título de la propiedad',
                minLength: {
                  value: 30,
                  message: 'El título debe tener al menos 30 caracteres'
                },
                maxLength: 60
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl variant="outlined" className={classes.formControl}>
              <Select
                native
                inputProps={{
                  'data-cy': 'property-type'
                }}
                onChange={handleType}
                value={propType}
              >
                <option value={'Casa'}>Casa</option>
                <option value={'Casa Rentera'}>Casa Rentera</option>
                <option value={'Terreno'}>Terreno</option>
                <option value={'Bodega'}>Bodega</option>
                <option value={'Consultorio'}>Consultorio</option>
                <option value={'Departamento'}>Departamento</option>
                <option value={'Duplex'}>Duplex</option>
                <option value={'Edificio'}>Edificio</option>
                <option value={'Hacienda'}>Hacienda</option>
                <option value={'Hotel'}>Hotel</option>
                <option value={'Loft'}>Loft</option>
                <option value={'Oficina'}>Oficina</option>
                <option value={'Villa'}>Villa</option>
                <option value={'Suite'}>Suite</option>
                <option value={'Galpon'}>Galpón</option>
                <option value={'Local Comercial'}>Local Comercial</option>
                <option value={'Otros'}>Otros</option>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">
                Operación
              </InputLabel>
              <Select
                native
                inputProps={{
                  'data-cy': 'operation'
                }}
                onChange={handleOperation}
                label="Inmueble"
                value={operation}
              >
                <option value={'Venta'}>Venta</option>
                <option value={'Alquiler'}>Alquiler</option>
                <option value={'Anticresis'}>Anticresis</option>
              </Select>
            </FormControl>
          </Grid>
          {propType !== 'Terreno' && (
            <Grid item xs={12} sm={6}>
              <TextField
                inputRef={register({
                  required: 'Debes ingresar el número de baños'
                })}
                helperText={
                  errors.bathrooms && 'Debes ingresar el número de baños'
                }
                defaultValue={storedProperty ? storedProperty?.bathrooms : ''}
                id="bathrooms"
                name="bathrooms"
                label="Baños"
                type="number"
                InputLabelProps={{
                  shrink: true
                }}
                variant="outlined"
              />
            </Grid>
          )}

          {propType !== 'Terreno' && (
            <Grid item xs={12} sm={6}>
              <TextField
                inputRef={register({
                  required: 'Debes ingresar el número de parqueaderos'
                })}
                helperText={
                  errors.parkings && 'Debes ingresar el número de parqueaderos'
                }
                defaultValue={storedProperty ? storedProperty?.parkings : ''}
                id="parkings"
                name="parkings"
                label="Parqueaderos"
                type="number"
                InputLabelProps={{
                  shrink: true
                }}
                variant="outlined"
              />
            </Grid>
          )}

          {propType !== 'Terreno' && (
            <Grid item xs={12} sm={6}>
              <TextField
                inputRef={register({
                  required: 'Debes ingresar el número de dormitorios'
                })}
                helperText={
                  errors.dormitories &&
                  'Debes ingresar el número de dormitorios'
                }
                defaultValue={storedProperty ? storedProperty?.dormitories : ''}
                id="dormitories"
                name="dormitories"
                label="Dormitorios"
                type="number"
                InputLabelProps={{
                  shrink: true
                }}
                variant="outlined"
              />
            </Grid>
          )}

          <Grid item xs={12} sm={6}>
            <TextField
              inputRef={register({ required: 'Debes ingresar el área' })}
              helperText={errors.area && 'Debes ingresar el área'}
              defaultValue={storedProperty ? storedProperty?.area : ''}
              id="area"
              name="area"
              label="Area m²"
              type="number"
              InputLabelProps={{
                shrink: true
              }}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              inputRef={register({
                required: 'Debes ingresar la descripción de la propiedad'
              })}
              helperText={errors.description && 'Debes ingresar la descripción'}
              defaultValue={storedProperty ? storedProperty?.description : ''}
              name="description"
              id="description"
              label="Descripción"
              fullWidth
              inputProps={{ maxLength: 600 }}
              multiline
              autoComplete="billing address-line1"
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <Typography style={{ color: 'white' }} variant="h6" gutterBottom>
              Fotos
            </Typography>

            <div className={classes.placeholder}>(5 máximo)</div>
            {storedProperty && (
              <div>
                <Typography gutterBottom>
                  ¿Quieres actualizar las fotos?
                </Typography>
                <Switch
                  checked={updateImages}
                  onChange={() => setUpdateImages(!updateImages)}
                  name="checkedB"
                />
              </div>
            )}
          </Grid>

          <Grid align="left" item xs={12}>
            <Box display={updateImages ? 'inline' : 'none'}>
              {/* imgs preview if img references exists */}
              {imgRefs.length > 0 && <ImagesPreview urls={imgRefs} />}
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
              <Map defaultMap={storedProperty?.map || null} />
            </Suspense>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              onClick={
                operation === 'Alquiler'
                  ? () => hidePicker(false)
                  : () => console.log('venta')
              }
              inputRef={register({
                required:
                  'Debes ingresar el porcentaje que estás dispuesto a compartir'
              })}
              helperText={
                errors.percent
                  ? 'Debes ingresar el porcentaje'
                  : 'Porcentaje que estás dispuesto a compartir'
              }
              defaultValue={
                storedProperty ? storedProperty?.comission?.percent : null
              }
              id="percent"
              name="percent"
              label={operation === 'Venta' ? ' % Comisión' : ' % del canon '}
              type="number"
              InputLabelProps={{
                shrink: true
              }}
              InputProps={{
                readOnly: operation === 'Alquiler'
              }}
              inputProps={{
                step: 0.1
              }}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl
              fullWidth
              className={classes.margin}
              variant="outlined"
            >
              <InputLabel htmlFor="price">Precio</InputLabel>
              <OutlinedInput
                inputRef={register({
                  required: 'Debes ingresar el precio de la propiedad'
                })}
                defaultValue={storedProperty ? storedProperty?.price : ''}
                id="price"
                name="price"
                type="number"
                inputProps={{
                  step: 0.1
                }}
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button variant="outlined" type="submit" className={classes.button}>
              PUBLICAR
            </Button>
          </Grid>
        </Grid>
        <Modal open={!pickerHidden} onClose={() => hidePicker(true)}>
          {pickerBody}
        </Modal>
      </form>
    </FormLayout>
  )
}

PropertyForm.propTypes = {
  location: PropTypes.object
}
