import React, { useContext, useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

//image picker
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

//select
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";


import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';

import { AuthContext } from "../Auth.js";
import { useForm } from "react-hook-form";


const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 160,
    color: 'white'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));



export function AgentForm() {

  //select state
  const { currentUser } = useContext(AuthContext);
  const { handleSubmit, register } = useForm();
  const userData = useSelector(state => state.general.userData)
  const history = useHistory();

  //image local files
  const [imgFiles, setImgFiles] = useState([]);
  // local (images view)
  const [imgRefs, setImgRefs] = useState([]);

  const uploadImages = (docRef) => {
    let id = docRef.id;
    console.log(id);
    console.log('uploading')
    var progressBar = document.getElementById('progressBar');
    Array.prototype.forEach.call(imgFiles,
      async (imgFile) => {

        const { firebase } = await import('./../base');

        //create storage ref
        let storageRef = firebase.storage().ref(`users/${currentUser.uid}/${imgFile.name}`);
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

            //unsuscribe
            unsuscribe();

            // Upload completed successfully, now we can get the download URL
            const downloadUrl = await task.snapshot.ref.getDownloadURL();
            const { firebase } = await import('./../base');

            //update photos atribute (array) of the prop doc
            await docRef.set({
              photoUrl: downloadUrl
            }, { merge: true });

            history.goBack();
            const {app} = await import('../base');
            await app.auth()
            .signOut();
          },
        )

      }
    );
  }

  useEffect(
    () => {

      var fileButton = document.getElementById('fileButton');
      fileButton.addEventListener('change', function (e) {
        //get file or files
        let files = fileButton.files;
        setImgFiles(files);
        console.log(files);
        var urls = [];
        //extract images urls
        Array.prototype.forEach.call(files,
          (file) => {
            let url = window.URL.createObjectURL(file).toString();
            console.log(url);
            urls.push(url);
          }
        )

        console.log(urls);
        //images loaded
        setImgRefs(urls);
        console.log('urls array size ' + urls)

      })
    },

    []
  )

  const submit = async data => {
    const { app } = await import('./../base');

    const { name, lname, ci, address, experience, licenseCode } = data;

    let user = {
      uid: currentUser.uid,
      name,
      lname,
      ci,
      address,
      experience,
      licenseCode
    };

    const ref = app.firestore().collection('users').doc(currentUser.uid);
    await ref.set(user, { merge: true });
    await uploadImages(ref);

    console.log('user data updated');
    alert('Guardado correctamente')

  }

  //saadasda
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Typography color="inherit" variant="h6" gutterBottom>
        Información personal
      </Typography>
      <form onSubmit={handleSubmit(submit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              defaultValue={userData ? userData.name : ""}
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
              defaultValue={userData ? userData.lname : ""}
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
              defaultValue={userData ? userData.ci : ""}
              inputRef={register({ required: true })}
              id="ci"
              name="ci"
              label="Cédula"
              autoComplete="billing address-line1"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              defaultValue={userData ? userData.licenseCode : ""}
              inputRef={register({ required: true })}
              id="licenseCode"
              name="licenseCode"
              label="Numero de licencia"
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              defaultValue={userData ? userData.address : ""}
              inputRef={register({ required: true })}
              id="address"
              name="address"
              label="Sector (Ciudad)"
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>

            <TextField
              defaultValue={userData ? userData.experience : 0}
              inputRef={register({ required: true })}
              name="experience"
              id="experience"
              label="Experiencia (años)"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />

          </Grid>
          <Grid item xs={12} sm={6}>
            <label htmlFor="fileButton">
              <IconButton color="primary" aria-label="upload picture" component="span">
                <PhotoCamera />
              </IconButton>
            </label>

            <input hidden="hidden" accept="image/*" className={classes.input} id="fileButton" type="file" />

            <progress id="progressBar" value="0" max="100"> </progress>
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
    </Container>
  );
}

export default AgentForm
