import React, { useContext, useEffect } from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import PropertyForm from './../Property/PropertyForm/PropertyForm'
import RequestForm from './../Request/RequestForm'

import Grid from '@material-ui/core/Grid'

import PublicArea from '../PublicArea.js'

import { Switch, Route, withRouter } from 'react-router-dom'

import RealtyAppBar from './RealtyAppBar.js'
import MyPanel from '../MyPanel'

import BuildIcon from '@material-ui/icons/Build'

import Publish from '../Publish/Publish.js'
import MatchView from '../Matches/MatchView/MatchView'
import AgentForm from '../AgentForm/AgentForm.js'
import Menu from '../Menu'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import { AuthContext } from '../Auth'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserDataThunk } from '../redux'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
}))

const content = {
  marginTop: 64
}

const BackdropWrapper = ({ children }) => {
  const { currentUser } = useContext(AuthContext)
  const dispatch = useDispatch()
  const fetchUserData = (uid) => dispatch(fetchUserDataThunk(uid))

  const { userData } = useSelector((state) => state.general)

  const classes = useStyles()

  const fetchUser = async (uid) => {
    fetchUserData(uid)
  }

  useEffect(() => {
    if (!currentUser) return
    fetchUser(currentUser.uid)
  }, [currentUser])

  return (
    <div style={userData ? {} : { filter: 'blur(4px)' }}>
      {children}
      <Backdrop className={classes.backdrop} open={!userData}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  )
}

BackdropWrapper.propTypes = {
  children: PropTypes.node.isRequired
}
function Home (props) {
  const classes = useStyles()
  const { match } = props

  return (
    <Grid className={classes.root}>
      <RealtyAppBar match={match} />
      <BackdropWrapper>
        <div style={content}>
          <Switch>
            <Route path={`${match.path}/Publish/:type`} component={Publish} />
            <Route
              path={`${match.path}/PublicArea/:type`}
              component={PublicArea}
            />

            <Route
              path={`${match.path}/PropertyForm`}
              component={PropertyForm}
            />
            <Route path={`${match.path}/RequestForm`} component={RequestForm} />

            <Route path={`${match.path}/AgentForm`} component={AgentForm} />

            <Route path={`${match.path}/Menu`} component={Menu} />

            <Route path={`${match.path}/MatchView`} component={MatchView} />

            <Route path={`${match.path}/MyPanel`} component={MyPanel} />

            <Route path={`${match.path}/propform`} component={PropertyForm} />

            <Route path={`${match.path}/reqForm`} component={RequestForm} />

            <Route path={`${match.url}/WorkOnProgress`}>
              <div>
                <BuildIcon />
                Work in progress..
              </div>
            </Route>
            <Route component={Menu}></Route>
          </Switch>
        </div>
      </BackdropWrapper>
    </Grid>
  )
}

Home.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
    url: PropTypes.string
  }).isRequired
}

export default withRouter(Home)
