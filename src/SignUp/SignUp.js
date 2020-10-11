import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import InputBase from '@material-ui/core/InputBase';
import Switch from '@material-ui/core/Switch';

//auth routing
import { withRouter } from "react-router";
import React,{useState} from "react";

/*ENRUTAMIENTO*/
import {
  Link,
} from "react-router-dom";

function Copyright() {
  const classes = useStyles();

  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link className={classes.link} color="inherit" to="https://material-ui.com/">
        Valeria
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    color: 'white'
  },

}));

const saveUserDoc = async (userDoc) => {
  const { app } = await import('./../base');

  const ref = app.firestore().collection('users').doc(userDoc.uid);

  return ref.set(userDoc, { merge: true });
};

function SignUp() {
  const classes = useStyles();
  const history = useHistory();
  const { handleSubmit, register } = useForm();
  const [license,hideLicense] = useState(false);

  const submit = async data => {
    const { name, lname, email, password, address, phone } = data;
    console.log(data);
    try {
      //firebase auth
      const { app } = await import('./../base');
      await app.auth().createUserWithEmailAndPassword(email, password);

      const unsuscribe = app.auth().onAuthStateChanged((user) => {
        if (user) {
          saveUserDoc(
            {
              uid: user.uid,
              name,
              lname,
              email,
              address,
              phone,
              photoUrl: '',
              experience: 0,
              licenseCode: "",
              roles: [],
              role:"",
              score: 0,
              status: "Miembro",
              sells: 0,
              ci:"",
              roles:[]
            }
          );
          unsuscribe();
          console.log('user created, listener removed');
          history.push('/Home');
        }
      }
      );

    } catch (error) {
      alert(error);
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
            <Grid item xs={12} sm={6}>
              <TextField
                inputRef={register({ required: true })}
                autoComplete="fname"
                name="name"
                variant="outlined"
                fullWidth
                id="firstName"
                label="Nombre"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                inputRef={register({ required: true })}
                autoComplete="lname"
                name="lname"
                variant="outlined"
                fullWidth
                id="lname"
                label="Apellido"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                inputRef={register({ required: true })}
                autoComplete="phone"
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
                id="address"
                label="Dirección"
                name="address"
                autoComplete="address"
              />
            </Grid>
            <Grid item xs={12}>
            Tienes licencia?
            <Switch checked={license} onChange={() => hideLicense(!license)} name="checkedB" />
              {license==true && <TextField
                inputRef={register({ required: true })}
                variant="outlined"
                fullWidth
                id="licenseCode"
                label="Licencia"
                name="licenseCode"
                autoComplete="licenseCode"
              />
              }
            </Grid>
            <Grid item xs={12}>
              <TextField
                inputRef={register({ required: true })}
                variant="outlined"
                fullWidth
                id="email"
                label="Correo"
                name="email"
                autoComplete="email"
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
            <Grid item xs={12}>
              {/* <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="Recibir noticias y actualizaciones"
              /> */}
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            className={classes.submit}
          >Registrarse</Button>
          <Grid container justify="flex-end">

            <Grid item>
              <Link className={classes.link} to="/SignIn" variant="body2">
                {"¿Ya tienes una cuenta?"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default SignUp;