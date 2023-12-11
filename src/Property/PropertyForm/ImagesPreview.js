import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile'
import PropTypes from 'prop-types'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden'
  },
  gridList: {
    display: 'flex'
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)'
  },
  shadedImg: {
    boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)'
  },

  shadedTile: {
    transition: '0.3s',
    boxShadow: '0 16px 70px  rgba(0,0,0,0.3)'
  }
}))

export default function ImagesPreview (props) {
  const { urls } = props
  const classes = useStyles()

  return (
    <div align="left" className={classes.root}>
      <GridList className={classes.gridList} cols={3}>
        {urls &&
          urls.map((url, index) => {
            return urls.length > 1
              ? (
              <GridListTile
                key={url}
                cols={index === 0 || index === 1 ? 1.5 : 1}
                rows={index === 0 || index === 1 ? 1.3 : 0.7}
                className={classes.shadedTile}
              >
                <img alt="prop tile" src={url} />
              </GridListTile>
                )
              : (
              <GridListTile key={url} cols={3} rows={3}>
                <img alt="prop tile" className={classes.shadedImg} src={url} />
              </GridListTile>
                )
          })}
      </GridList>
    </div>
  )
}

ImagesPreview.propTypes = {
  urls: PropTypes.array
}
