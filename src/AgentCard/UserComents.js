import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { Rating } from '@material-ui/lab';

import UserComment from './UserComment.js'

const useStyles = makeStyles((theme) => ({
  title: {
    width: 315,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    padding : '10px 0 10px 0',
    color: theme.palette.primary.contrastText
  },
  root: {
    minHeight: '400px',
  },
  comments: {
    width: '290px',
    maxWidth: '290px',
    maxHeight: '250px',
    backgroundColor: theme.palette.background.paper,
    overflow: 'scroll'
  },
  inline: {
    display: 'inline',
  },
  li: {
    paddingLeft: 0,
    paddingLight: 0,
  },
  divider: {
    marginLeft: 0
  }
}));
export default function UserComments(props) {
  const classes = useStyles();
  const userData = props.userData;
  const [comments, setComments] = useState([]);

  useEffect(
    () => {

      const load = async () => {
        const { app } = await import('./../base');

        return app.firestore().collection('users').doc(userData.uid).collection('comments').get().then(
          (snap) => {
            setComments(snap.docs);
          }
        )
      }

      load();

    },
    []
  )

  return (
    <div className={classes.root}>
      <h4 className={classes.title}>{comments.length + " comentarios"}</h4>

      <List className={classes.comments}>
        {comments.map((comment, index) => <UserComment key={index} commentData={comment.data()} />)}
      </List>
    </div>

  );
}
