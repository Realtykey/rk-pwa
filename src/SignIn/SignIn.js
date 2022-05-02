import React, { useCallback } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'

import { useAlert } from '../components/globals/Alert'

function Copyright () {
  const classes = useStyles()

  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link className={classes.link} to="https://material-ui.com/">
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
    margin: theme.spacing(1)
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  link: {
    color: 'white'
  }
}))

function SignIn () {
  const classes = useStyles()
  const history = useHistory()
  const alert = useAlert()

  const handleLogin = useCallback(async (event) => {
    event.preventDefault()
    const { email, password } = event.target.elements

    const { app } = await import('./../base')

    try {
      await app.auth().signInWithEmailAndPassword(email.value, password.value)
      history.push('/Home')
    } catch (exception) {
      let authErrorMessage
      switch (exception.code) {
        case 'auth/invalid-email':
          authErrorMessage = 'Correo no válido'
          break
        case 'auth/user-disabled':
          authErrorMessage = 'Usuario deshabilitado'
          break
        case 'auth/user-not-found':
          authErrorMessage = 'Usuario no registrado'
          break
        case 'auth/wrong-password':
          authErrorMessage = 'Credenciales incorrectas'
          break
        case 'auth/too-many-requests':
          authErrorMessage = 'Demasiados intentos, intente más tarde'
          break
        default:
          authErrorMessage = 'Servicio no disponible'
      }
      alert.setMessage(authErrorMessage)
    }
  }, [])

  const img = {
    width: '100%',
    heigh: '100%'
  }

  const wrapper = {
    width: 100,
    height: 100
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <div className={classes.avatar}>
          <div style={wrapper}>
            <img style={img} src="imagotipo.png"></img>
          </div>
        </div>
        <Typography component="h1" variant="h4">
          RealtyKey
        </Typography>

        <Typography component="h2" variant="h5">
          Entrar
        </Typography>

        <form onSubmit={handleLogin} className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Ingresar
          </Button>
          <Grid container>
            <Grid item xs>
              {/* <Link className={classes.link} to="/" variant="body2">
                Olvidé mi contraseña
              </Link> */}
            </Grid>
            <Grid item>
              <Link
                data-cy="register-link"
                className={classes.link}
                to="/SignUp"
                variant="body2"
              >
                {'No tienes una cuenta? Registrarse'}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  )
}

export default SignIn
