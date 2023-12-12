import React, { useContext } from "react";
import { useSelector } from "react-redux";

import { Container, Typography, makeStyles } from "@material-ui/core";

import UserForm from "src/components/users/UserForm";
import { AuthContext } from "src/Auth";

export default function AgentForm() {
  const classes = useStyles();

  const { currentUser } = useContext(AuthContext);
  const { userData } = useSelector((state) => state.general);

  return (
    <Container className={classes.root}>
      <Typography color="inherit" variant="h6" gutterBottom>
        Información personal
      </Typography>
      {currentUser && userData && (
        <UserForm currentUser={currentUser} userData={userData} />
      )}
    </Container>
  );
}

const useStyles = makeStyles(() => ({
  root: {
    paddingTop: 64,
    color: "white",
  },
}));
