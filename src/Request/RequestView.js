import React, { useEffect, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import ViewLayout from "../utils/ViewLayout";

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

    const {requests, selectedRequest,showDetails} = useSelector(state => state.request)

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
            <ViewLayout
                list={<RequestsList />}
                detail={selectedRequest ? <RequestDet /> : <></>}
                name="requerimientos"
                showDetails={showDetails}
                iterable={requests} />
        </div>
    )
}

export default RequestView;
