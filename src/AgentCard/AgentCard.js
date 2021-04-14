import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Button from '@material-ui/core/Button';

import HomeWorkIcon from '@material-ui/icons/HomeWork';
import Grid from '@material-ui/core/Grid';
import '../App.css'
//chip avatares
import Chip from '@material-ui/core/Chip';

import UserComments from './UserComments'

//rating
import { Rating } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  muicard: {
    borderRadius: '25px'
  },
  root: {
    width: '290px',
    maxWidth: '290px',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },

  avatar: {
    backgroundColor: red[500],
  },
  bigAvatar: {
    marginTop:'10px',
    margin: '0 auto',
    width: 150,
    height: 150,
  },
  outerCircle:{
    marginTop:'-60px',
    borderRadius:'100%',
    margin: '0 auto',
    width: 170,
    height: 170,
    backgroundColor:'white',
  },
  cardHeader:{
    color:'white',
    textAlign: 'center',
    backgroundColor : 'rgb(0	110	213	)',
    paddingBottom:'70px'
  }
}));

export default function AgentCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const agent = props.agent ? props.agent : null;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  return (
    <div>
      {agent && (
        <Card className={classes.muicard}>
          {!expanded &&
            <div className={classes.root}>
              <CardHeader
                className={classes.cardHeader}
                title={agent.name + " " + agent.lname}
                subheader="Quito"
              />

              <div style={{ display: 'flex' }}>
                <div className = {classes.outerCircle}>
                  <Avatar alt="No photo" src={agent.photoUrl} className={classes.bigAvatar} />
                </div>
              </div>

              <CardActions style={{ display: 'flex' }} disableSpacing>
                <div style={{ margin: '0 auto' }}>
                  <Rating value={agent.score} readOnly />
                </div>
              </CardActions>
              <CardContent style={{ display: 'flex' }} >
                <Button
                  style={{ color: 'white', backgroundColor: 'rgb(77	129	237)', width: '100%', margin: "0 auto" }}
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
                      label={"Nombre " + agent.name + " " + agent.lname}

                      variant="outlined"
                    />

                  </Grid>
                  <Grid item>
                    <Chip
                      label={"Licencia " + agent.licenseCode}

                      variant="outlined"
                    />

                  </Grid>
                  <Grid item>

                    <Chip
                      label={"Celular " + agent.phone}

                      variant="outlined"

                    />

                  </Grid>
                  <Grid item>

                    <Chip
                      label={"Negocios cerrados " + agent.sells}

                      variant="outlined"
                    />

                  </Grid>

                </Grid>


              </CardContent>
            </div>

          }

          {expanded &&
            <CardContent className={classes.root}>
              <Button onClick={handleExpandClick} variant="outlined">Volver</Button>
              <UserComments userData={agent} />
            </CardContent>
          }

        </Card>
      )
      }

    </div >
  );
}