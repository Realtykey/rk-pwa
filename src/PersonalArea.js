import React,{useState,useContext,useEffect} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

import { AuthContext } from "./Auth.js";
//custom comps
import PropertyCard from './Property/PropertyCard/PropertyCard.js'

//database
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary">
      {'Copyright © '}
      <Link color="inherit" href="#">
        Valeria
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const db = firebase.firestore();


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',

  },
  main: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
  },
  cardGrid: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(8),
  },
}));

export default function PersonalArea() {
  const classes = useStyles();

  const [props,setProps] = useState([]);
  const {currentUser} = useContext(AuthContext);

  const deleteProp = async (doc) => {
    
    console.log('method reached');
    const { app } = await import('./base');

    app.firestore().collection("properties").doc(doc.id).delete().then(function() {

      setProps(props.filter(function(element){ return element != doc}));
  
  }).catch(function(error) {
      console.error("Error removing document: ", error);
  });
  
  }

  const loadProps = async ()=>{
        let uid = currentUser.uid; 

        const { app } = await import('./base');
        
        //snap con props del usuario
        app.firestore().collection('properties').where('uid','==',uid).get()
        .then(async (snap) =>
        {
          if(snap.docs.length===0){
            console.log('empty props');
          }else{
            console.log(`${currentUser.email} props:`);
            console.log('fetched props : '+snap.docs.length);
            setProps(snap.docs);
          }
        }
        );
        
  }
  
  useEffect( () => {

    //store props in state
    loadProps();
  },[])

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Grid container>

          {props.map((prop) => (

            <Grid container className ={classes.cardGrid} justify="center" item key={prop.id} xs={12}  sm={12}>

              <PropertyCard align="center" private ={true} deleteProp={deleteProp} doc={prop}>

              </PropertyCard>
            </Grid>

          ))}

      </Grid>


      <footer className={classes.footer}>
        <Container align="center" maxWidth="sm">
          <Typography variant="body1"> Realty key</Typography>
          <Copyright />
        </Container>
      </footer>
    </div>
  );
}