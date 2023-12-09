import React, { useState, useContext, useEffect } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Link from '@material-ui/core/Link'

import { AuthContext } from './Auth.js'
import PropertyCard from './Property/PropertyCard/PropertyCard.js'

function Copyright () {
  return (
    <Typography variant="body2" color="textSecondary">
      {'Copyright © '}
      <Link color="inherit" href="#">
        2020 V&M HOME
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  },
  main: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4)
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    color: 'white',
    backgroundColor:
      theme.palette.type === 'light'
        ? 'white'
        : theme.palette.background.custom
  },
  cardGrid: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(8)
  }
}))

export default function PersonalArea () {
  const classes = useStyles()

  const [properties, setProps] = useState([])
  const { currentUser } = useContext(AuthContext)

  const deleteProp = async (doc) => {
    const { app } = await import('./base')

    app
      .firestore()
      .collection('properties')
      .doc(doc.id)
      .delete()
      .then(function () {
        setProps(
          properties.filter(function (element) {
            return element !== doc
          })
        )
      })
      .catch(function (error) {
        console.error('Error removing document: ', error)
      })
  }

  const loadProps = async () => {
    const uid = currentUser.uid

    const { app } = await import('./base')

    app
      .firestore()
      .collection('properties')
      .where('uid', '==', uid)
      .get()
      .then(async (snap) => {
        if (snap.docs.length === 0) return
        setProps(snap.docs)
      })
  }

  useEffect(() => {
    loadProps()
  }, [])

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Grid container>
        {properties.map((prop) => (
          <Grid
            container
            className={classes.cardGrid}
            justifyContent="center"
            item
            key={prop.id}
            xs={12}
            sm={12}
          >
            <PropertyCard
              align="center"
              private={true}
              deleteProp={deleteProp}
              doc={prop}
            ></PropertyCard>
          </Grid>
        ))}
      </Grid>

      <footer className={classes.footer}>
        <Container align="center" maxWidth="sm">
          <Typography variant="body1"> Realty Key </Typography>
          <Copyright />
        </Container>
      </footer>
    </div>
  )
}
