import React, { useEffect, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
//
import Hidden from '@material-ui/core/Hidden';
import Box from '@material-ui/core/Box';

//custom comps
import { AuthContext } from "./../../Auth";
import PropertyDet from './PropertyDet.js'
import PropertiesList from './PropertiesList.js'

//redux imports
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux'
import { propsDetailsAction, fetchPropsThunk } from './../property-reducer';

import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: 0,
    },
    chip: {
        borderRatio: '25px'
    }

}));


const PropertyView = function () {

    const classes = useStyles();
    const { currentUser } = useContext(AuthContext);
    const dispatch = useDispatch();

    const fetchProperties = (uid) => dispatch(fetchPropsThunk(uid));

    const properties = useSelector(state => state.property.properties)
    const pdetails = useSelector(state => state.property.pdetails)
    const loading = useSelector(state => state.general.loading)

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
        <div>
            {properties.length > 0 ?
                <div className={classes.root}>
                    <Hidden smDown>
                        <Grid justify="center" container
                        >
                            <Grid xs={12} sm={4} md={4}item>
                                <PropertiesList />
                            </Grid>
                            <Grid container xs={12} sm={6} md={6} item>
                                <Grid align="center"><PropertyDet /></Grid>
                            </Grid>
                        </Grid>
                    </Hidden>
                    <Hidden only={['lg']}>
                        <Grid justify="center" container>
                            <Box display={pdetails ? "none" : "block"}>
                                <Grid item md={12} xs={12} align="center"><PropertiesList /></Grid>
                            </Box>

                            <Box display={pdetails ? "block" : "none"}>
                                <Grid item md={12} xs={12} align="center"><PropertyDet /></Grid>
                            </Box>

                        </Grid>
                    </Hidden>

                </div> :
                <Container style={{ width: '100%', display: 'flex', justifyContent: 'center', paddingTop: '200px' }}>
                    {loading == false ? <h1 style={{ color: 'gray' }}>No hay propiedades para mostrar</h1> : <CircularProgress size={100} color="secondary" />}
                </Container>
            }
        </div>
    )
}

export default PropertyView;
