import React from 'react';
import '../App.css'
import { makeStyles } from '@material-ui/core/styles';

//redux imports
import { useSelector } from 'react-redux'

import SearchLoader from './SearchLoader.js'

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
                    <input id="sinput" className="search-input" />
                </div>

                <div className="circle">
                        <SearchLoader loading = {loading} />
                </div>

            </div>
        </div>
    );
}