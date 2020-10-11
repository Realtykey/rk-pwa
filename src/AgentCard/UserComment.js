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
    const commentData = props.commentData;

    return (
        <ListItem className={classes.root} alignItems="flex-start">
            <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={commentData.photoUrl} />
            </ListItemAvatar>
            <ListItemText
                primary={commentData.name + " " + commentData.lname}
                secondary={
                    <React.Fragment>
                        {`${commentData.content}`}
                    </React.Fragment>
                }
            />
        </ListItem>
    )
}
