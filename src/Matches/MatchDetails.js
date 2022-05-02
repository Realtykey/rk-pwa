import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";

//redux imports
import { useSelector, useDispatch } from "react-redux";
import { switchDetailsAction } from "../redux";

import PropertyDetails from "../Property/PropertyCard/PropertyDetails";
//custom comps
import AgentCard from "../AgentCard/AgentCard";
import ProfileAvatar from "../Property/PropertyCard/ProfileAvatar";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import Carousel from "../Property/PropertyView/Carousel";
import Features from "../Property/Features";
import ToolsBar, { Tool } from "../utils/ToolsBar";

import MatchCompletion from "./MatchCompletion.js";
//font awesome icons
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { db } from "../base";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "inherit",
    margin: "0 auto",
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.primary.contrastText,
    borderRadius: 20,
    padding: 9,
  },
  margin: {
    margin: theme.spacing(1),
  },
  paper: {
    position: "absolute",
    width: "auto",
  },
}));

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    outline: "none",
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    border: "none",
  };
}

export default function MatchDetails() {
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (!userData) return;
    var unregister = null;
    if (selectedMatch) {
      unregister = db
        .collection("users")
        .doc(userData.uid)
        .collection("matches")
        .doc(selectedMatch.id)
        .onSnapshot(
          (doc) => {
            dispatch({
              type: "SET_SELECTED_MATCH",
              payload: { ...selectedMatch, ...doc.data() },
            });
          },
          function (error) {
            console.log(error.message);
          }
        );
    }

    return unregister ? unregister : () => console.log("");
  }, []);

  const switchDetails = () => dispatch(switchDetailsAction());
  // modal
  const [modalStyle] = React.useState(getModalStyle);
  const [photoModalStyle] = React.useState(getModalStyle);
  const { userPreview, currentUser, photoPreview } = useSelector(
    (state) => state.general
  );
  const setUserPreview = (userPreview) =>
    dispatch({ type: "USER_PREVIEW", payload: userPreview });
  const setPhotoPreview = (photoPreview) =>
    dispatch({ type: "SET_PHOTO_PREVIEW", payload: photoPreview });

  //show completion form
  const [complete, showComplete] = useState(false);

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <AgentCard
        agent={userPreview}
        style={{ paddingLeft: "30px" }}
      ></AgentCard>
    </div>
  );

  const photoBody = (
    <div style={photoModalStyle} className={classes.paper}>
      <img src={photoPreview} style={{ paddingLeft: "30px" }} />
    </div>
  );
  const { selectedMatch, userData } = useSelector((state) => state.general);

  const { requesterData, prop, ownerData } = selectedMatch;

  const partnerData =
    userData?.uid == requesterData?.uid ? ownerData : requesterData;

  const check = async (checked) => {
    const { app } = await import("./../base");

    app
      .firestore()
      .collection("users")
      .doc(userData.uid)
      .collection("matches")
      .doc(selectedMatch.id)
      .set(
        {
          bookmarked: checked,
        },
        { merge: true }
      );
    dispatch({
      type: "SET_SELECTED_MATCH",
      payload: { ...selectedMatch, bookmarked: checked },
    });
  };

  //actions
  const deleteMatch = async (selectedMatch) => {
    const { app } = await import("../base");
    app
      .firestore()
      .collection("users")
      .doc(userData.uid)
      .collection("matches")
      .doc(selectedMatch.id)
      .delete();
  };
  const tools = [
    <>
      <Hidden only={["md", "lg"]}>
        <Tool icon={faArrowLeft} label={"Volver"} onClick={switchDetails} />
        <Divider style={{ margin: 0 }} orientation="vertical" flexItem />
      </Hidden>
    </>,
    <Tool
      icon={faUser}
      label={"Ver Agente"}
      onClick={() => setUserPreview(partnerData)}
    />,
    <Tool
      icon={faTrash}
      label={"Borrar"}
      onClick={() => deleteMatch(selectedMatch)}
    />,
    <Tool
      icon={faEye}
      label={selectedMatch.bookmarked ? "Dejar de seguir" : "Seguir"}
      onClick={
        selectedMatch.bookmarked ? () => check(false) : () => check(true)
      }
    />,
    <Tool
      icon={faCheck}
      label={"Finalizar"}
      onClick={() => showComplete(!complete)}
    />,
  ];

  return (
    <div
      style={{
        height: "100vh",
        overflow: "scroll",
        minWidth: "100%",
      }}
      className="hidden-scroll"
    >
      <Grid aligh="center" className={classes.root}>
        <ToolsBar tools={tools} />

        {complete ? (
          <MatchCompletion />
        ) : (
          <>
            <Carousel setPhotoPreview={setPhotoPreview} photos={prop.photos} />

            <ProfileAvatar uid={partnerData.uid} />

            <Divider className={classes.margin} />

            <PropertyDetails propData={prop}></PropertyDetails>

            <Features propData={prop} />
          </>
        )}
        <Modal open={!!userPreview} onClose={() => setUserPreview(null)}>
          {body}
        </Modal>

        <Modal open={!!photoPreview} onClose={() => setPhotoPreview(null)}>
          {photoBody}
        </Modal>
      </Grid>
    </div>
  );
}
