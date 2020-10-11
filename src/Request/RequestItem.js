import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';


import './../App.css';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: 170,
        borderRadius: 20
    },
    title: {
        width: 315,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        padding: '10px 0 10px 0',
        color: theme.palette.primary.contrastText
    },
    info: {
        display: 'flex',
        flexDirection: 'row'
    }

}));


export default function RequestItem({ req, index, setReq }) {
    const classes = useStyles();


    return (
        <ListItem className={classes.root} onClick={() => { setReq(req, index) }} selected={req.selected} alignItems="flex-start">

            <ListItemText style={{ maxHeight: '20px' }} secondary="Domingo 26 de Julio 2020" />

            <div className={classes.info}>
                <Typography
                    component="span"
                    className={classes.title}
                >
                    {req.title}
                </Typography>

            </div>

            <Grid item>
                <Chip

                    label={"precio $ " + req.price}
                />
            </Grid>

            {/* <ListItemText style={{ paddingTop: '7px' }} secondary={"A " + Number.parseFloat(prop.distance).toFixed(3) + " km de tí."} /> */}

        </ListItem>
    )
}


