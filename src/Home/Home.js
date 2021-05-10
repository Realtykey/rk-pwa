import React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import PropertyForm from './../Property/PropertyForm/PropertyForm'
import RequestForm from './../Request/RequestForm'

import { AuthProvider } from './../Auth'
import Grid from '@material-ui/core/Grid'

import PublicArea from '../PublicArea.js'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter
} from 'react-router-dom'

import InternalRoute from '../InternalRoute'
import Playground from '../Playground.js'
import RealtyAppBar from './RealtyAppBar.js'
import MyPanel from '../MyPanel'

import BuildIcon from '@material-ui/icons/Build'

import Publish from '../Publish/Publish.js'
import MatchView from '../Matches/MatchView/MatchView'
import AgentForm from '../AgentForm/AgentForm.js'
import Menu from '../Menu'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  }
}))

const content = {
  marginTop: 64
}

function Home (props) {
  const classes = useStyles()
  const { match } = props

  return (
    <AuthProvider>
      <Router>
        <Grid className={classes.root}>
          <RealtyAppBar match={match} />
          <div style={content}>
            <Switch>
              <InternalRoute
                path={`${match.path}/Publish/:type`}
                component={Publish}
              />
              <InternalRoute
                path={`${match.path}/PublicArea/:type`}
                component={PublicArea}
              />

              <InternalRoute
                path={`${match.path}/PropertyForm`}
                component={PropertyForm}
              />
              <InternalRoute
                path={`${match.path}/RequestForm`}
                component={RequestForm}
              />

              <InternalRoute
                path={`${match.path}/AgentForm`}
                component={AgentForm}
              />

              <InternalRoute path={`${match.path}/Menu`} component={Menu} />

              <InternalRoute
                path={`${match.path}/MatchView`}
                component={MatchView}
              />

              <InternalRoute
                path={`${match.path}/Playground`}
                component={Playground}
              />

              <InternalRoute
                path={`${match.path}/MyPanel`}
                component={MyPanel}
              />

              <InternalRoute
                path={`${match.path}/propform`}
                component={PropertyForm}
              />

              <InternalRoute
                path={`${match.path}/reqForm`}
                component={RequestForm}
              />

              <Route path={`${match.url}/WorkOnProgress`}>
                <div>
                  <BuildIcon />
                  Work in progress..
                </div>
              </Route>

              {/* default view, root view */}
              <Route component={Menu}></Route>
            </Switch>
          </div>
        </Grid>
      </Router>
    </AuthProvider>
  )
}

Home.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
    url: PropTypes.string
  }).isRequired
}

export default withRouter(Home)
