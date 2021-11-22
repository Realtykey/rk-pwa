import React from 'react'
import MenuButton from './MenuButton.js'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

import {
  faHome,
  faHandshake,
  faHandHoldingUsd,
  faThLarge,
  faNewspaper,
  faUsers
} from '@fortawesome/free-solid-svg-icons'

import Typography from '@material-ui/core/Typography'

import { useHistory, Link } from 'react-router-dom'

const root = {
  background: `
    linear-gradient(to bottom right, rgba(72, 72, 212, 0), rgba(241, 104, 104, 0)), url('../header.jpg') center center no-repeat
    `,
  backgroundSize: 'cover',
  height: '100vh',
  overflow: 'scroll',
  whiteSpace: 'nowrap'
}

const title = {
  color: 'white',
  paddingTop: '20px',
  fontWeight: '600'
}

const link = {
  textDecoration: 'none'
}

const useStyles = makeStyles((theme) => ({
  layout: {
    [theme.breakpoints.up('sm')]: {
      position: 'relative',
      top: '10%'
    },
    [theme.breakpoints.only('xs')]: {
      paddingTop: 20
    }
  }
}))

export default function Menu () {
  const classes = useStyles()
  const history = useHistory()

  const pushMyPanel = () => {
    history.push({
      pathname: '/Home/MyPanel',
      tab: 0
    })
  }

  return (
    <div style={root}>
      <div className={classes.layout}>
        <Grid container justify="center">
          <Grid item align="center" xs={12} sm={4} md={4} lg={3}>
            <a style={link} onClick={pushMyPanel}>
              <MenuButton icon={faThLarge} background="#27233180" />
              <Typography
                style={title}
                variant="h6"
                align="center"
                gutterBottom
              >
                Mi panel
              </Typography>
            </a>
          </Grid>

          <Grid item align="center" xs={12} sm={4} md={4} lg={3}>
            <Link style={link} to={'/Home/PublicArea/prop'}>
              <MenuButton icon={faHome} background="#27233180" />
              <Typography
                style={title}
                variant="h6"
                align="center"
                gutterBottom
              >
                Propiedades
              </Typography>
            </Link>
          </Grid>

          {/* <Grid item align="center" xs={12} sm={4} md={4} lg={3}>
            <Link style={link} to={'/Home/PublicArea/req'}>
              <MenuButton icon={faHandHoldingUsd} background="#27233180" />
              <Typography
                style={title}
                variant="h6"
                align="center"
                gutterBottom
              >
                Requerimientos
              </Typography>
            </Link>
          </Grid> */}

          <Grid item align="center" xs={12} sm={4} md={4} lg={3}>
            <Link style={link} to={'/Home/PublicArea/agents'}>
              <MenuButton icon={faUsers} background="#27233180" />
              <Typography
                style={title}
                variant="h6"
                align="center"
                gutterBottom
              >
                Agentes
              </Typography>
            </Link>
          </Grid>

          {/* <Grid item align="center" xs={12} sm={4} md={4} lg={3}>
            <Link style={link} to={'/Home/MatchView'}>
              <MenuButton icon={faHandshake} background="#27233180" />
              <Typography
                style={title}
                variant="h6"
                align="center"
                gutterBottom
              >
                Matches
              </Typography>
            </Link>
          </Grid> */}

          {/* <Grid item align="center" xs={12} sm={4} md={4} lg={3}>
            <Link style={link} to={'/Home/News'}>
              <MenuButton icon={faNewspaper} background="#27233180" />
              <Typography
                style={title}
                variant="h6"
                align="center"
                gutterBottom
              >
                Noticias
              </Typography>
            </Link>
          </Grid> */}
        </Grid>
      </div>
    </div>
  )
}
