import React, { useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Link from '@material-ui/core/Link';

import LocationOnIcon from '@material-ui/icons/LocationOn';

import { green } from '@material-ui/core/colors';
import { orange } from '@material-ui/core/colors';
import { red } from '@material-ui/core/colors';

import Divider from '@material-ui/core/Divider';

import { spacing } from '@material-ui/system';

import Box from '@material-ui/core/Box';

import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import Chip from '@material-ui/core/Chip';

import Rating from '@material-ui/lab/Rating';

import HomeIcon from '@material-ui/icons/Home';

//database
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';


//custom comps
import Container from '@material-ui/core/Container';
import ProfileAvatar from '../Property/PropertyCard/ProfileAvatar'
import PropertyDetails from '../Property/PropertyCard/PropertyDetails'
//prop info icons
import HotelIcon from '@material-ui/icons/Hotel';
import BathtubIcon from '@material-ui/icons/Bathtub';
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import Grid from '@material-ui/core/Grid';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: 30,
    backgroundColor: theme.palette.background.custom,
    fontSize: '14px',
    maxWidth: window.screen.width < 600 ? window.screen.width : 600,
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
    }
  },
  media: {
    width: 600,
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },

  comission: {
    backgroundColor: '#ffe082',
    color: 'black'
  },

  placeholder: {
    color: "gray",
    size: '5px'
  },

  highlight: {
    color: "gray"
  },

  address: {

  }

}));

export default function RequestCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  let doc = props.doc;
  let data = props.doc.data();



  const [publisher, setPublisher] = React.useState();

  useEffect(
    () => {
      const db = firebase.firestore();

      if (data.uid) {
        db.collection('users').doc(data.uid).get()
          .then(
            (userDoc) => {
              setPublisher(userDoc);
            }
          );

      }


    }
    , []
  )

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  return (
    <Card className={classes.root}>
      <ProfileAvatar uid={data.uid} />
      <CardMedia
        className={classes.media}
        image={data.map.snapUrl}
        title="Paella dish"
      />

      <CardActions >

        <Grid container spacing={2} direction="column" >

          <Grid item direction="column" spacing={2} container>

            <Grid item>

              <PropertyDetails propData={data} />

            </Grid>

            <Divider variant="middle" />

            <Grid
              spacing={2}
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
              item
            >
              <Grid xs={12} item>
                <div>Precio</div>
              </Grid>

              <Grid xs={12} item>
                <Chip
                  style={{ color: 'white', backgroundColor: green[400] }}
                  label={" $ " + data.price}
                />

              </Grid>

            </Grid>

          </Grid>

          <br />

          <Divider variant="middle" />
          <br />

          <Grid item container spacing={2} >

            <Grid xs={12} sm={4} item>
              <Chip
                variant="outlined"
                icon={<HotelIcon />}
                label={" Dormitorios " + data.dormitories}
              >
              </Chip>

            </Grid>

            <Grid xs={12} sm={4} item>
              <Chip
                variant="outlined"
                icon={<BathtubIcon />}
                label={" Baños " + data.bathrooms}
              />
            </Grid>

            <Grid xs={12} sm={4} item>
              <Chip
                variant="outlined"
                icon={<AspectRatioIcon />}
                label={" Area " + data.area}
              />
            </Grid>

            <Grid xs={12} sm={4} item>
              <Chip
                variant="outlined"
                icon={<DriveEtaIcon />}
                label={" Parqueaderos " + data.parkings}
              />
            </Grid>

          </Grid>

          <Grid item justify="flex-end" container >

            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>

          </Grid>


        </Grid>

      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>

        </CardContent>
      </Collapse>

    </Card>
  );
}


