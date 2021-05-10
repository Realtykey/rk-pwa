import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import { Rating } from '@material-ui/lab'
import './App.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faIdBadge,
  faPhone,
  faMapMarkerAlt,
  faHourglass
} from '@fortawesome/free-solid-svg-icons'

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 12,
    margin: 'auto',
    marginBottom: 10,
    width: 600,
    transition: '0.3s',
    boxShadow: '0 8px 40px -12px #000000',
    '&:hover': {
      boxShadow: '0 16px 70px -12.125px #000000'
    }
  },
  avatar: {
    borderRadius: 15,
    width: '100%',
    minWidth: '100%',
    height: 200,
    minHeight: 200
  },
  fullName: { display: 'flex', flexDirection: 'row' },
  prefixe: { color: 'gray', marginRight: 5 },
  placeholder: {
    color: 'gray',
    marginTop: 4
  },
  cardContent: {
    '&:last-child': {
      paddingBottom: 4
    }
  },
  sellsCount: {
    textAlign: 'center'
  },
  iconWrapper: {
    fontSize: '10px'
  }
}))

export default function AgentItem (props) {
  const classes = useStyles()
  const { hit } = props
  const {
    name,
    lname,
    photoUrl,
    sells,
    licenseCode,
    role,
    score,
    experience,
    phone
  } = hit

  const UserTitle = () => {
    return (
      <div>
        <div className={classes.fullName}>
          {licenseCode && <div className={classes.prefixe}>CBR</div>}
          <div>
            {name} {lname}
          </div>
        </div>
        <div className={classes.placeholder}>
          {role} {licenseCode && 'con licencia'}
        </div>
      </div>
    )
  }

  const UserDetails = () => {
    return (
      <Grid container>
        <Grid container spacing={1}>
          <Detail
            icon={faMapMarkerAlt}
            label="Dirección"
            value={'la china y la conchinchina'}
          />
          {licenseCode ? <Detail icon={faIdBadge} label="Licencia" value={licenseCode} /> : <></>}
          <Detail icon={faPhone} label="Celular" value={phone} />
          {experience ? <Detail icon={faHourglass} label="Experiencia" value={experience} /> : <></>}
        </Grid>
      </Grid>
    )
  }

  const Detail = (props) => {
    const { icon, label, value } = props

    const grids = label === 'Dirección' ? 12 : 6

    return (
      <Grid
        item
        container
        direction="row"
        xs={grids}
        sm={grids}
        md={grids}
        lg={grids}
        style={{ marginBottom: 10 }}
      >
        <Grid container spacing={1}>
          <Grid style={{ color: 'gray' }} item>
            <FontAwesomeIcon size="lg" icon={icon} />
          </Grid>
          <Grid style={{ color: 'gray' }} item>
            <Typography>{label}</Typography>
          </Grid>
          <Grid item>
            <Typography>
              {label === 'Experiencia' ? value + ' años' : value + ''}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    )
  }

  Detail.propTypes = {
    icon: PropTypes.any.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired
  }

  const SellsCount = () => {
    return (
      <div className={classes.sellsCount}>
        <Typography
          style={{ fontWeight: 'bold', fontSize: 26, lineHeight: '24px' }}
        >
          {sells}
        </Typography>
        <Typography style={{ color: 'gray', marginTop: 4 }}>
          {' '}
          negocios cerrados
        </Typography>
      </div>
    )
  }

  return (
    <Card className={classes.root}>
      <CardContent className={classes.cardContent}>
        <Grid container direction="row" spacing={2}>
          <Grid item container justify="center" xs={4} sm={4} md={4} lg={4}>
            <Grid className={classes.avatar}>
              <Avatar
                className={classes.avatar}
                src={photoUrl}
                variant="square"
              />
            </Grid>
            <Grid>
              <Rating style={{ marginTop: 5 }} value={score} readOnly />
            </Grid>
          </Grid>
          <Grid item container direction="column" xs={8} sm={8} md={8} lg={8}>
            <Grid item container style={{ marginBottom: 10 }}>
              <Grid item xs={9} sm={9} md={9} lg={9}>
                <UserTitle />
              </Grid>
              <Grid item xs={3} sm={3} md={3} lg={3}>
                <SellsCount />
              </Grid>
            </Grid>
            <UserDetails />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

AgentItem.propTypes = {
  hit: PropTypes.shape({
    name: PropTypes.string,
    lname: PropTypes.string,
    photoUrl: PropTypes.string,
    sells: PropTypes.number,
    licenseCode: PropTypes.string,
    role: PropTypes.string, 
    score: PropTypes.number,
    experience: PropTypes.any,
    phone: PropTypes.string
  }).isRequired
}
