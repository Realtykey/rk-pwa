import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

//redux imports
import { useSelector } from 'react-redux'

//custom comps 
import Divider from '@material-ui/core/Divider';
import PropertyBar from './PropertyBar.js'
import Carousel from './Carousel'
import PropertyDetails from './../PropertyCard/PropertyDetails'

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.primary.contrastText,
        borderRadius : 20,
        padding:9
    },
    det : {
        minWidth:'100%'
    },
    margin: {
        margin: theme.spacing(1)
    },
    
}));

const map = { width: '100%',borderRadius:20 }

export default function PropertyDet() {
    const classes = useStyles();

    const selectedProperty = useSelector(state => state.property.selectedProperty);
    
    useEffect(
        ()=>{},
        [selectedProperty]
    );

    return (
        <Grid className={classes.root}>

                {selectedProperty.map && <Grid item sm ={12} md ={12} xs ={12}>

                    <PropertyBar/>

                    <Carousel photos = {selectedProperty.photos}/>

                    <Divider className={classes.margin} />

                    <PropertyDetails propData={selectedProperty}></PropertyDetails>

                    <div>
                        <img style={map} src={selectedProperty.map.snapUrl}>
                        </img>
                    </div>

                </Grid>
                }
        </Grid>
    );
}
