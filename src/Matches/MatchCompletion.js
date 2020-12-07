import React,{ useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

import $ from 'jquery';
import { useForm } from "react-hook-form";
import { Rating } from '@material-ui/lab';

import { makeStyles } from '@material-ui/core/styles';
//redux imports
import { useSelector } from 'react-redux';
import { db } from '../base';


const root = {
    minWidth: '100vh',
    borderRadius: 20,
    padding: 9
};

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gridGap: theme.spacing(3),
    },
    button: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    title: {
        paddingLeft: '20px'
    },
    rating: {
        paddingLeft: '30px',
        margin: '0 margin'
    },
    photo: {

        paddingRight: '10px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        align: 'center',
        justify: 'center',

    },
    outerCircle: {
        borderRadius: '100%',
        margin: '0 auto',
        width: 170,
        height: 170,
    },
    bigAvatar: {
        marginTop: '10px',
        margin: '0 auto',
        width: 150,
        height: 150,
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    }

}));


export default function MatchCompletion() {
    const classes = useStyles();

    const { register, errors, handleSubmit } = useForm();

    const { selectedMatch, userData } = useSelector(state => state.general);

    const { requesterData, prop, ownerData } = selectedMatch;

    const partnerData = userData.uid == requesterData.uid ? ownerData : requesterData;


    const archiveMatch = async () => {
        const id = `${requesterData.uid}_${prop.id}_${ownerData.uid}`;
        //remove from primary collection

        const updates = {done:true}

        updates[userData.uid == requesterData.uid ? 'ownerScore' : 'requesterScore'] = score;

        await db.collection('users').doc(userData.uid).collection('matches').doc(id)
        .set(updates,{merge:true});

        console.log('match archived');
    }
    const [score,setScore] = useState(0);

    const submitComment = async values => {
        {
            //repaired ejejje



            const { content } = values;

            //recoger la data del usuario
            const { app } = await import('../base');

            await app.firestore().collection('users').doc(partnerData.uid).collection('comments').doc()
                .set(
                    {
                        content: content,
                        name: userData.name,
                        lname: userData.lname,
                        photoUrl: userData.photoUrl,
                    }, { merge: true });
            $('#content').val('');
            archiveMatch();
        }

    }

    const root = {
        color: 'white !important',
        padding: '20px 0',
        // width: '100vh',
        display: 'flex',
        flexDirection: 'column'
    }
    return (
        <div style={root}>
            <form onSubmit={handleSubmit(submitComment)}>
                <Grid container spacing={3} direction="column" justify="flex-start">
                    <Grid item xs={12} sm={12} md={12}>
                        <Typography style={{ color: 'white' }} variant="h6" gutterBottom>
                            {"Califica tu experiencia con " + partnerData.name}
                        </Typography>
                    </Grid>

                    <Grid container align="center" justify="center" item xs={12} sm={12} md={12}>
                        <div className={classes.outerCircle}>
                            <Avatar src={partnerData.photoUrl} className={classes.bigAvatar} />
                        </div>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12}>
                        <Rating onChange={(event, newScore) => { console.log(newScore); setScore(newScore);}} name="score" />
                    </Grid>

                    <Grid item xs={12} sm={12} md={12}>
                        <TextField
                            inputRef={register({ required: true })}
                            name="content"
                            id="content"
                            helperText={errors.content && "Debes escribir algo"}
                            variant="outlined"
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={12} md={12}>
                        <Button
                            variant="outlined"
                            type="submit"
                        >Confirmar</Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}
