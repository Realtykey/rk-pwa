import React from 'react'
import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'

const PaperComponent = ({ children }) => {
  return (
    <Paper>
      <Box borderRadius={10}>{children}</Box>
    </Paper>
  )
}

PaperComponent.propTypes = {
  children: PropTypes.element.isRequired
}

export default function Alert (props) {
  const { onClose, message } = props

  return (
    <Dialog
      PaperComponent={PaperComponent}
      disableBackdropClick
      open={!!message}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <Box
          display="flex"
          height={80}
          marginBottom={2}
          alignItems="center"
          justifyContent="center"
        >
          <FontAwesomeIcon
            color="#ffa733"
            size="5x"
            icon={faExclamationTriangle}
          />
        </Box>
        <DialogTitle id="alert-dialog-title">
          <Box fontWeight="fontWeightBold">{message}</Box>
        </DialogTitle>
      </DialogContent>
      <DialogActions>
        <Button fullWidth onClick={onClose} variant="outlined" autoFocus>
          ok
        </Button>
      </DialogActions>
    </Dialog>
  )
}

Alert.propTypes = {
  onClose: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired
}
