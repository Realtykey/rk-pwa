import React from 'react'
import './App.css'

import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'

import PrivateRoute from './PrivateRoute.js'
import loadable from '@loadable/component'

import { useDispatch, useSelector } from 'react-redux'

import { closeAlertAction } from './redux'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { withAlert } from './components/globals/Alert'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#272331'
  },
  background: {
    backgroundImage: 'url(/bg02.jpg)'
  },
  messageChart: {
    color: 'white',
    position: 'absolute',
    width: 'auto',
    height: 200,
    overflow: 'scroll',
    padding: 50
  },
  photoWrapper: {
    position: 'absolute',
    width: 'auto',
    height: 'auto',
    overflow: 'scroll'
  },
  photo: { width: '100%', height: '100%' }
}))

function getModalStyle () {
  const top = 50
  const left = 50

  return {
    borderRadius: 8,
    background: '#272331',
    outline: 'none',
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    border: 'none'
  }
}
const SignIn = loadable(() => import('./SignIn/SignIn'))
const SignUp = loadable(() => import('./SignUp/SignUp'))
const Home = loadable(() => import('./Home/Home'))

function App () {
  const dispatch = useDispatch()
  const classes = useStyles()

  const closeAlert = () => dispatch(closeAlertAction())

  const errorMessage = useSelector((state) => state.general.errorMessage)

  const [modalStyle] = React.useState(getModalStyle)

  const body = (
    <div style={modalStyle} className={classes.messageChart}>
      {errorMessage}
    </div>
  )

  const setPhotoPreview = (photoPreview) =>
    dispatch({ type: 'SET_PHOTO_PREVIEW', payload: photoPreview })
  const { photoPreview } = useSelector((state) => state.general)

  const photoBody = (
    <div style={modalStyle} className={classes.photoWrapper}>
      <img className={classes.photo} src={photoPreview} />
    </div>
  )

  return (
    <div className={classes.root}>
      <Router>
        <Switch>
          <PrivateRoute path="/Home" component={Home} />
          <Route exact path="/" component={SignIn} />
          <Route path="/SignIn" component={SignIn} />
          <Route path="/SignUp" component={SignUp} />
        </Switch>
      </Router>
      <Modal open={errorMessage !== ''} onClose={closeAlert}>
        {body}
      </Modal>
      <Modal open={!!photoPreview} onClose={() => setPhotoPreview(null)}>
        {photoBody}
      </Modal>
    </div>
  )
}

export default withAlert(App)
