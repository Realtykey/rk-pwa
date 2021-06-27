import React, { useState } from 'react'
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

export default function ChipsArray () {
  const classes = useStyles()
  const [items, setChipData] = useState({
    north: { label: 'Norte', selected: false },
    south: { label: 'Sur', selected: false },
    center: { label: 'Centro', selected: false },
    valleys: { label: 'Valles', selected: false }
  })

  return (
    <FormControlLabel
      style={{ margin: 0 }}
      checked={true}
      label="Sectores en los que trabajas"
      labelPlacement="top"
      control={
        <Paper variant="outlined" color="" className={classes.root}>
          {Object.entries(items).map(([key, item]) => {
            console.log('key', key)
            return (
              <li key={key}>
                <Chip
                  onClick={() => {
                    const updatedChip = { ...item, selected: !item.selected }
                    const updatedChips = { ...items }
                    updatedChips[key] = updatedChip

                    setChipData(updatedChips)
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
  )
}
