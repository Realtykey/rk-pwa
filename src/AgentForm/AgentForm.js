import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useAlert } from 'src/components/globals/Alert'
import { AuthContext } from '../Auth.js'
import User from 'src/lib/user'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 160,
    color: 'white'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1)
  }
}))

export function AgentForm () {
  // select state
  const { currentUser } = useContext(AuthContext)
  const { userData } = useSelector((state) => state.general)
  const history = useHistory()
  const alert = useAlert()

  // image local files
  const [imgFiles, setImgFiles] = useState([])
  // local (images view)
  const [imgRefs, setImgRefs] = useState([])

  const uploadImages = (docRef) => {
    const progressBar = document.getElementById('progressBar')
    Array.prototype.forEach.call(imgFiles, async (imgFile) => {
      const { firebase } = await import('./../base')

      // create storage ref
      const storageRef = firebase
        .storage()
        .ref(`users/${currentUser.uid}/${imgFile.name}`)
      // upload file
      const task = storageRef.put(imgFile)

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
        async function complete (err) {
          console.log(err)
          // unsuscribe
          unsuscribe()

          // Upload completed successfully, now we can get the download URL
          const downloadUrl = await task.snapshot.ref.getDownloadURL()

          // update photos atribute (array) of the prop doc
          await docRef.set(
            {
              photoUrl: downloadUrl
            },
            { merge: true }
          )

          document.location.reload()
        }
      )
    })
  }

  const onPhotoSelect = () => {
    const fileButton = document.getElementById('fileButton')
    fileButton.addEventListener('change', function (e) {
      // get file or files
      const files = fileButton.files
      setImgFiles(files)
      console.log(files)
      const urls = []
      // extract images urls
      Array.prototype.forEach.call(files, (file) => {
        const url = window.URL.createObjectURL(file).toString()
        console.log(url)
        urls.push(url)
      })

      console.log(urls)
      // images loaded
      setImgRefs(urls)
      console.log('urls array size ' + urls)
    })
  }

  const ciExists = async (ci) => {
    const { app } = await import('./../base')
    const docRef = app.firestore().collection('users').where('ci', '==', ci)

    const snap = await docRef.get()

    return snap?.docs?.length > 0
  }

  const onSubmit = async (data) => {
    const { app } = await import('./../base')

    const {
      name,
      lname = null,
      ci,
      phone,
      experience,
      licenseCode = null,
      province,
      city
    } = data

    const exists = await ciExists(ci)
    if (exists) {
      if (ci === userData.ci) {
        console.log('misma cédula')
      } else {
        alert.setMessage('Ya existe un usuario con ese número de cédula')
        return
      }
    }

    const user = {
      uid: currentUser.uid,
      name,
      lname,
      ci,
      phone,
      address: '',
      experience,
      licenseCode,
      province,
      city
    }

    if (!userData.role && licenseCode) {
      user.role = 'Agente inmobiliario'
    }

    const ref = app.firestore().collection('users').doc(currentUser.uid)
    await ref.set(user, { merge: true })

    if (imgFiles.length === 0) {
      document.location.reload()
      return
    }

    await uploadImages(ref)
  }

  const classes = useStyles()

  return (
    <Container className={classes.root}>
      <Typography color="inherit" variant="h6" gutterBottom>
        Información de usuario
      </Typography>
      {userData && (
        <UserForm
          onSubmit={onSubmit}
          onPhotoSelect={onPhotoSelect}
          userData={userData}
        />
      )}
    </Container>
  )
}

const UserForm = (props) => {
  const { onSubmit, onPhotoSelect, userData } = props
  const { handleSubmit, register, errors } = useForm()
  const classes = useStyles()

  useEffect(() => {
    for (const [key] of Object.entries(errors)) {
      if (errors[key]) {
        alert.setMessage(errors[key].message)
        return
      }
    }
  }, [errors])

  useEffect(() => {
    onPhotoSelect()
  }, [])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          sm={userData.role === 'Agencia inmobiliaria' ? 12 : 6}
        >
          <TextField
            defaultValue={userData.name}
            inputRef={register({
              required: 'Debes ingresar tu nombre'
            })}
            autoComplete="fname"
            name="name"
            variant="outlined"
            fullWidth
            id="firstName"
            label={
              userData.role === 'Agencia inmobiliaria'
                ? 'Nombre de agencia'
                : 'Nombre'
            }
            autoFocus
          />
        </Grid>
        {userData.role !== 'Agencia inmobiliaria' && (
          <Grid item xs={12} sm={6}>
            <TextField
              defaultValue={userData.lname}
              inputRef={register({
                required: 'Debes ingresar tu apellido'
              })}
              autoComplete="lname"
              name="lname"
              variant="outlined"
              fullWidth
              id="lname"
              label="Apellido"
              autoFocus
            />
          </Grid>
        )}
        <Grid item xs={12} sm={6}>
          <TextField
            defaultValue={userData.ci}
            inputRef={register({
              required: 'Cédula obligatoria',
              minLength: {
                value: 10,
                message: 'Tu cédula debe tener al menos 10 dígitos'
              },
              maxLength: {
                value: 10,
                message: 'Tu cédula no puede tener mas de 10 dígitos'
              }
            })}
            id="ci"
            name="ci"
            label="Cédula"
            autoComplete="billing address-line1"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            defaultValue={userData.phone}
            inputRef={register({
              required: 'Número de celular obligatorio',
              minLength: {
                value: 10,
                message: 'Tu número debe tener al menos 10 dígitos'
              },
              maxLength: {
                value: 10,
                message: 'Tu número no puede tener mas de 10 dígitos'
              }
            })}
            type="number"
            id="phone"
            name="phone"
            label="Celular"
            autoComplete="billing address-line1"
            variant="outlined"
          />
        </Grid>
        {userData.role === 'Agente inmobiliario' && (
          <Grid item xs={12} sm={6}>
            <TextField
              defaultValue={userData.licenseCode}
              inputRef={register({
                required: userData.licenseCode
                  ? 'Numero de licencia obligatorio'
                  : false
              })}
              id="licenseCode"
              name="licenseCode"
              label="Numero de licencia"
              type="text"
              InputLabelProps={{
                shrink: true
              }}
              variant="outlined"
            />
          </Grid>
        )}
        <Grid item xs={12} sm={6}>
          <TextField
            defaultValue={userData.province}
            inputRef={register({
              required: 'Debes ingresar tu provincia'
            })}
            variant="outlined"
            fullWidth
            id="province"
            label="Provincia"
            name="province"
            autoComplete="province"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            defaultValue={userData.city}
            inputRef={register({
              required: 'Debes ingresar tu ciudad'
            })}
            variant="outlined"
            fullWidth
            id="city"
            label="Ciudad"
            name="city"
            autoComplete="city"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            defaultValue={userData.experience}
            inputRef={register({
              required: userData.experience
                ? 'Debes ingresar tu experiencia'
                : false
            })}
            name="experience"
            id="experience"
            label="Experiencia (años)"
            type="number"
            InputLabelProps={{
              shrink: true
            }}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <label htmlFor="fileButton">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCamera />
            </IconButton>
          </label>

          <input
            hidden="hidden"
            accept="image/*"
            className={classes.input}
            id="fileButton"
            type="file"
          />

          <progress id="progressBar" value="0" max="100">
            {' '}
          </progress>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className={classes.button}
          >
            Guardar
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

UserForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onPhotoSelect: PropTypes.func.isRequired,
  userData: PropTypes.shape(User).isRequired
}

export default AgentForm
