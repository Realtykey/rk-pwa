import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import List from '@material-ui/core/List'
import './styles/general.css'
import clsx from 'clsx'

export default function Scrollable (props) {
  const { className, children } = props

  useEffect(() => {}, [children])

  return <List className={clsx(className, 'hidden-scroll')}>{children}</List>
}

Scrollable.propTypes = {
  className: PropTypes.any,
  children: PropTypes.array
}

Scrollable.defaultProps = {
  className: {},
  children: null
}
