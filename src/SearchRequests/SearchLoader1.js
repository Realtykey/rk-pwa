import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green, blue } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';
import SearchIcon from '@material-ui/icons/Search';
import '../App.css';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'absolute',
        top:8,
        left:13
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
    buttonSuccess: {
        backgroundColor: 'red',
        
    },
    fabProgress: {
        color:'white',
        color: blue[500],
        position: 'absolute',
        top: -5,
        left: -6,
        zIndex: 1,
    },

    buttonProgress: {
        backgroundColor: blue[500],
    },
}));




export default function SearchLoader({ loading }) {

    const classes = useStyles();
    const buttonClassname = clsx({
        [classes.buttonProgress]: loading,
        [classes.buttonSuccess]: !loading,

    }, 'icon');


    return (
        <div className={classes.root}>
            <Fab
                className={buttonClassname}
            >
            <SearchIcon style ={{color:'white'}} />
                
            </Fab>
            {loading && 
            <CircularProgress size={68} className={classes.fabProgress} 
                
            />
            }
        </div>

    )
}
