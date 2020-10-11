import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

import Hidden from '@material-ui/core/Hidden';

//redux imports
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux'
import { switchDetailsAction } from '../redux';
//fa icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import '../styles.css'
const useStyles = makeStyles((theme) => ({
    root: {
        marginLeft: '20px',
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
    },
    toolHint: {
        alignSelf: 'center',
        textAlign: 'center',
        paddingLeft: 4
    },
    tool: {
        borderRadius: 0,
        padding: '10px 8px',
        minWidth:100
    }
}));
const Tool = ({ label, icon, onClick }) => {
    const classes = useStyles();

    return (
        <IconButton classes={{ label: 'custom-label' }} className={classes.tool} aria-label={label} onClick={onClick}>
            <FontAwesomeIcon icon={icon} />
            <span style={{ fontSize: 14 }}>
                {label}
            </span>
        </IconButton>
    )
}

export default function ToolsBar(props) {
    const selectedMatch = props.selectedMatch;

    const classes = useStyles();
    const dispatch = useDispatch();
    const switchDetails = () => dispatch(switchDetailsAction());
    const uid = useSelector(state => state.general.userData.uid);

    const deleteMatch = async (selectedMatch) => {
        const { app } = await import('../base');
        app.firestore().collection('users').doc(uid)
            .collection('matches').doc(selectedMatch.key).delete()
    }

    const setUserPreview = userPreview => dispatch({ type: 'USER_PREVIEW', payload: userPreview });

    const { requesterData, prop, ownerData } = selectedMatch;

    const partnerData = uid == requesterData.uid ? ownerData : requesterData;

    return (
        <div>
            <Grid container alignItems="center" className={classes.root}>

                <Hidden only={['sm','md', 'lg']}>
                    <Tool icon={faArrowLeft} label={'Volver'} onClick={switchDetails} />
                    <Divider style={{ margin: 0 }} orientation="vertical" flexItem />
                </Hidden>

                <Divider style={{ margin: 0 }} orientation="vertical" flexItem />

                <Tool icon={faUser} label={'Ver Agente'} onClick={() => setUserPreview(partnerData)} />

                <Divider style={{ margin: 0 }} orientation="vertical" flexItem />

                <Tool icon={faEye} label={'Seguimiento'} onClick={() => console.log('seguimiento')} />

                <Divider style={{ margin: 0 }} orientation="vertical" flexItem />

                <Tool icon={faTrash} label={'Borrar'} onClick={() => deleteMatch(selectedMatch)} />

                <Divider style={{ margin: 0 }} orientation="vertical" flexItem />

                <Tool icon={faCheck} label={'Finalizar'} onClick={props.complete} />

            </Grid>
        </div>
    )
}
