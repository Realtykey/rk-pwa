import React,{useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

//redux imports
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux'
import { setReqAction, } from './request-reducer';
//custom comps
import RequestItem from './RequestItem';

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

export default function RequestList() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const requests = useSelector((state) => state.request.requests)
    const setReq = req => { dispatch(setReqAction(req)) }

    return (
        <div style={{
            height:'100vh',
            overflow:'scroll'
        }}>
        {requests.some(req => req.bookmarked) && <List className={classes.root}>
            <Typography style={{margin:'6px 0'}} color="textSecondary" variant="subtitle1" >Ver primero</Typography>
            {requests.map(
                req => {
                    return (
                        <RequestItem key={req.key} req={req} setReq={setReq} />
                    )
                }
            )
            }
        </List>
        }
        <List style={{marginTop:20}} className={classes.root}>
            {requests.filter(req => !req.bookmarked).map(
                req => {
                    return (
                        <RequestItem key={req.key} req={req} setReq={setReq} />
                );
                }
            )
            }
        </List>
        </div>
    );
}