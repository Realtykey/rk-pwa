import React, { useState, useContext } from 'react'
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

const AlertContext = React.createContext({
  message: '',
  setMessage: () => {},
  onClose: () => {}
})

export const withAlert = (WrappedComponent) => {
  const AlertWrapper = (props) => {
    const [message, setMessage] = useState('')

    const onClose = () => {
      setMessage('')
    }
    return (
      <>
        <AlertContext.Provider value={{ message, setMessage, onClose }}>
          <WrappedComponent {...props} />
          <Alert />
        </AlertContext.Provider>
      </>
    )
  }
  return AlertWrapper
}

export const useAlert = () => {
  return useContext(AlertContext)
}

const PaperComponent = ({ children }) => {
  return (
    <Paper>
      <Box borderRadius={10}>{children}</Box>
    </Paper>
  )
}

PaperComponent.propTypes = {
  children: PropTypes.array.isRequired
}

export default function Alert () {
  const { message, onClose } = useAlert()

  return (
    <Dialog
      PaperComponent={PaperComponent}
      disableBackdropClick
      open={message !== ''}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <Box
          display="flex"
          marginBottom={1}
          alignItems="center"
          justifyContent="center"
        >
          <FontAwesomeIcon
            color="#ffa733"
            size="4x"
            icon={faExclamationTriangle}
          />
        </Box>
        <DialogTitle id="alert-dialog-title">
          <Box textAlign="center">{message}</Box>
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
