import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import UserComment from './UserComment.js'
import Scrollable from '../Scrollable'

const useStyles = makeStyles((theme) => ({
  title: {
    width: 315,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    padding: '10px 0 10px 0',
    color: theme.palette.primary.contrastText
  },
  root: {
    minHeight: '400px'
  },
  comments: {
    width: '290px',
    maxWidth: '290px',
    maxHeight: '250px',
    backgroundColor: theme.palette.background.paper,
    overflow: 'scroll'
  },
  inline: {
    display: 'inline'
  },
  li: {
    paddingLeft: 0,
    paddingLight: 0
  },
  divider: {
    marginLeft: 0
  }
}))
export default function UserComments (props) {
  const classes = useStyles()
  const { userData } = props
  const [comments, setComments] = useState([])

  useEffect(() => {
    const load = async () => {
      const { app } = await import('../base')

      if (!userData) return

      return app
        .firestore()
        .collection('users')
        .doc(userData.uid)
        .collection('comments')
        .get()
        .then((snap) => {
          setComments(snap.docs)
        })
    }

    load()
  }, [])

  return (
    <div className={classes.root}>
      <h4 className={classes.title}>{comments.length + ' comentarios'}</h4>

      <Scrollable className={classes.comments}>
        {comments.map((comment, index) => (
          <UserComment key={index} commentData={comment.data()} />
        ))}
      </Scrollable>
    </div>
  )
}

UserComments.propTypes = {
  userData: PropTypes.object
}

UserComments.defaultProps = {
  userData: null
}
