import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'

import Chip from '@material-ui/core/Chip'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import '../../Property/PropertyCard/styles.css'
import { useDispatch } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  root: {
    color: 'white !important',
    padding: '20px 10px',
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    flexDirection: 'column'
  },
  identity: {
    display: 'flex',
    flexDirection: 'row'
  },
  photo: {
    paddingRight: 10,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    align: 'center',
    justify: 'center'
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7)
  },
  placeholder: {
    color: 'gray'
  },
  chipWrapper: { display: 'flex', width: '20%' },
  nameWrapper: { display: 'flex', width: '80%' },
  fullName: { display: 'flex', flexDirection: 'row' },
  prefixe: { color: 'gray', marginRight: 5 }
}))

const premium = {
  backgroundColor: 'rgb(0	190	93)',
  color: 'white',
  fontWeight: 'bold',
  letterSpacing: 1
}

const member = {
  backgroundColor: '#0064D5',
  color: 'white',
  fontWeight: 'bold',
  letterSpacing: 1
}

export default function ProfileAvatar (props) {
  const dispatch = useDispatch()
  const db = firebase.firestore()
  const { uid } = props
  const classes = useStyles()

  const [data, setData] = useState(null)

  const setUserPreview = (userPreview) =>
    dispatch({ type: 'USER_PREVIEW', payload: userPreview })

  const renderData = () => {
    return (
      <a className={classes.root} onClick={() => setUserPreview({ ...data })}>
        <div className={classes.identity}>
          <div className={classes.nameWrapper}>
            <div className={classes.photo}>
              <Avatar src={data.photoUrl} className={classes.large} />
            </div>

            <div className={classes.info}>
              <div className={classes.fullName}>
                {data.licenseCode && <div className={classes.prefixe}>CBR</div>}
                <div>
                  {data.name} {data.lname}
                </div>
              </div>
              <div className={classes.placeholder}>
                {data.role} {data.licenseCode && 'con licencia'}
              </div>
            </div>
          </div>

          <div className={classes.chipWrapper}>
            <Chip
              classes={{ root: 'root' }}
              label={data.status}
              style={data.status === 'Miembro' ? member : premium}
            />
          </div>
        </div>
      </a>
    )
  }

  useEffect(() => {
    if (uid) {
      db.collection('users')
        .doc(uid)
        .get()
        .then((userDoc) => {
          setData(userDoc.data())
        })
    }
  }, [uid])

  return data ? renderData() : <div></div>
}

ProfileAvatar.propTypes = {
  uid: PropTypes.string
}

ProfileAvatar.defaultProps = {
  uid: ''
}
