import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import CircularProgress from '@material-ui/core/CircularProgress';
import { blue } from '@material-ui/core/colors';
import Fab from '@material-ui/core/Fab';
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
        backgroundColor: '#390080',
        
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
                color = "secondary"
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
