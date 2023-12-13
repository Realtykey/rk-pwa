import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button, Grid, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { useAlert } from "src/components/globals/Alert";
import FilePicker from "src/components/globals/FilePicker/FilePicker";
import AvatarInput from "src/components/users/AvatarInput";

import User from "src/models/User";

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

interface UserFormProps {
  currentUser: firebase.User;
  userData: User;
}

interface UserFields
  extends Pick<
    User,
    | "name"
    | "lname"
    | "ci"
    | "phone"
    | "experience"
    | "licenseCode"
    | "province"
    | "city"
    | "photoUrl"
  > {}

export default function UserForm({ currentUser, userData }: UserFormProps) {
  const { handleSubmit, register, errors, watch } = useForm<UserFields>({
    defaultValues: {
      name: userData.name,
      lname: userData.lname,
      ci: userData.ci,
      phone: userData.phone,
      experience: userData.experience,
      licenseCode: userData.licenseCode,
      province: userData.province,
      city: userData.city,
      photoUrl: userData.photoUrl,
    },
  });

  const { photoUrl } = watch();

  const classes = useStyles();
  const alert = useAlert();
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    (async () => {
      if (photoUrl) {
        const { image } = await User.getPhoto(photoUrl);
        setImage(image || null);
      }
    })();
  }, [photoUrl]);

  const onSubmit: SubmitHandler<UserFields> = async (data) => {
    const { exists } = await User.exists(data.ci);

    if (exists) {
      if (data.ci === userData.ci) {
        console.log("misma cédula");
      } else {
        alert.setMessage("Ya existe un usuario con ese número de cédula");
        return;
      }
    }

    await User.save({
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
    });
  };

  return (
    <>
      <Grid
        container
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        justify="center"
        style={{ marginBottom: 10 }}
      >
        <FilePicker
          value={image}
          onChange={(newImage) => setImage(newImage)}
          accept="image"
          render={(file) => <AvatarInput value={file} />}
        />
      </Grid>
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
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          </Grid>
          {userData.role !== "Agencia inmobiliaria" && (
            <Grid item xs={12} sm={6}>
              <TextField
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
              InputProps={{
                readOnly: true,
              }}
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
    </>
  );
}
