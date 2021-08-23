import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: 0,
        paddingLight: 0,
    },
}));

export default function UserComment(props) {
    const classes = useStyles();
    const { commentData } = props;
    const {photoUrl, name, lname, content} = commentData

    return (
        <ListItem className={classes.root} alignItems="flex-start">
            <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={photoUrl} />
            </ListItemAvatar>
            <ListItemText
                primary={`${name} ${lname === null ? '' : lname}`}
                secondary={
                    <React.Fragment>
                        {`${content}`}
                    </React.Fragment>
                }
            />
        </ListItem>
    )
}
