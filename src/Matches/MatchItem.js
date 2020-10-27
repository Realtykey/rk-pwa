import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import MoneyView from '../Property/PropertyCard/MoneyView';
import Typography from '@material-ui/core/Typography';
//redux
import { useDispatch } from 'react-redux'

const useStyles = makeStyles((theme) => ({
    title: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'normal',
        padding: '10px 0 10px 0',
        color: theme.palette.primary.contrastText
    },
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: 170,
        borderRadius : 20
    },
    info: {
        color:'white',
        display: 'flex',
        flexDirection: 'row'
    }

}));


export default function MatchItem({match,index,setMatch,currentUser}) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const showDetails = show => dispatch({type:'SHOW_DETAILS',payload:show});

    return (
        <ListItem key={match.key} className={classes.root} onClick={() => { setMatch(match, index); showDetails(true); }} selected={match.selected} alignItems="flex-start">

            <ListItemText style={{ maxHeight: '20px' }} secondary="Domingo 26 de Julio 2020" />

            <div className={classes.info}>

                <ListItemAvatar>
                    <Avatar src={match.requesterData.uid == currentUser.uid ? match.ownerData.photoUrl : match.requesterData.photoUrl} />
                </ListItemAvatar>

                <Typography
                    component="span"
                    className={classes.title}
                >
                    {match.prop.title}
                </Typography>

            </div>
            
            <MoneyView propData={match.prop} />

            <ListItemText style={{ paddingTop: '7px' }} secondary={"A " + Number.parseFloat(match.distance).toFixed(3) + " km de tí."} />

        </ListItem>
    )
}


