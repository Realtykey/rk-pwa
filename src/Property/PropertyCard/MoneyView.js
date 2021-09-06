import React from 'react'
import PropTypes from 'prop-types'

import Grid from '@material-ui/core/Grid'
import Chip from '@material-ui/core/Chip'

const chip = {
  background: 'white',
  color: '#292131',
  fontWeight: 'bolder'
}

const highlighted = {
  background: 'white',
  color: 'red',
  fontWeight: 'bolder'
}

export default function MoneyView (props) {
  const { propData } = props
  const { comission, price } = propData
  const { percent, value } = comission ?? {}

  const root = {
    margin: '20px auto'
  }
  return (
    <div style={root}>
      <Grid spacing={1} container direction="row" alignItems="center">
        <Grid item>
          <Chip
            style={chip}
            label={comission ? 'Precio $ ' + price : 'Presupuesto $ ' + price}
          />
        </Grid>
        {comission && (
          <>
            <Grid item>
              <Chip
                style={chip}
                label={' Te Comparto ' + Number.parseFloat(percent) + '%'}
              />
            </Grid>
            <Grid item>
              <Chip
                style={highlighted}
                variant="outlined"
                label={'Tu Ganas $ ' + Number.parseFloat(value)}
              />
            </Grid>{' '}
          </>
        )}
      </Grid>
    </div>
  )
}

MoneyView.propTypes = {
  propData: PropTypes.object,
  price: PropTypes.number
}
