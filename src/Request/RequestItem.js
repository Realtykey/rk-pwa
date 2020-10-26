import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import PropertyMoney from '../Property/PropertyView/PropertyMoney';

//redux
import { useDispatch } from 'react-redux'
import { switchDetailsAction } from '../redux';
import { format } from '../apis/date_api';

import './../App.css';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: 170,
        borderRadius: 20
    },
    title: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'normal',
        padding: '10px 0 10px 0',
        color: theme.palette.primary.contrastText
    },
    info: {
        display: 'flex',
        flexDirection: 'row'
    }

}));


export default function RequestItem({ req, setReq }) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const showDetails = show => dispatch({type:'SHOWR_DETAILS',payload:show});

    return (
        <ListItem className={classes.root} onClick={() => { setReq(req); showDetails(true); }} selected={req.selected} alignItems="flex-start">

            <ListItemText style={{ maxHeight: '20px' }} secondary={req.date? format(req.date.toDate()) : ""} />

            <div className={classes.info}>
                <Typography
                    component="span"
                    className={classes.title}
                >
                    {req.title}
                </Typography>

            </div>

            <PropertyMoney style={{ paddingTop: '7px' }} propData={req} />

            {/* <ListItemText style={{ paddingTop: '7px' }} secondary={"A " + Number.parseFloat(prop.distance).toFixed(3) + " km de tí."} /> */}

        </ListItem>
    )
}


