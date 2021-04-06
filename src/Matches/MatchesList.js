import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

//redux imports
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from 'react-redux'
import { setMatchAction, } from '../redux';
//custom comps
import { AuthContext } from "../Auth";
import MatchItem from './MatchItem';

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
        display: 'flex',
        flexDirection: 'column',
        minHeight: '170px',
    },
    info: {
        display: 'flex',
        flexDirection: 'row'
    }

}));



export default function MatchesList() {
    const classes = useStyles();
    const { currentUser } = useContext(AuthContext);
    const matches = useSelector((state) => state.general.matches)
    const dispatch = useDispatch();
    const setMatch = (match, index) => { dispatch(setMatchAction(match, index)) }

    return (
        <div className="hidden-scroll" style={{
            height:'100vh',
            overflow:'scroll',
        }}>
        {matches.some(match => match.bookmarked) && <List className={classes.root}>
            <Typography style={{margin:'6px 0'}} color="textSecondary" variant="subtitle1" >Ver primero</Typography>
            {matches.filter(req => req.bookmarked).map(
                (match,index) => {
                    return (
                        <MatchItem key={match.key} currentUser={currentUser} match={match} setMatch={setMatch} index={index} />

                    )
                }
            )
            }
        </List>
        }

        <List className={classes.root}>
            {matches.filter(req => !req.bookmarked).map(
                (match,index) => {
                    return (
                        <MatchItem key={match.key} currentUser={currentUser} match={match} setMatch={setMatch} index={index} />

                    )
                }
            )
            }
        </List>
        
        </div>
   );
}