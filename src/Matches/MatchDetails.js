import React, { useContext, useState } from 'react'

import { makeStyles } from '@material-ui/core/styles';


//redux imports
import { useSelector, useDispatch } from 'react-redux'

import PropertyDetails from '../Property/PropertyCard/PropertyDetails'
//custom comps 
import AgentCard from '../AgentCard/AgentCard'
import ProfileAvatar from '../Property/PropertyCard/ProfileAvatar'
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import ImagesPreview from '../Property/PropertyForm/ImagesPreview';
import { AuthContext } from "../Auth.js";

import ToolsBar from './ToolsBar.js'
import MatchCompletion from './MatchCompletion.js';

const useStyles = makeStyles((theme) => ({
    root: {
        width:'inherit',
        margin:'0 auto',
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.primary.contrastText,
        borderRadius: 20,
        padding: 9
    },
    margin: {
        margin: theme.spacing(1)
    },
    paper: {
        position: 'absolute',
        width: 'auto',
    },

}
));

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        outline: 'none',
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
        border: 'none',
    };
}

export default function MatchDetails() {
    const { currentUser } = useContext(AuthContext);
    const dispatch = useDispatch();
    const classes = useStyles();

    // modal
    const [modalStyle] = React.useState(getModalStyle);
    const userPreview = useSelector(state => state.general.userPreview);
    const setUserPreview = userPreview => dispatch({ type: 'USER_PREVIEW', payload: userPreview });

    //show completion form 
    const [complete,showComplete] = useState(false);

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <AgentCard agent={userPreview} style={{ paddingLeft: '30px' }}></AgentCard>
        </div>
    );
    const { selectedMatch, userData } = useSelector(state => state.general);

    const { requesterData, prop, ownerData } = selectedMatch;

    const partnerData = userData?.uid == requesterData?.uid ? ownerData : requesterData;

    return (

        <Grid aligh="center" className={classes.root}>

            <ToolsBar complete={() => showComplete(!complete)} selectedMatch={selectedMatch}></ToolsBar>

            {complete ? <>
                <ImagesPreview urls={prop.photos} />
                <ProfileAvatar uid={partnerData.uid} />

                <Divider className={classes.margin} />

                <PropertyDetails propData={prop}></PropertyDetails>

            </> : <MatchCompletion />
            }
            <Modal
                open={!!userPreview}
                onClose={() => setUserPreview(null)}
            >
                {body}
            </Modal>

        </Grid>
    )
}
