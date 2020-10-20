import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gridGap: theme.spacing(1),
    },
    paper: {
        color: theme.palette.text.secondary,
        whiteSpace: 'nowrap',
    },
}));

export default function StaticGrid({ children }) {
    const { container, paper } = useStyles();

    return (
        <div className={container}>
            {children}
        </div>
    )
}

export const StaticItem = ({children}) => {
    const { paper } = useStyles();

    return (
        <div style={{ gridColumnEnd: 'span 3' }}>
            {children}
        </div>
    )
}