import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
//redux imports
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
    const currentUser = useSelector(state => state.general.currentUser);

    useEffect(
        () => {
            if(currentUser){
                console.log(currentUser.email+' redirected ');
            }else{
                console.log(' redirected to sign page ');
            }
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
                        <Redirect to={"/Home"} />
                    )
            }
        />
    );
};


export default PrivateRoute