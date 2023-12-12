import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import PhotoCamera from "@material-ui/icons/PhotoCamera";

import FilePicker from "src/components/globals/FilePicker/FilePicker";

import { Avatar, Button, Grid, IconButton, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { useAlert } from "src/components/globals/Alert";

import { db } from "src/base";

import User from "src/models/User";

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

interface UserFormProps {
  currentUser: firebase.User;
  userData: User;
}

type UserFields = {
  name: User["name"];
  lname: User["lname"];
  ci: User["ci"];
  phone: User["phone"];
  experience: User["experience"];
  licenseCode: User["licenseCode"];
  province: User["province"];
  city: User["city"];
  image: File;
};

export default function UserForm({ currentUser, userData }: UserFormProps) {
  const { handleSubmit, register, control, errors } = useForm<UserFields>();

  const classes = useStyles();
  const alert = useAlert();

  const ciExists = async (ci: string) => {
    const docRef = db.collection("users").where("ci", "==", ci);

    const snap = await docRef.get();

    return snap?.docs?.length > 0;
  };

  const onSubmit: SubmitHandler<UserFields> = async (data) => {
    const exists = await ciExists(data.ci);
    if (exists) {
      if (data.ci === userData.ci) {
        console.log("misma cédula");
      } else {
        alert.setMessage("Ya existe un usuario con ese número de cédula");
        return;
      }
    }
    const response = await User.save(
      {
        uid: currentUser.uid,
        name: data.name,
        lname: data.lname,
        ci: data.ci,
        phone: data.phone,
        experience: data.experience,
        licenseCode: data.licenseCode,
        province: data.province,
        city: data.city,
        role: userData.role,
      },
      data.image as File
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid
          container
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          justify="center"
        >
          <Controller
            control={control}
            name="image"
            render={({ onChange, value }) => (
              <FilePicker
                value={value}
                onChange={onChange}
                accept="image"
                render={(file) => (
                  <>
                    {file ? (
                      <>
                        <img
                          width={100}
                          height={100}
                          style={{ borderRadius: "100%" }}
                          src={URL.createObjectURL(file)}
                        />
                      </>
                    ) : (
                      <div
                        style={{
                          position: "relative",
                          width: 100,
                          height: 100,
                        }}
                      >
                        <Avatar style={{ width: "100%", height: "100%" }} />
                        <IconButton
                          style={{
                            position: "absolute",
                            bottom: -10,
                            right: -10,
                            color: "white",
                          }}
                          color="primary"
                          component="span"
                        >
                          <PhotoCamera fontSize="default" />
                        </IconButton>
                      </div>
                    )}
                  </>
                )}
              />
            )}
          />
        </Grid>
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
            error={!!errors.name}
            helperText={errors.name?.message}
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
              error={!!errors.lname}
              helperText={errors.lname?.message}
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
            error={!!errors.ci}
            helperText={errors.ci?.message}
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
            error={!!errors.phone}
            helperText={errors.phone?.message}
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
              error={!!errors.licenseCode}
              helperText={errors.licenseCode?.message}
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
            error={!!errors.province}
            helperText={errors.province?.message}
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
            error={!!errors.city}
            helperText={errors.city?.message}
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
            error={!!errors.experience}
            helperText={errors.experience?.message}
          />
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
