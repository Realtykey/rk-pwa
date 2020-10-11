import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import PropertyMoney from './PropertyMoney.js'

import '../../App.css';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: 170,
        borderRadius : 20
    },
    title: {
        width: 315,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        padding : '10px 0 10px 0',
        color: theme.palette.primary.contrastText
    },
    info: {
        display: 'flex',
        flexDirection: 'row'
    }

}));


export default function PropertyItem({ prop, index, setProp }) {
    const classes = useStyles();


    return (
        <ListItem onClick={()=>console.log('item clicked')} className={classes.root} onClick={() => { setProp(prop, index) }} selected={prop.selected} alignItems="flex-start">

            <ListItemText style={{ maxHeight: '20px' }} secondary={prop.date??""} />

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


