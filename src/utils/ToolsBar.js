import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

//redux imports

//fa icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import '../styles.css'
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        marginLeft: '20px',
        marginBottom: '25px',
        width: 'fit-content',
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.secondary,
        '& svg': {
            margin: theme.spacing(1.5),
        },
        '& hr': {
            margin: theme.spacing(0, 0.5),
        },
    },
    toolHint: {
        alignSelf: 'center',
        textAlign: 'center',
        paddingLeft: 4
    },
    tool: {
        borderRadius: 0,
        padding: '10px 8px',
        minWidth: 100
    }
}));
export const Tool = ({ label, icon, onClick }) => {
    const tool = {
        borderRadius: 0,
        padding: '10px 8px',
        minWidth: 100
    };

    return (
        <IconButton classes={{ label: 'custom-label' }} style={tool} aria-label={label} onClick={onClick}>
            <FontAwesomeIcon icon={icon} />
            <span style={{ fontSize: 14 }}>
                {label}
            </span>
        </IconButton>
    )
}

export default function ToolsBar({ tools }) {
    const classes = useStyles();

    return (
        <Grid container alignItems="center" className={classes.root}>
            {
                tools.map(
                    (tool, index) => {
                        var node = <div key={index}>
                            {tool}
                            <Divider style={{ margin: 0 }} orientation="vertical" flexItem />
                        </div>
                        if (index = 0 || tools.length - 1 == index) {
                            node = <div key={index}>{tool}</div>;
                        }

                        return node;
                    }
                )

            }
        </Grid>
    )
}
