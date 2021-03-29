import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropertyForm from './../Property/PropertyForm/PropertyForm'
import RequestForm from './../Request/RequestForm'

import { AuthProvider } from './../Auth';
import Grid from '@material-ui/core/Grid';

import PublicArea from '../PublicArea.js'

/*ENRUTAMIENTO*/
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";



//custom routing comps
import InternalRoute from "../InternalRoute";
import Playground from '../Playground.js';
import RealtyAppBar from './RealtyAppBar.js';
import MyPanel from '../MyPanel';

//icons
import BuildIcon from '@material-ui/icons/Build';

//data

//custom comps
import Publish from '../Publish/Publish.js';
import MatchView from '../Matches/MatchView/MatchView';
import AgentForm from '../AgentForm/AgentForm.js';
import Menu from '../Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  }
}));

const content = {
  marginTop: 64,
}

function Home(props) {
  const classes = useStyles();

  return (
    <AuthProvider>
      <Router>
        <Grid className={classes.root}>
          <RealtyAppBar match={props.match} />
          <div style={content}>
            <Switch>
              <InternalRoute path={`${props.match.path}/Publish/:type`} component={Publish} />
              <InternalRoute path={`${props.match.path}/PublicArea/:type`} component={PublicArea} />

              <InternalRoute path={`${props.match.path}/PropertyForm`} component={PropertyForm} />
              <InternalRoute path={`${props.match.path}/RequestForm`} component={RequestForm} />

              <InternalRoute path={`${props.match.path}/AgentForm`} component={AgentForm} />

              <InternalRoute path={`${props.match.path}/Menu`} component={Menu} />

              <InternalRoute path={`${props.match.path}/MatchView`} component={MatchView} />

              <InternalRoute path={`${props.match.path}/Playground`} component={Playground} />

              <InternalRoute path={`${props.match.path}/MyPanel`} component={MyPanel} />

              <InternalRoute path={`${props.match.path}/propform`} component={PropertyForm} />

              <InternalRoute path={`${props.match.path}/reqForm`} component={RequestForm} />



              <Route path={`${props.match.url}/WorkOnProgress`}>
                <div>
                  <BuildIcon />
              Work in progress..
              </div>
              </Route>

              {/* default view, root view */}
              <Route component={Menu}>
              </Route>
            </Switch>
          </div>
        </Grid>
      </Router>
    </AuthProvider>
  );
}

export default withRouter(Home);
