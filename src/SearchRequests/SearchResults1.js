import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
// custom comps
import RequestCard from '../Request/RequestCard';



const useStyles = makeStyles((theme) => ({
    //resultados
    results: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: window.screen.height,
        paddingTop: '50px',
    },
    main: {
        width: '100%',
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(10),
        paddingBottom: theme.spacing(8),
    },
    resultsCounter: {
        textAlign: 'center',
        color: 'gray'
    }

}));



export default function SearchResults({ properties }) {
    const classes = useStyles();
    return (
        <div className={classes.results}>
            <div className={classes.resultsCounter}>{properties.length} resultados</div>
            <div spacing={8} className={classes.main} >

                {properties.map((prop) => (

                    <Grid container justify="center" item key={prop.id} xs={12} sm={12}>

                        <RequestCard align="center" private={false} doc={prop}/>

                    </Grid>

                ))}
            </div>
        </div>
    )
}
