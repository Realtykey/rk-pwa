import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '20px 20px 0 20px',
        overflow: 'scroll',
        whiteSpace: 'nowrap',
        paddingTop: 100,
        paddingBottom: 30,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.primary.contrastText
    }
}));


export default function FormLayout({ children }) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            {children}
        </div>
    )
}
