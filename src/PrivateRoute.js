import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
//redux imports
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import { setUserAction, fetchUserDataThunk, setPending } from './redux';

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const currentUser = useSelector(state => state.general.currentUser);
  const dispatch = useDispatch();
  const fetchUserData = uid => dispatch(fetchUserDataThunk(uid));
  const setUser = currentUser => dispatch(setUserAction(currentUser));

  useEffect(
    () => {

      const load = async () => {
        const { app } = await import('./base');
        try {
          //auth state from redux
          return app.auth().onAuthStateChanged((user) => {
            if (user) {
              fetchUserData(user.uid);
              setUser(user);
              console.log(user.email + ' status changed to : logged ')
            } else {
              setUser(null);
              console.log('status changed to : not logged ')
            }
          }
          );
        }
        catch (e) {
          alert(e);
        }
      };

      const unsubscribe = load();

      return async () => await unsubscribe;
    },
    []
  )

  return (
    <Route
      {...rest}
      render={routeProps =>
        !!currentUser ? (
          <RouteComponent {...routeProps} />
        ) : (
            <Redirect to={"/SignIn"} />
          )
      }
    />
  );
};


export default PrivateRoute