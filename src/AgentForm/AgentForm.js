import React, { useContext, useState } from "react";

import { useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography } from "@material-ui/core";

import { useAlert } from "src/components/globals/Alert";
import UserForm from "src/components/users/UserForm";

import { AuthContext } from "src/Auth";

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

export default function AgentForm() {
  // select state
  const { currentUser } = useContext(AuthContext);
  const { userData } = useSelector((state) => state.general);

  const alert = useAlert();
  const classes = useStyles();

  // image local files
  const [imgFiles, setImgFiles] = useState([]);

  const uploadImages = (docRef) => {
    const progressBar = document.getElementById("progressBar");
    Array.prototype.forEach.call(imgFiles, async (imgFile) => {
      const { firebase } = await import("./../base");

      // create storage ref
      const storageRef = firebase
        .storage()
        .ref(`users/${currentUser.uid}/${imgFile.name}`);
      // upload file
      const task = storageRef.put(imgFile);

      // update progress bar
      const unsuscribe = task.on(
        "state_changed",
        function progress(snap) {
          if (progressBar) {
            const percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
            progressBar.value = percentage;
          }
        },
        function error(err) {
          console.log(err);
        },
        async function complete(err) {
          console.log(err);
          // unsuscribe
          unsuscribe();

          // Upload completed successfully, now we can get the download URL
          const downloadUrl = await task.snapshot.ref.getDownloadURL();

          // update photos atribute (array) of the prop doc
          await docRef.set(
            {
              photoUrl: downloadUrl,
            },
            { merge: true }
          );

          document.location.reload();
        }
      );
    });
  };

  const onPhotoSelect = () => {
    const fileButton = document.getElementById("fileButton");
    fileButton.addEventListener("change", function (e) {
      // get file or files
      const files = fileButton.files;
      setImgFiles(files);
      console.log(files);
      const urls = [];
      // extract images urls
      Array.prototype.forEach.call(files, (file) => {
        const url = window.URL.createObjectURL(file).toString();
        console.log(url);
        urls.push(url);
      });

      console.log(urls);
      // images loaded

      console.log("urls array size " + urls);
    });
  };

  const ciExists = async (ci) => {
    const { app } = await import("./../base");
    const docRef = app.firestore().collection("users").where("ci", "==", ci);

    const snap = await docRef.get();

    return snap?.docs?.length > 0;
  };

  const onSubmit = async (data) => {
    const { app } = await import("./../base");

    const {
      name,
      lname = null,
      ci,
      phone,
      experience,
      licenseCode = null,
      province,
      city,
    } = data;

    const exists = await ciExists(ci);
    if (exists) {
      if (ci === userData.ci) {
        console.log("misma cédula");
      } else {
        alert.setMessage("Ya existe un usuario con ese número de cédula");
        return;
      }
    }

    const user = {
      uid: currentUser.uid,
      name,
      lname,
      ci,
      phone,
      address: "",
      experience,
      licenseCode,
      province,
      city,
    };

    if (!userData.role && licenseCode) {
      user.role = "Agente inmobiliario";
    }

    const ref = app.firestore().collection("users").doc(currentUser.uid);
    await ref.set(user, { merge: true });

    if (imgFiles.length === 0) {
      document.location.reload();
      return;
    }

    uploadImages(ref);
  };

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
  );
}
