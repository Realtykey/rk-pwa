import React, { useState } from 'react'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import HomeWorkIcon from '@material-ui/icons/HomeWork'
import { useHistory, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Switch from '@material-ui/core/Switch'

import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Person from '@material-ui/icons/Person'
import Store from '@material-ui/icons/Store'

import ChipsInput from '../ChipsInput'

function Copyright () {
  const classes = useStyles()

  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link
        className={classes.link}
        color="inherit"
        to="https://material-ui.com/"
      >
        Valeria
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  link: {
    color: 'white'
  }
}))

const saveUserDoc = async (userDoc) => {
  const { app } = await import('./../base')

  const ref = app.firestore().collection('users').doc(userDoc.uid)

  return ref.set(userDoc, { merge: true })
}

const ciExists = async (ci) => {
  const { app } = await import('./../base')
  const docRef = app.firestore().collection('users').where('ci', '==', ci)

  const snap = await docRef.get()

  return snap?.docs?.length > 0
}

function SignUp () {
  const classes = useStyles()
  const history = useHistory()
  const { handleSubmit, register } = useForm()

  const [license, setLicense] = useState(false)

  const [selectedIndex, setSelectedIndex] = React.useState('')

  const [sectors, onSectorSelected] = useState({
    north: { label: 'Norte', selected: false },
    south: { label: 'Sur', selected: false },
    center: { label: 'Centro', selected: false },
    valleys: { label: 'Valles', selected: false }
  })

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index)
  }

  const submit = async (data) => {
    const {
      name,
      lname,
      email,
      password,
      phone,
      licenseCode,
      ci,
      experience,
      province,
      city
    } = data

    const exists = await ciExists(ci)
    console.log(`ci exists: ${exists}`)
    if (exists) {
      alert('Ya existe un usuario con ese número de cédula')
      return
    }

    if (experience) {
      if (experience > 30) {
        alert('No es posible ingresar mas de 30 años de experiencia')
        return
      }
    }

    try {
      const { app } = await import('./../base')
      await app.auth().createUserWithEmailAndPassword(email, password)

      const unsuscribe = app.auth().onAuthStateChanged((user) => {
        if (user) {
          const selectedSectors = Object.entries(sectors).filter((sector) => sector.selected).map(([key]) => key)
          debugger
          saveUserDoc({
            uid: user.uid,
            name,
            lname: lname ?? null, // agencys should have null lname
            email,
            address: '',
            phone,
            photoUrl: '',
            experience: '',
            licenseCode: licenseCode ?? '',
            roles: [],
            role: selectedIndex,
            score: 0,
            status: 'Miembro',
            sells: 0,
            ci,
            province,
            city,
            sectors: selectedSectors
          })
          unsuscribe()
          history.push('/Home')
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <HomeWorkIcon />
        </Avatar>
        <Typography component="h1" variant="h4">
          RealtyKey
        </Typography>

        <Typography component="h2" variant="h5">
          Registrarse
        </Typography>

        <form className={classes.form} onSubmit={handleSubmit(submit)}>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sm={selectedIndex !== 'Agencia inmobiliaria' ? 6 : 12}
            >
              <TextField
                inputRef={register}
                name="name"
                variant="outlined"
                fullWidth
                id="firstName"
                label={
                  selectedIndex === 'Agencia inmobiliaria'
                    ? 'Nombre de agencia'
                    : 'Nombre'
                }
                autoFocus
              />
            </Grid>
            {selectedIndex !== 'Agencia inmobiliaria' && (
              <Grid item xs={12} sm={6}>
                <TextField
                  inputRef={register({ required: true })}
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
                inputRef={register({ required: true })}
                name="phone"
                variant="outlined"
                fullWidth
                id="phone"
                label="Celular"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                inputRef={register({ required: true })}
                variant="outlined"
                fullWidth
                id="province"
                label="Provincia"
                name="province"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                inputRef={register({ required: true })}
                variant="outlined"
                fullWidth
                id="city"
                label="Ciudad"
                name="city"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                inputRef={register}
                variant="outlined"
                fullWidth
                id="experience"
                label="Experiencia en años"
                name="experience"
                type="number"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                inputRef={register({ required: true })}
                variant="outlined"
                fullWidth
                id="ci"
                label="Cédula o RUC"
                name="ci"
              />
            </Grid>
            <Grid item xs={12} sm={6} />
            <Grid item xs={12} sm={12}>
              <ChipsInput onChipSelected={onSectorSelected} chips={sectors} />
            </Grid>
            <Grid item xs={12}>
              <ListItem
                button
                selected={selectedIndex === 'Agente inmobiliario'}
                onClick={(event) => {
                  if (selectedIndex === 'Agente inmobiliario') {
                    handleListItemClick(event, '')
                    return
                  }
                  handleListItemClick(event, 'Agente inmobiliario')
                }}
              >
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                <ListItemText primary="Agente inmobiliario" />
              </ListItem>

              {selectedIndex === 'Agente inmobiliario' && (
                <Grid item xs={12}>
                  ¿Tienes licencia ACBIR?
                  <Switch
                    checked={license}
                    onChange={() => setLicense(!license)}
                    name="checkedB"
                  />
                  {license === true && (
                    <TextField
                      inputRef={register({ required: true })}
                      variant="outlined"
                      fullWidth
                      id="licenseCode"
                      label="Reg. Nº"
                      name="licenseCode"
                    />
                  )}
                </Grid>
              )}

              <ListItem
                button
                selected={selectedIndex === 'Agencia inmobiliaria'}
                onClick={(event) => {
                  if (selectedIndex === 'Agencia inmobiliaria') {
                    handleListItemClick(event, '')
                    return
                  }
                  handleListItemClick(event, 'Agencia inmobiliaria')
                }}
              >
                <ListItemIcon>
                  <Store />
                </ListItemIcon>
                <ListItemText primary="Agencia inmobiliaria" />
              </ListItem>
            </Grid>
            <Grid item xs={12}>
              <TextField
                inputRef={register({ required: true })}
                variant="outlined"
                fullWidth
                id="email"
                label="Correo"
                name="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                inputRef={register({ required: true })}
                variant="outlined"
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            className={classes.submit}
          >
            Registrarse
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link className={classes.link} to="/SignIn" variant="body2">
                {'¿Ya tienes una cuenta?'}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  )
}

export default SignUp
