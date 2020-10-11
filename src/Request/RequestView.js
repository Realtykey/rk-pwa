import React, { useEffect, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
//
import Hidden from '@material-ui/core/Hidden';
import Box from '@material-ui/core/Box';

//custom comps
import { AuthContext } from "./../Auth";
import RequestDet from './../Request/RequestDet'
import RequestsList from './../Request/RequestList'

//redux imports
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux'
import { fetchReqsThunk } from './request-reducer';

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


const RequestView = function () {

    const classes = useStyles();
    const { currentUser } = useContext(AuthContext);
    const dispatch = useDispatch();

    const fetchRequests = (uid) => dispatch(fetchReqsThunk(uid));

    const requests = useSelector(state => state.request.requests)
    const loading = useSelector(state => state.general.loading)
    const rdetails = useSelector(state => state.request.rdetails)

    useEffect(
        () => {
            const uid = currentUser.uid;
            //initial fetch
            fetchRequests(uid);
            //
            const load = async () => {
                const { app } = await import('./../base');
                return app.firestore().collection('requests').where('uid', '==', uid)
                    .onSnapshot(() => {
                        fetchRequests(uid);
                        console.log('props fetched')
                    });
            };
            const unsubscribe = load().then(unsubscribe => unsubscribe);

            return async () => unsubscribe; 
        },
        []
    )

    return (
        <div>
            {requests.length > 0 ?
                <div className={classes.root}>
                    <Hidden smDown>
                        <Grid justify="center" container
                        >
                            <Grid xs={12} sm={4} item>
                                <RequestsList />
                            </Grid>
                            <Grid container xs={12} sm={6} item>
                                <Grid align="center"><RequestDet /></Grid>
                            </Grid>
                        </Grid>
                    </Hidden>
                    <Hidden only={['lg']}>
                        <Grid justify="center" container>
                            <Box display={rdetails ? "none" : "block"}>
                                {/* <Grid item md={12} xs={12} align="center"><RequestsList /></Grid> */}
                            </Box>

                            <Box display={rdetails ? "block" : "none"}>
                                <Grid item md={12} xs={12} align="center"><RequestDet /></Grid>
                            </Box>

                        </Grid>
                    </Hidden>

                </div> :
                <Container style={{ width: '100%', display: 'flex', justifyContent: 'center', paddingTop: '200px' }}>
                    {loading == false ? <h1 style={{ color: 'gray' }}>No hay requerimientos para mostrar</h1> : <CircularProgress size={100} color="secondary" />}
                </Container>
            }
        </div>
    )
}

export default RequestView;
