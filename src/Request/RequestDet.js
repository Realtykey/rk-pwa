import React, { useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

//redux imports
import { useSelector, useDispatch } from 'react-redux'
import { switchDetailsAction } from '../redux';

import PropertyDetails from './../Property/PropertyCard/PropertyDetails'
//custom comps 
import Divider from '@material-ui/core/Divider';
import RequestBar from './RequestBar'
import loadable from '@loadable/component';
import Modal from '@material-ui/core/Modal';
import Features from '../Property/Features';

//font awesome icons
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

import { useHistory } from "react-router-dom";

import ToolsBar,{ Tool } from '../utils/ToolsBar';
import { db } from '../base';

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
        background: '#272331',
        outline: 'none',
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
        border: 'none'
    };
}



export default function RequestDet() {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    const showDetails = show => dispatch({type:'SHOWR_DETAILS',payload:show});

    const selectedRequest = useSelector(state => state.request.selectedRequest);

    const deleteReq = async () => {
        const { app } = await import('./../base');
    
        app.firestore().collection('requests')
            .doc(selectedRequest.id)
            .delete()
            .then(
                () => switchDetailsAction()
            );
    }
    
    const pushEditForm = () => {
        history.push(
            {
                pathname: `/Home/reqform`,
                propData: selectedRequest
            });
    }
    
    const tools = [
        <>
            <Hidden only={['md', 'lg']}>
                <Tool icon={faArrowLeft} label={'Volver'} onClick={() => showDetails(false)} />
                <Divider style={{ margin: 0 }} orientation="vertical" flexItem />
            </Hidden>
        </>,
        <Tool icon={faEdit} label={'Editar'} onClick={pushEditForm} />,
        <Tool icon={faBookmark} label={'Marcar'} onClick={() => console.log('marked')} />,
        <Tool icon={faTrash} label={'Borrar'} onClick={deleteReq} />,
    
    ]

    useEffect(
        () => {
                var unregister = null
                if(selectedRequest){
                    unregister = db.collection('requests').doc(selectedRequest.id).onSnapshot(
                        doc => {
                            dispatch({type:'SET_SELECTED_REQUEST',payload:{...doc.data()}})
                        },
                        function(error) {
                            console.log(error.message);
                        }
                    );    
                }

                return unregister? unregister : () => console.log("");
        },
        []
    );


    return (
        <Grid className={classes.root}>

            {selectedRequest && <Grid item sm={12} md={12} xs={12}>
            <ToolsBar tools={tools}/>

                <div>
                    <img alt="mapa del request" style={{ width: '100%', borderRadius: 20 }} src={selectedRequest.map.snapUrl}>
                    </img>
                </div>


                {/* <ImageSlider photos={selectedRequest.photos} /> */}
                {/* <Carousel photos = {selectedRequest.photos}/> */}

                <Divider className={classes.margin} />

                <PropertyDetails propData={selectedRequest}></PropertyDetails>

                <Features propData={selectedRequest} />

            </Grid>
            }
        </Grid>

    )


}
