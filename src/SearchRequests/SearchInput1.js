import React from 'react';
import '../App.css'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import FilterListIcon from '@material-ui/icons/FilterList';
import { Button, TextField } from '@material-ui/core';

//redux imports
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from 'react-redux'

import SwapVertIcon from '@material-ui/icons/SwapVert';

import SearchLoader from './SearchLoader1.js'

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    controllers: {
        display: 'flex',
        flexDirection: 'row',
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    filterButton: {
        marginLeft: theme.spacing(1),
        color: 'white',
        padding: 10,
        backgroundColor: 'rgb(0	201	103	)',
    },
    sortingButton: {
        marginRight: theme.spacing(1),
        color: 'white',
        padding: 10,
        backgroundColor: 'rgb(59	83	154	)',
    },
    divider: {
        height: 28,
        margin: 4,
    },
}));

export default function SearchInput() {
    const classes = useStyles();
    //redux const
    const loading = useSelector((state) => state.general.loading);


    return (
        <div className={classes.root}>

            <div className="control">
                <div className="search-control">
                    <input className="search-input" />
                </div>

                <div className="circle">
                        <SearchLoader loading = {loading} />
                </div>

            </div>
        </div>
    );
}