//
import React from 'react';

//prop info icons
import HotelIcon from '@material-ui/icons/Hotel';
import BathtubIcon from '@material-ui/icons/Bathtub';
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import Grid from '@material-ui/core/Grid';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';


import Typography from '@material-ui/core/Typography';

//lista de carpetas material ui

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
//price avatar
import blue from '@material-ui/core/colors/blue';

import { red } from '@material-ui/core/colors';
import { green } from '@material-ui/core/colors';
import { orange } from '@material-ui/core/colors';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';



const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  blue: {
    color: theme.palette.getContrastText(blue[300]),
    backgroundColor: blue[300],
  },
}));

const flexContainer = {
    display: 'flex',
    flexDirection: 'row',
    padding: 0,
  };

export default function PropertyInfo(props) {
    const classes = useStyles();

    const propDoc = props.doc;
    const data = propDoc.data();

    return (
        <div>
        <Grid item direction="column" spacing = {2} container>

          <Grid  item>
              <Chip
              style={{backgroundColor:green[200]}}
              label = {"Precio "+data.price+" $ "}
            />

          </Grid>

          <Grid  item>
              <Chip
              style={{backgroundColor:orange[200]}}
              variant="outlined"
              label = {'Comisión '+data.comission.percent+' % | '+data.comission.value+' $'}
            />

          </Grid>

          <Divider/>

          <Grid  item>

          <Typography paragraph>
            Descripción : {data.description}
          </Typography>

          <Typography paragraph>
          Tipo : {data.propType}
          </Typography>


          </Grid>


        </Grid>

      <br/>

      <Divider  />
      <br/>

      <Grid item container spacing={2} >

          <Grid xs={12} sm={4} item>
            <Chip
            variant="outlined"
            icon={<HotelIcon />}
            label = {" Dormitorios "+data.dormitories}
            >
            </Chip>

          </Grid>

          <Grid xs={12} sm={4} item>
            <Chip
            variant="outlined"
            icon={<BathtubIcon />}
            label = {" Baños "+data.bathrooms}
          />
          </Grid>

          <Grid xs={12} sm={4} item>
            <Chip
            variant="outlined"
            icon={<AspectRatioIcon />}
            label = {" Area "+data.area}
          />
          </Grid>

          <Grid xs={12} sm={4} item>
            <Chip
            variant="outlined"
            icon={<DriveEtaIcon />}
            label = {" Parqueaderos "+data.parqueaderos}
          />
          </Grid>

      </Grid> 




      </div>
  );
  
  }
  