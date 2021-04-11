import React, { useEffect, useContext } from 'react'

//custom comps
import { AuthContext } from "./../../Auth";
import PropertyDet from './PropertyDet.js'
import PropertiesList from './PropertiesList.js'
import ViewLayout from "../../utils/ViewLayout";

//redux imports
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux'
import { fetchPropsThunk } from './../property-reducer';

const PropertyView = function () {

    const { currentUser } = useContext(AuthContext);
    const dispatch = useDispatch();

    const fetchProperties = (uid) => dispatch(fetchPropsThunk(uid));

    const properties = useSelector(state => state.property.properties)
    const {selectedProperty,showDetails} = useSelector(state => state.property);

    useEffect(
         () => {
            const uid = currentUser.uid;
            //initial fetch
            fetchProperties(uid);
            //listen changes
            const load = async () => {
                const { app } = await import('./../../base');

                return app.firestore().collection('properties').where('uid','==',uid)
                .onSnapshot(() => {
                    fetchProperties(uid);
                });
            }
            const unsubscribe = load();

            return async () => await unsubscribe
        },
        []
    )

    return (
        <ViewLayout
        list={<PropertiesList />}
        detail={selectedProperty ? <PropertyDet /> : <></>}
        name="propiedades"
        showDetails={showDetails}
        iterable={properties} />
    );
}

export default PropertyView;
