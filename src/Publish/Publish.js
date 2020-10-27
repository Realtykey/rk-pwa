// redux and firebase
//https://medium.com/quick-code/how-to-integrate-react-redux-and-firebase-in-3-simple-steps-c44804a6af38
//redux con hooks https://www.youtube.com/watch?v=tcCS4mGAq7Q
//https://thoughtbot.com/blog/using-redux-with-react-hooks
//vim https://www.youtube.com/watch?v=4WTV6ZCY4qo

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

//check view
import { green } from '@material-ui/core/colors';

//custom comp

//custom components
import loadable from '@loadable/component';

//redux imports
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux'
import { setStepAction } from '../redux.js';

// Components

import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';



/*ENRUTAMIENTO*/
import {
  useParams,
  Link
} from "react-router-dom";



const PropertyForm = loadable(() => import('../Property/PropertyForm/PropertyForm'));
const RequestForm = loadable(() => import('../Request/RequestForm'));
const useStyles = makeStyles((theme) => ({
  root: {

    width: '100%',
    paddingTop: '5px',
    paddingLeft: '0px',
    paddingRight: '0px',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    display: 'flex',
    flexDirection: 'column',

    padding: theme.spacing(4),
    height: '600px'
  },
  backButton: {
    marginLeft: 23,
    marginBottom: 20
  },

  buttonSuccess: {
    backgroundColor: green[500],
    position: 'relative',
    '&:hover': {
      backgroundColor: green[700],
    },
    checkView: {
      display: 'flex',
      flexDirection: 'column',
      align: 'center'
    },
    cicleView: {
      display: 'flex',
      flexDirection: 'row',
      align: 'center'
    },

    pdtop: {
      paddingBottom: '10px'
    }

  }

}));

function getSteps() {
  return ['Publicar'];
}

function getStepContent(step, type) {

  switch (step) {
    case 0:
      return type == 'prop' ? <PropertyForm /> : <RequestForm />;

    default:
      return 'Unknown step';
  }
}

export default function Publish(props) {
  //redux const
  const loading = useSelector((state) => state.general.loading);
  const dispatch = useDispatch();
  const activeStep = useSelector((state) => state.general.activeStep);
  const setStep = (step) => dispatch(setStepAction(step));

  // Get dispatch


  //styles
  const classes = useStyles();
  //step counter
  const steps = getSteps();
  //form type (property,request)
  let { type } = useParams();


  return (
    <div className={classes.root}>

      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <div>{getStepContent(index, type)}</div>
              <div className={classes.actionsContainer}>
                <div>

                  <br />
                  <br />
  

                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>


      {activeStep === getSteps().length && (
        <Paper square elevation={0} className={classes.resetContainer}>

          {!loading && <div className={classes.pdtop} align='center'>
            <Fab
              align='center'
              aria-label="save"
              color="primary"
              className={classes.buttonSuccess}
            >
              <CheckIcon />
            </Fab>
          </div>
          }

          <br />
          <br />
          <br />

          <div align='center'>

            <Button variant="outlined" onClick={()=>setStep(0)} className={classes.button}>
              Crear otra publicación.
            </Button>


            <Link style={{ textDecoration: 'inherit', color: 'inherit' }} to={`/Home/MyPanel`}>
              <Button variant="outlined" className={classes.button}>
                Ver mis publicaciones.
              </Button>
            </Link>

          </div>

        </Paper>)
      }

    </div>

  );
}

