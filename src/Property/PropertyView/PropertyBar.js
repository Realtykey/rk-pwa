import React from 'react'
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
import { shallowEqual, useSelector } from 'react-redux'
import { propsDetailsAction , setPropAction } from './../property-reducer';
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

export default function PropertyBar(props) {

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const propsDetails = () => dispatch(propsDetailsAction());
    const selectedProperty = useSelector(state => state.property.selectedProperty);
    const resetSelected = () => dispatch({type:'RESET_SELECTED'});

    const deleteProp = async () => {
        const { app } = await import('./../../base');

        app.firestore().collection('properties')
            .doc(selectedProperty.id)
            .delete()
            .then(
                (doc) => {
                    console.log(selectedProperty.id + " deleted")
                    resetSelected();
                }
            );
    }

    const pushEditForm = () => {
        history.push(
            {
                pathname: `/Home/propform`,
                propData: selectedProperty
            });
    }
    return (
        <div>
            <Grid container alignItems="center" className={classes.root}>

                <Hidden only={['lg']}>
                    <IconButton style={{ borderRadius: 0 }} onClick={propsDetails} aria-label="delete">
                        <ArrowBackIosIcon />
                    </IconButton>
                    <Divider style={{ margin: 0 }} orientation="vertical" flexItem />
                </Hidden>

                <IconButton style={{ borderRadius: 0 }} onClick={pushEditForm} aria-label="delete">
                    <EditIcon />
                </IconButton>


                <Divider style={{ margin: 0 }} orientation="vertical" flexItem />

                <IconButton style={{ borderRadius: 0 }} onClick={deleteProp} aria-label="delete">
                    <DeleteIcon />
                </IconButton>


                <Divider style={{ margin: 0 }} orientation="vertical" flexItem />

                <IconButton style={{ borderRadius: 0 }} aria-label="delete">
                    <BookmarkIcon />
                </IconButton>


            </Grid>
        </div>
    )
}
