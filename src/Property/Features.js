import React from 'react'
import PropTypes from 'prop-types'
import Chip from '@material-ui/core/Chip'
import Grid from '@material-ui/core/Grid'

import HotelIcon from '@material-ui/icons/Hotel'
import BathtubIcon from '@material-ui/icons/Bathtub'
import AspectRatioIcon from '@material-ui/icons/AspectRatio'
import DriveEtaIcon from '@material-ui/icons/DriveEta'

export default function Features (props) {
  const { propData } = props
  const { dormitories, bathrooms, area, parkings } = propData
  const root = {
    margin: '20px auto'
  }
  return (
    <div style={root}>
      <Grid spacing={1} container direction="row" alignItems="center">
        <Grid sm={3} xs={4} align="center" item>
          {dormitories && (
            <Chip
              variant="outlined"
              icon={<HotelIcon />}
              label={' Dormitorios ' + dormitories}
            ></Chip>
          )}
        </Grid>

        <Grid sm={3} xs={4} align="center" item>
          {bathrooms && (
            <Chip
              variant="outlined"
              icon={<BathtubIcon />}
              label={' Baños ' + bathrooms}
            />
          )}
        </Grid>

        <Grid sm={3} xs={4} align="center" item>
          <Chip
            variant="outlined"
            icon={<AspectRatioIcon />}
            label={' Area ' + area + ' m²'}
          />
        </Grid>

        <Grid sm={3} xs={12} align="center" item>
          {parkings && (
            <Chip
              variant="outlined"
              icon={<DriveEtaIcon />}
              label={' Parqueaderos ' + parkings}
            />
          )}
        </Grid>
      </Grid>
    </div>
  )
}

Features.propTypes = {
  propData: PropTypes.shape({
    dormitories: PropTypes.number,
    bathrooms: PropTypes.number,
    area: PropTypes.number,
    parkings: PropTypes.number
  })
}
