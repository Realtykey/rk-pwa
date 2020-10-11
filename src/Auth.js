import React, { useState } from "react";
//redux imports
import { useDispatch , useSelector } from "react-redux";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const currentUser = useSelector(state => state.general.currentUser);

  if (!currentUser) {
    return <> ....cargando</>;
  }

  return (
    <AuthContext.Provider
      value={{ currentUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
