import React from "react";

import { Avatar, FormHelperText, IconButton } from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";

import { Styles } from "src/interfaces/global";

interface AvatarInputProps {
  value: File | null;
}

export default function AvatarInput(props: AvatarInputProps) {
  const { value } = props;

  return (
    <div style={styles.container}>
      {value ? (
        <img
          width={100}
          height={100}
          style={{ borderRadius: "100%" }}
          src={URL.createObjectURL(value)}
        />
      ) : (
        <div style={styles.view}>
          <Avatar style={{ width: "100%", height: "100%" }} />
          <IconButton style={styles.button} color="primary" component="span">
            <PhotoCamera fontSize="default" />
          </IconButton>
        </div>
      )}
      {!value && (
        <FormHelperText>Debes subir una foto de perfil</FormHelperText>
      )}
    </div>
  );
}

const styles: Styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  view: {
    position: "relative",
    width: 100,
    height: 100,
  },
  button: {
    position: "absolute",
    bottom: -10,
    right: -10,
    color: "white",
  },
};
