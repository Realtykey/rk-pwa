import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";

//redux imports
import { useSelector, useDispatch } from "react-redux";
import { switchDetailsAction } from "../../redux";
//custom comps
import Divider from "@material-ui/core/Divider";
import Carousel from "./Carousel";
import PropertyDetails from "./../PropertyCard/PropertyDetails";
import Features from "../Features";

//font awesome icons
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

import { useHistory } from "react-router-dom";

import ToolsBar, { Tool } from "../../utils/ToolsBar";
import { db } from "../../base";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.primary.contrastText,
    borderRadius: 20,
    padding: 9,
  },
  det: {
    minWidth: "100%",
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

const map = { width: "100%", borderRadius: 20 };

export default function PropertyDet() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const showDetails = (show) =>
    dispatch({ type: "SHOW_DETAILS", payload: show });

  const selectedProperty = useSelector(
    (state) => state.property.selectedProperty
  );

  const setPhotoPreview = (photoPreview) =>
    dispatch({ type: "SET_PHOTO_PREVIEW", payload: photoPreview });

  useEffect(() => {
    var unregister = null;
    if (selectedProperty) {
      unregister = db
        .collection("properties")
        .doc(selectedProperty.id)
        .onSnapshot(
          (doc) => {
            dispatch({
              type: "SET_SELECTED_PROPERTY",
              payload: { ...selectedProperty, ...doc.data() },
            });
          },
          function (error) {
            console.log(error.message);
          }
        );
    }

    return unregister ? unregister : () => console.log("");
  }, [dispatch, selectedProperty]);

  const resetSelected = () => dispatch({ type: "RESET_SELECTED" });

  const deleteProp = async () => {
    const { app } = await import("./../../base");

    app
      .firestore()
      .collection("properties")
      .doc(selectedProperty.id)
      .delete()
      .then((doc) => {
        console.log(selectedProperty.id + " deleted");
        resetSelected();
      });
  };

  const check = async (checked) => {
    const { app } = await import("./../../base");

    app.firestore().collection("properties").doc(selectedProperty.id).set(
      {
        bookmarked: checked,
      },
      { merge: true }
    );
    dispatch({
      type: "SET_SELECTED_PROPERTY",
      payload: { ...selectedProperty, bookmarked: checked },
    });
  };
  const pushEditForm = () => {
    history.push({
      pathname: `/Home/propform`,
      propData: selectedProperty,
    });
  };

  const tools = [
    <>
      <Hidden only={["md", "lg"]}>
        <Tool
          icon={faArrowLeft}
          label={"Volver"}
          onClick={() => showDetails(false)}
        />
        <Divider style={{ margin: 0 }} orientation="vertical" flexItem />
      </Hidden>
    </>,
    <Tool icon={faEdit} label={"Editar"} onClick={pushEditForm} />,
    <Tool
      icon={faBookmark}
      label={selectedProperty.bookmarked ? "Desmarcar" : "Marcar"}
      onClick={
        selectedProperty.bookmarked ? () => check(false) : () => check(true)
      }
    />,
    <Tool icon={faTrash} label={"Borrar"} onClick={deleteProp} />,
  ];
  return (
    <div
      style={{
        minWidth: "100%",
        height: "calc(100vh - 180px)",
        overflow: "scroll",
      }}
      className="hidden-scroll"
    >
      <Grid className={classes.root}>
        {selectedProperty && (
          <Grid item sm={12} md={12} xs={12}>
            <ToolsBar tools={tools} />
            <Carousel
              setPhotoPreview={setPhotoPreview}
              photos={selectedProperty.photos}
            />

            <Divider className={classes.margin} />

            <PropertyDetails propData={selectedProperty}></PropertyDetails>

            <Features propData={selectedProperty} />

            <div>
              <img style={map} src={selectedProperty.map?.snapUrl}></img>
            </div>
          </Grid>
        )}
      </Grid>
    </div>
  );
}
