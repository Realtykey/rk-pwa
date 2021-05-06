import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Link from '@material-ui/core/Link'
import Modal from '@material-ui/core/Modal'
import PropertyCard from './Property/PropertyCard/PropertyCard'
import AgentItem from './AgentItem'
import AgentCard from './AgentCard/AgentCard'

import Search from './SearchEngine/Search'

import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import './App.css'

function Copyright () {
  return (
    <Typography variant="body2" color="textSecondary">
      {'Copyright © '}
      <Link color="inherit" href="#">
        V&M HOME
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
    minHeight: window.screen.height,
    backgroundColor: theme.palette.background.default,
    paddingTop: 20
  },
  main: {
    width: '100%',
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
        : theme.palette.background.default
  },
  search: {
    padding: theme.spacing(3, 2),
    height: 'auto',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[200]
        : theme.palette.grey[800]
  },
  cardGrid: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(8)
  },
  resultsCount: {
    textAlign: 'center',
    color: 'gray'
  },
  paper: {
    position: 'absolute',
    width: 'auto'
  }
}))

function getModalStyle () {
  const top = 50
  const left = 50

  return {
    outline: 'none',
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    border: 'none'
  }
}

export default function PublicArea () {
  const dispatch = useDispatch()
  const classes = useStyles()
  const { type } = useParams()

  const [modalStyle] = React.useState(getModalStyle)
  const userPreview = useSelector((state) => state.general.userPreview)
  const setUserPreview = (userPreview) =>
    dispatch({ type: 'USER_PREVIEW', payload: userPreview })

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <AgentCard
        agent={userPreview}
        style={{ paddingLeft: '30px' }}
      ></AgentCard>
    </div>
  )

  let refinementAttributes = [
    { name: 'propType', label: 'tipo' },
    { name: 'operation', label: 'operación' }
  ]

  let rangeAtributes = [
    { name: 'bathrooms', label: 'baños' },
    { name: 'dormitories', label: 'dormitorios' },
    { name: 'parkings', label: 'parqueaderos' },
    { name: 'area', label: 'área' }
  ]

  let indexName
  let hitComponent = PropertyCard

  switch (type) {
    case 'agents':
      indexName = 'dev_USERS'

      refinementAttributes = []

      rangeAtributes = []
      hitComponent = AgentItem
      break

    case 'req':
      indexName = 'dev_REQUESTS'
      break

    case 'prop':
      indexName = 'dev_PROPERTIES'
      break

    default:
      indexName = 'dev_PROPERTIES'
  }
  return (
    <div className={classes.root}>
      <Search
        rangeAtributes={rangeAtributes}
        refinementAttributes={refinementAttributes}
        hitComponent={hitComponent}
        indexName={indexName}
      />
      <Modal open={!!userPreview} onClose={() => setUserPreview(null)}>
        {body}
      </Modal>
      <footer className={classes.footer}>
        <Container align="center" maxWidth="sm">
          <Typography variant="body1">Realty Key</Typography>
          <Copyright />
        </Container>
      </footer>
    </div>
  )
}
