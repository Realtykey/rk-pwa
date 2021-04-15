import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Chip from '@material-ui/core/Chip'
import UserComments from './UserComments'
import { Rating } from '@material-ui/lab'
import '../App.css'

const useStyles = makeStyles(() => ({
  root: {
    width: 290,
    maxWidth: 290
  },
  muicard: {
    borderRadius: 25
  },
  bigAvatar: {
    marginTop: 10,
    margin: '0 auto',
    width: 150,
    height: 150
  },
  outerCircle: {
    marginTop: -60,
    borderRadius: '100%',
    margin: '0 auto',
    width: 170,
    height: 170,
    backgroundColor: 'white'
  },
  cardHeader: {
    color: 'white',
    textAlign: 'center',
    backgroundColor: '#006ED5',
    paddingBottom: 70
  },
  flex: {
    display: 'flex'
  },
  ratingWrapper: {
    margin: '0 auto'
  },
  commentsButton: {
    color: 'white',
    backgroundColor: '#4D81ED',
    width: '100%',
    margin: '0 auto'
  }
}))

export default function AgentCard (props) {
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(false)
  const { agent } = props

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <div>
      {agent && (
        <Card className={classes.muicard}>
          {!expanded && (
            <div className={classes.root}>
              <CardHeader
                className={classes.cardHeader}
                title={agent.name + ' ' + agent.lname}
                subheader="Quito"
              />

              <div className={classes.flex}>
                <div className={classes.outerCircle}>
                  <Avatar
                    alt="No photo"
                    src={agent.photoUrl}
                    className={classes.bigAvatar}
                  />
                </div>
              </div>

              <CardActions className={classes.flex} disableSpacing>
                <div className={classes.ratingWrapper}>
                  <Rating value={agent.score} readOnly />
                </div>
              </CardActions>
              <CardContent className={classes.flex}>
                <Button
                  className={classes.commentsButton}
                  variant="outlined"
                  onClick={handleExpandClick}
                >
                  Ver comentarios
                </Button>
              </CardContent>

              <CardContent>
                <Grid
                  spacing={2}
                  container
                  direction="column"
                  justify="flex-start"
                  alignItems="center"
                >
                  <Grid item>
                    <Chip
                      label={'Nombre ' + agent.name + ' ' + agent.lname}
                      variant="outlined"
                    />
                  </Grid>
                  {agent.licenseCode && <Grid item>
                    <Chip
                      label={'Licencia ' + agent.licenseCode}
                      variant="outlined"
                    />
                  </Grid>}
                  <Grid item>
                    <Chip label={'Celular ' + agent.phone} variant="outlined" />
                  </Grid>
                  <Grid item>
                    <Chip
                      label={'Negocios cerrados ' + agent.sells}
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </div>
          )}

          {expanded && (
            <CardContent className={classes.root}>
              <Button onClick={handleExpandClick} variant="outlined">
                Volver
              </Button>
              <UserComments userData={agent} />
            </CardContent>
          )}
        </Card>
      )}
    </div>
  )
}

AgentCard.propTypes = {
  agent: PropTypes.object
}

AgentCard.defaultProps = {
  agent: null
}
