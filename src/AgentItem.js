import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import { Rating } from '@material-ui/lab'
import './App.css'
import clsx from 'clsx'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faIdBadge,
  faPhone,
  faMapMarkerAlt,
  faHourglass
} from '@fortawesome/free-solid-svg-icons'

import useMediaQuery from '@material-ui/core/useMediaQuery'
import { PersonOutline } from '@material-ui/icons'

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
    textAlign: 'center',
    marginTop: -28
  },
  iconWrapper: {
    fontSize: '10px'
  },
  titleWrapper: {
    fontSize: 19,
    marginBottom: 10
  },
  avatarRoot: {
    backgroundColor: '#ffffff08',
    '& .MuiSvgIcon-root': {
      color: 'grey'
    }
  },
  darkAvatarRoot: {
    backgroundColor: 'rgba(1,1,1,0.3)',
    '& .MuiSvgIcon-root': {
      color: 'grey'
    }
  },
  cover: {
    objectFit: 'cover'
  },
  contain: {
    objectFit: 'contain'
  }
}))

export default function AgentItem (props) {
  const theme = useTheme()
  const xsDown = useMediaQuery(theme.breakpoints.down('xs'))
  const tinyRange = useMediaQuery('(min-width: 325px) and (max-width: 600px)')

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
    phone,
    province,
    city,
    sector
  } = hit

  const UserTitle = () => {
    return (
      <div className={classes.titleWrapper}>
        <div className={classes.fullName}>
          {licenseCode && <div className={classes.prefixe}>CBR</div>}
          <div>
            {name} {lname}
          </div>
        </div>
        <div className={classes.placeholder}>
          {role} {licenseCode && ' con licencia'}
        </div>
      </div>
    )
  }
  const address = `${province ? province + ', ' : ''}${
    city ? city + ', ' : ''
  } ${sector ?? ''}`

  const UserDetails = () => {
    return (
      <Grid container>
        <Grid container spacing={1}>
          <Detail icon={faMapMarkerAlt} value={address} />
          <Detail icon={faPhone} value={phone} />
          <Detail
            label="Licencia: "
            icon={faIdBadge}
            value={licenseCode ?? null}
          />
          <Grid item container xs={tinyRange ? 8 : 10} sm md lg xl>
            <Detail
              label="Experiencia: "
              icon={faHourglass}
              units={experience ? 'años' : null}
              value={experience}
            />
          </Grid>
          <Grid item container justify="flex-end" xs={tinyRange ? 4 : 2} sm md lg xl>
            <SellsCount />
          </Grid>
        </Grid>
      </Grid>
    )
  }

  const Detail = (props) => {
    const { icon, label, units, value } = props

    return (
      <Grid
        item
        container
        direction="row"
        style={{
          marginBottom: 10,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        <Grid container spacing={1}>
          <Grid style={{ color: 'gray' }} item>
            <FontAwesomeIcon size="lg" icon={icon} />
          </Grid>
          {label && (
            <Grid style={{ color: 'gray' }} item>
              <Typography>{label}</Typography>
            </Grid>
          )}
          <Grid item>
            <div style={{ display: 'block' }}>
              <Typography>
                <span>{value || '-'}</span>{' '}
                <span style={{ color: 'gray' }}>{value ? units : ''}</span>
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Grid>
    )
  }

  Detail.defaultProps = {
    icon: null,
    label: null,
    value: null,
    units: ''
  }

  Detail.propTypes = {
    icon: PropTypes.any,
    label: PropTypes.string,
    value: PropTypes.any,
    units: PropTypes.string
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
          Negocios cerrados
        </Typography>
      </div>
    )
  }

  return (
    <Card className={classes.root}>
      <CardContent className={classes.cardContent}>
        <Grid container direction={!xsDown ? 'row' : 'column'} spacing={2}>
          <Grid item container justify="center" xs={12} sm={4} md={4} lg={4}>
            <Grid className={classes.avatar}>
              <Avatar
                // eslint-disable-next-line react/no-children-prop
                children={<PersonOutline style={{ fontSize: 100 }} />}
                classes={{
                  root: xsDown ? classes.darkAvatarRoot : classes.avatarRoot,
                  img: xsDown ? classes.contain : classes.cover
                }}
                className={clsx(classes.avatar)}
                src={photoUrl}
                variant="square"
              />
            </Grid>
            <Grid>
              <Rating style={{ marginTop: 5 }} value={score} readOnly />
            </Grid>
          </Grid>
          <Grid item container direction="column" xs={12} sm={8} md={8} lg={8}>
            <Grid item container style={{ marginBottom: 10 }}>
              <Grid item>
                <UserTitle />
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
    phone: PropTypes.string,
    province: PropTypes.string,
    city: PropTypes.string,
    sector: PropTypes.string
  }).isRequired
}
