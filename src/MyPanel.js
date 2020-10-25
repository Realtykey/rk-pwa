import React, { useState } from 'react';
import PropertyView from './Property/PropertyView/PropertyView';
import RequestView from './Request/RequestView';

import { makeStyles, useTheme } from '@material-ui/core/styles';

//tab dependencies
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import SwipeableViews from 'react-swipeable-views';
import PropTypes from 'prop-types';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            <Box p={3}>
                {children}
            </Box>
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        display:'flex',
        flexDirection:'column',
        backgroundColor: theme.palette.background.default,
        paddingTop: 20,
    },
    tabs : {
        margin: '0 auto',
        padding :'0 2%',
        borderRadius:25,
        backgroundColor: theme.palette.background.paper,
        color : theme.palette.primary.contrastText
    }
}));

export default function MyPanel({location}) {
    const classes = useStyles();

    // results tabs managment
    const [actualTab, setActualTab] = useState(location.tab??0);
    const theme = useTheme();

    const handleTab = (event, newValue) => {
        setActualTab(newValue);
    };

    const handleChangeIndex = (index) => {
        setActualTab(index);

    };

    return (
        <div className={classes.root} >
                <Tabs className = {classes.tabs} centered value={actualTab} onChange={handleTab} aria-label="tabs de propiedades">
                    <Tab label="propiedades" {...a11yProps(0)} />
                    <Tab label="requerimientos" {...a11yProps(0)} />
                </Tabs>

                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={actualTab}
                    onChangeIndex={handleChangeIndex}
                >
                    <TabPanel value={actualTab} index={0} dir={theme.direction}>
                        <PropertyView />
                    </TabPanel>
                    <TabPanel value={actualTab} index={1} dir={theme.direction}>
                        <RequestView />
                    </TabPanel>

                </SwipeableViews>
        </div>
    )
}
