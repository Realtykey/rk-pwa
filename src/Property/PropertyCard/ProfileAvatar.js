import React, { useEffect, useState } from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

import Chip from '@material-ui/core/Chip';

//database
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import '../../Property/PropertyCard/styles.css'
//redux imports
import { useDispatch } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  root: {
    color:'white !important',
    padding: '20px 10px',
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    flexDirection: 'column'
  },
  inline: {
    display: 'inline',
  },
  identity: {
    display: 'flex',
    flexDirection: 'row',
  },
  photo: {

    paddingRight: '10px',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    align: 'center',
    justify: 'center',

  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },

  placeholder: {
    color: 'gray'
  }

}
));

const premium = {
  backgroundColor: 'rgb(0	190	93)',
  color: 'white',
  fontWeight: 'bold',
  letterSpacing: '1px',
}

const member = {
  backgroundColor: 'rgb(0	110	213	)',
  color: 'white',
  fontWeight: 'bold',
  letterSpacing: '1px',
}

export default function ProfileAvatar(props) {
  const dispatch = useDispatch();
  const db = firebase.firestore();
  const uid = props.uid;
  const classes = useStyles();

  const [data,setData] = useState(null);

  const setUserPreview = userPreview => dispatch({ type: 'USER_PREVIEW', payload: userPreview });

  const renderData = () => {

    return (
      <a className={classes.root} onClick={() => setUserPreview({...data})}>

        <div className={classes.identity}>

          <div style={{ display: 'flex', width: '80%' }}>
            <div className={classes.photo}>
              <Avatar src={data.photoUrl} className={classes.large} />
            </div>

            <div className={classes.info}>
              <div>{data.name} {data.lname}</div>
              <div className={classes.placeholder} > {data.role}</div>

            </div>
          </div>

          <div style={{display:'flex', width: '20%' }}>
            <Chip
              classes={{root:'root'}}
              label={data.status}
              style={data.status == 'Miembro' ? member : premium}
            />
          </div>

        </div>

      </a>
    )
  }

  useEffect(
    () => {
      if (props.uid) {
        db.collection('users').doc(uid).get().then(
          (userDoc) => {
            setData(userDoc.data());
          }
        )
      }
    }
    , [uid]);


  return (
    data ? renderData() : <div></div>
  );
}