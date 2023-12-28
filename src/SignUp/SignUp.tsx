import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import HomeWorkIcon from "@material-ui/icons/HomeWork";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Person from "@material-ui/icons/Person";
import Store from "@material-ui/icons/Store";

import ChipsInput, { ChipItem } from "src/ChipsInput";
import AppAuth from "src/models/AppAuth";
import User from "src/models/User";

function Copyright() {
  const classes = useStyles();

  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link
        className={classes.link}
        color="inherit"
        to="https://material-ui.com/"
      >
        Valeria
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    color: "white",
  },
}));

const validateIdentification = async (ci: string) => {
  const { app } = await import("../base");
  const docRef = app.firestore().collection("users").where("ci", "==", ci);

  const snap = await docRef.get();

  return !snap.empty;
};

interface UserFields
  extends Pick<
    User,
    | "name"
    | "email"
    | "lname"
    | "ci"
    | "phone"
    | "experience"
    | "licenseCode"
    | "province"
    | "city"
    | "photoUrl"
    | "role"
  > {
  password: string;
  passwordConfirm: string;
}

function SignUp() {
  const classes = useStyles();
  const history = useHistory();

  const { handleSubmit, register, watch, control } = useForm<UserFields>();

  const [license, setLicense] = useState(false);

  const fields = watch();

  const [sectors, setSectors] = useState<ChipItem[]>([]);

  const submit: SubmitHandler<UserFields> = async (data) => {
    const exists = await validateIdentification(data.ci);

    if (exists) {
      alert("Ya existe un usuario con ese número de cédula");
      return;
    }

    if (data.experience > 30) {
      alert("No es posible ingresar mas de 30 años de experiencia");
      return;
    }

    try {
      await AppAuth.register(
        {
          name: data.name,
          lname: data.lname,
          email: data.email,
          ci: data.ci,
          phone: data.phone,
          experience: data.experience,
          licenseCode: data.licenseCode,
          province: data.province,
          city: data.city,
          photoUrl: data.photoUrl,
          role: data.role,
          sectors: sectors.map((sector) => sector.value),
          address: "",
          roles: [],
          score: 0,
          sells: 0,
          status: "active",
        },
        data.password
      );
      // history.push("/Home");
    } catch (error) {
      console.error(error);
    }
  };

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
            <Grid item xs={12} sm={fields.role !== "agency" ? 6 : 12}>
              <TextField
                inputRef={register}
                name="name"
                variant="outlined"
                fullWidth
                id="firstName"
                label={fields.role === "agent" ? "Nombre de agencia" : "Nombre"}
                autoFocus
              />
            </Grid>
            {fields.role !== "agency" && (
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
            <Grid item xs={12} sm={12}>
              <ChipsInput
                values={sectors}
                onChange={(newValues) => setSectors(newValues)}
                options={[
                  { label: "Norte", value: "north" },
                  { label: "Sur", value: "south" },
                  { label: "Centro", value: "center" },
                  { label: "Valles", value: "valleys" },
                ]}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="role"
                control={control}
                render={({ onChange, value }) => (
                  <>
                    <ListItem
                      button
                      selected={value === "agent"}
                      onClick={() => onChange("agent")}
                    >
                      <ListItemIcon>
                        <Person />
                      </ListItemIcon>
                      <ListItemText primary="Agente inmobiliario" />
                    </ListItem>

                    {fields.role === "agent" && (
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
                      selected={value === "agency"}
                      onClick={() => onChange("agency")}
                    >
                      <ListItemIcon>
                        <Store />
                      </ListItemIcon>
                      <ListItemText primary="Agencia inmobiliaria" />
                    </ListItem>
                  </>
                )}
              />
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
              <Link className={classes.link} to="/SignIn">
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
