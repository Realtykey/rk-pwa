import React, { useEffect } from "react";
import PropTypes from "prop-types";

import { Button, Grid, IconButton, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { useForm } from "react-hook-form";

import PhotoCamera from "@material-ui/icons/PhotoCamera";

import User from "src/lib/user";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 160,
    color: "white",
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

export default function UserForm(props) {
  const { onPhotoSelect, userData } = props;
  const { handleSubmit, register, errors } = useForm();
  const classes = useStyles();

  useEffect(() => {
    for (const [key] of Object.entries(errors)) {
      if (errors[key]) {
        alert.setMessage(errors[key].message);
        return;
      }
    }
  }, [errors]);

  useEffect(() => {
    onPhotoSelect();
  }, []);

  const onSubmit = (data) => {
    console.log("data", data);
    // props.onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          sm={userData.role === "Agencia inmobiliaria" ? 12 : 6}
        >
          <TextField
            defaultValue={userData.name}
            inputRef={register({
              required: "Debes ingresar tu nombre",
            })}
            autoComplete="fname"
            name="name"
            variant="outlined"
            fullWidth
            id="firstName"
            label={
              userData.role === "Agencia inmobiliaria"
                ? "Nombre de agencia"
                : "Nombre"
            }
            autoFocus
          />
        </Grid>
        {userData.role !== "Agencia inmobiliaria" && (
          <Grid item xs={12} sm={6}>
            <TextField
              defaultValue={userData.lname}
              inputRef={register({
                required: "Debes ingresar tu apellido",
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
              required: "Cédula obligatoria",
              minLength: {
                value: 10,
                message: "Tu cédula debe tener al menos 10 dígitos",
              },
              maxLength: {
                value: 10,
                message: "Tu cédula no puede tener mas de 10 dígitos",
              },
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
              required: "Número de celular obligatorio",
              minLength: {
                value: 10,
                message: "Tu número debe tener al menos 10 dígitos",
              },
              maxLength: {
                value: 10,
                message: "Tu número no puede tener mas de 10 dígitos",
              },
            })}
            type="number"
            id="phone"
            name="phone"
            label="Celular"
            autoComplete="billing address-line1"
            variant="outlined"
          />
        </Grid>
        {userData.role === "Agente inmobiliario" && (
          <Grid item xs={12} sm={6}>
            <TextField
              defaultValue={userData.licenseCode}
              inputRef={register({
                required: userData.licenseCode
                  ? "Numero de licencia obligatorio"
                  : false,
              })}
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
        )}
        <Grid item xs={12} sm={6}>
          <TextField
            defaultValue={userData.province}
            inputRef={register({
              required: "Debes ingresar tu provincia",
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
              required: "Debes ingresar tu ciudad",
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
                ? "Debes ingresar tu experiencia"
                : false,
            })}
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
            {" "}
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
  );
}

UserForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onPhotoSelect: PropTypes.func.isRequired,
  userData: PropTypes.shape(User).isRequired,
};
