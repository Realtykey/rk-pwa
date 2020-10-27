import React,{useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

//redux imports
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux'
import { setPropAction} from './../property-reducer';
//custom comps
import PropertyItem from './PropertyItem'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '90%',
        borderRadius: 25,
        padding: 9,
        border: '1px solid rgba(0, 0, 0, 0.12)',
        backgroundColor: theme.palette.background.paper,
    },
    chip: {
        marginTop: '10px',
        width: '100px',
        maxHeight: '30px',
        backgroundColor: props => props.bcolor,
        color: props => props.color,
        borderRadius: '25px',
        fontSize: '15px',
        //size
        lineHeight: '30px',
        textAlign: 'center',
    },
    inline: {
        display: 'inline',
    },
    listItem: {
        borderRadius: '25px',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '170px',
        minWidth: '36ch'
    },
    info: {
        display: 'flex',
        flexDirection: 'row'
    }

}));


export default function PropertiesList() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const properties = useSelector((state) => state.property.properties)
    const setProp = prop => { dispatch(setPropAction(prop)) }

    return (
        <div style={{
            height:'calc(100vh - 180px)',
            overflow:'scroll'
        }}>
            {properties.some(prop => prop.bookmarked) && <List className={classes.root}>
            <Typography style={{margin:'6px 0'}} color="textSecondary" variant="subtitle1" >Ver primero</Typography>
                {properties.filter(prop => prop.bookmarked).map(
                    prop => {
                        return (
                            <PropertyItem key={prop.key} prop={prop} setProp={setProp} />
                        );
                    }
                )
                }
            </List>
            }
            <Divider style={{ margin: '5px 20px' }} flexItem />
            <List style={{marginTop:20}} className={classes.root}>
               {properties.filter(prop => !prop.bookmarked).map(
                    (prop, index) => {
                        return (
                            <PropertyItem key={prop.key} prop={prop} setProp={setProp} index={index} />
                    );
                    }
                )
                }
            </List>
        </div>
    );
}