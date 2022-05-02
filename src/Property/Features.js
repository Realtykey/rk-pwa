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
    margin: '20px 10px'
  }
  const chip = {
    width: '100%'
  }
  return (
    <div style={root}>
      <Grid spacing={1} container direction="row" alignItems="center">
        <Grid xs={6} sm={6} md={3} lg={3} xl={3} xxl={3} align="center" item>
          {dormitories && (
            <Chip
              style={chip}
              variant="outlined"
              icon={<HotelIcon />}
              label={' Dormitorios ' + dormitories}
            ></Chip>
          )}
        </Grid>

        <Grid xs={6} sm={6} md={3} lg={3} xl={3} xxl={3} align="center" item>
          {bathrooms && (
            <Chip
              style={chip}
              variant="outlined"
              icon={<BathtubIcon />}
              label={' Baños ' + bathrooms}
            />
          )}
        </Grid>

        <Grid xs={6} sm={6} md={3} lg={3} xl={3} xxl={3} align="center" item>
          {parkings && (
            <Chip
              style={chip}
              variant="outlined"
              icon={<DriveEtaIcon />}
              label={' Garages ' + parkings}
            />
          )}
        </Grid>

        <Grid xs={6} sm={6} md={3} lg={3} xl={3} xxl={3} align="center" item>
          <Chip
            style={chip}
            variant="outlined"
            icon={<AspectRatioIcon />}
            label={' Area ' + area + ' m²'}
          />
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
