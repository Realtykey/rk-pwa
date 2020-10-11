import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ButtonBase } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        backdropFilter:'blur(9px)',
        margin: '0 auto',
        padding: '5px 5px',
        borderRadius: '100%',
        width: '200px',
        height: '200px',
        color: 'white',
        //content
        textAlign: 'center',
    },
    iconWrapper: {
        fontSize: '70px',
    }
}));

const icon = {
    width: '100px',
    height: '200px',
}

export default function MenuButton(props) {
    const classes = useStyles();
    const background = props.background;
    const color = props.color;
    const style = color ? {
        color: color,
        backgroundColor: background,
    } : { backgroundColor: background}


    return (
        <ButtonBase className={classes.root} style={style}>
            <div className={classes.iconWrapper}>
                <FontAwesomeIcon icon={props.icon} />
            </div>
        </ButtonBase>

    )
}
