import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

import Hidden from '@material-ui/core/Hidden';

//icons
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import EditIcon from '@material-ui/icons/Edit';
import BookmarkIcon from '@material-ui/icons/Bookmark';

//redux imports
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux'
import { reqsDetailsAction } from './request-reducer';

import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: '25px',
        width: 'fit-content',
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.secondary,
        '& svg': {
            margin: theme.spacing(1.5),
        },
        '& hr': {
            margin: theme.spacing(0, 0.5),
        },
        toolButton: {
            borderRadius: 0
        }
    },
}));

const Tool = ({ icon, ...rest }) => {
    const root = { borderRadius: 0 }
    return (
        <IconButton style={root} {...rest}>
            {icon}
        </IconButton>
    )
}

const CustomDivider = () => {
    return (
        <Divider style={{ margin: 0 }} orientation="vertical" flexItem />
    )
}

export default function RequestBar(props) {

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const reqsDetails = () => dispatch(reqsDetailsAction());
    const selectedRequest = useSelector(state => state.request.selectedRequest);

    useEffect(
        () => { },
        [selectedRequest]
    );

    const deleteReq = async () => {
        const { app } = await import('./../base');

        app.firestore().collection('requests')
            .doc(selectedRequest.id)
            .delete()
            .then(
                () => reqsDetails()
            );
    }


    const pushEditForm = () => {
        history.push(
            {
                pathname: `/Home/reqform`,
                propData: selectedRequest
            });
    }


    return (
        <div>
            <Grid container alignItems="center" className={classes.root}>

                <Hidden only={['lg']}>
                    <Tool icon={<ArrowBackIosIcon/>} onClick={reqsDetails} aria-label="volver"/>
                    <CustomDivider/>
                </Hidden>

                <Tool icon={<EditIcon/>} onClick={pushEditForm} aria-label="editar"/>
                <CustomDivider/>

                <Tool icon={<DeleteIcon/>} onClick={deleteReq} aria-label="borrar"/>
                <CustomDivider/>

                <Tool icon={<BookmarkIcon/>} aria-label="poner marcador"/>

            </Grid>
        </div>
    )
}
