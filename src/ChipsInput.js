import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Chip from '@material-ui/core/Chip'
import Paper from '@material-ui/core/Paper'
import FormControlLabel from '@material-ui/core/FormControlLabel'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0
  },
  chip: {
    margin: theme.spacing(0.5)
  }
}))

export default function ChipsInput (props) {
  const classes = useStyles()
  const { chips, onChipSelected } = props

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ margin: '0 auto' }}>
        <FormControlLabel
          style={{ textAlign: 'center' }}
          checked={true}
          label="Sectores en los que trabajas"
          labelPlacement="top"
          control={
            <Paper variant="outlined" color="" className={classes.root}>
              {Object.entries(chips).map(([key, item]) => {
                return (
                  <li key={key}>
                    <Chip
                      onClick={() => {
                        const updatedChip = {
                          ...item,
                          selected: !item.selected
                        }
                        const updatedChips = { ...chips }
                        updatedChips[key] = updatedChip

                        onChipSelected(updatedChips)
                      }}
                      variant={item.selected ? 'default' : 'outlined'}
                      label={item.label}
                      className={classes.chip}
                    />
                  </li>
                )
              })}
            </Paper>
          }
        />
      </div>
    </div>
  )
}

ChipsInput.defaultProps = {
  chips: {},
  onChipSelected: () => {}
}

ChipsInput.propTypes = {
  chips: PropTypes.object,
  onChipSelected: PropTypes.func
}
