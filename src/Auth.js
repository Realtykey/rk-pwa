import React, { createContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { app } from './base'
import PropTypes from 'prop-types'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const history = useHistory()

  const [currentUser, setCurrentUser] = useState(undefined)

  useEffect(() => {
    const load = async () => {
      try {
        return app.auth().onAuthStateChanged((user) => {
          setCurrentUser(user)
          if (user === null) {
            history.push('/SignIn')
          } else {
            // history.push('/Home')
          }
        })
      } catch (e) {
        console.log('onAuthStateChanged error:', e)
      }
    }

    const unsubscribe = load()

    return async () => await unsubscribe
  }, [])

  if (currentUser === undefined) {
    return <div style={{ color: 'white' }}>... cargando</div>
  }

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
}
