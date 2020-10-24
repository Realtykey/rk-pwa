import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import PropertyMoney from './PropertyMoney.js'

//redux
import { useDispatch } from 'react-redux'
import { switchDetailsAction } from '../../redux';
import { format } from '../../apis/date_api';

import '../../App.css';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: 170,
        borderRadius : 20
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


export default function PropertyItem({ prop, index, setProp }) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const switchDetails = () => dispatch(switchDetailsAction());

    return (
        <ListItem className={classes.root} onClick={() => { setProp(prop, index); switchDetails();}} selected={prop.selected} alignItems="flex-start">

        <ListItemText style={{ maxHeight: '20px' }} secondary={prop.date? format(prop.date.toDate()) : ""} />

            <div className={classes.info}>
                <Typography
                    component="span"
                    className={classes.title}
                >
                    {prop.title}
                </Typography>

            </div>

            <PropertyMoney style={{ paddingTop: '7px' }} propData={prop} />

            {/* <ListItemText style={{ paddingTop: '7px' }} secondary={"A " + Number.parseFloat(prop.distance).toFixed(3) + " km de tí."} /> */}

        </ListItem>
    )
}


