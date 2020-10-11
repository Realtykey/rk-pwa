import React, { useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';

//redux imports
import { useSelector } from 'react-redux'

import PropertyDetails from './../Property/PropertyCard/PropertyDetails'
//custom comps 
import Divider from '@material-ui/core/Divider';
import RequestBar from './RequestBar'
import loadable from '@loadable/component';
import Modal from '@material-ui/core/Modal';


const RequestForm = loadable(() => import('./RequestForm'));
const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.primary.contrastText,
        borderRadius: 20,
        padding: 9
    },
    det: {
        minWidth: '100%'
    },
    margin: {
        margin: theme.spacing(1)
    },
    paper: {
        position: 'absolute',
        width: 'auto',
        backgroundColor: 'white',
        height: '600px',
        overflow: 'scroll',
        padding: '50px',
    },

}
));

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        background:'#272331',
        outline: 'none',
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
        border: 'none'
    };
}



export default function RequestDet() {
    const classes = useStyles();
    const selectedRequest = useSelector(state => state.request.selectedRequest);

    return (
        <Grid className={classes.root}>

            {selectedRequest.map && <Grid item sm={12} md={12} xs={12}>
                <RequestBar/>

                <div>
                    <img alt="mapa del request" style={{ width: '100%', borderRadius: 20 }} src={selectedRequest.map.snapUrl}>
                    </img>
                </div>


                {/* <ImageSlider photos={selectedRequest.photos} /> */}
                {/* <Carousel photos = {selectedRequest.photos}/> */}

                <Divider className={classes.margin} />

                <PropertyDetails propData={selectedRequest}></PropertyDetails>

            </Grid>
            }
        </Grid>

    )


}
