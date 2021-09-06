import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'

import ProfileAvatar from './ProfileAvatar.js'
import PropertyDetails from './PropertyDetails'
import MoneyView from './MoneyView'
import Features from '../Features'
import ImagesPreview from '../PropertyForm/ImagesPreview.js'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
    marginBottom: 30,
    borderRadius: 15,
    backgroundColor: theme.palette.background.custom,
    fontSize: 14,
    width: 600,
    transition: '0.3s',
    boxShadow: '0 8px 40px -12px #000000',
    '&:hover': {
      boxShadow: '0 16px 70px -12.125px #000000'
    }
  }
}))

export default function PropertyCard (props) {
  const classes = useStyles()
  const { hit } = props
  const { uid, photos, comission } = hit

  return (
    <Card className={classes.root}>
      <ProfileAvatar uid={uid} />
      {comission && (
        <CardContent>
          <ImagesPreview urls={photos} />
        </CardContent>
      )}

      <CardActions>
        <Grid container spacing={2} direction="column">
          <Grid item direction="column" spacing={2} container>
            <PropertyDetails propData={hit} />
            <Divider variant="middle" />
            <MoneyView propData={hit} />
          </Grid>
          <Divider variant="middle" />
          <Features propData={hit} />
        </Grid>
      </CardActions>
    </Card>
  )
}

PropertyCard.propTypes = {
  hit: PropTypes.shape({
    uid: PropTypes.string,
    photos: PropTypes.array,
    comission: PropTypes.object
  }).isRequired
}
