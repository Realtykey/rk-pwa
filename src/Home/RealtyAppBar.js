import React, { useEffect, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles';
//mui
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import HouseIcon from '@material-ui/icons/House';
import ListAltIcon from '@material-ui/icons/ListAlt';

//actions
import IconButton from '@material-ui/core/IconButton';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import clsx from 'clsx';


//admin
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

//auth2
import { AuthContext } from "../Auth.js";

//redux im,ports
import { useSelector } from 'react-redux'


/*ENRUTAMIENTO*/
import {
    Link,
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#390080',
        backgroundImage: 'linear-gradient(102deg, #390080 9%, #6751ef 100%)',
        boxShadow: 'none'
    },
    title: { flexGrow: 1 },
    link: {
        ...theme.typography.button,
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(1),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
}));

export default function RealtyAppBar(props) {
    const classes = useStyles();
    const { currentUser } = useContext(AuthContext);

    //handle dropdown menu button (user profile)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const userData = useSelector(state => state.general.userData);
    const notifications = useSelector(state => state.general.notifications)

    const handleMenu = (event) => {
        setOpen(true)
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setOpen(false);
    };
    useEffect(
        () => {
            console.log(userData)
        },
        [userData]
    )

    const signOut = () => {
        //cierra dropdown del avatar
        handleClose();

        import('./../base')
            .then(async ({ app }) => {
                app.auth()
                    .signOut()
                    .catch(function (error) {
                        // Handle Errors here.

                        // ...

                        console.log('error: ' + error)
                    });
            })
            .catch(err => {
                // Handle failure
            });
    }

    return (
        <AppBar
            className={classes.root}
            position="fixed"
        >
            <Toolbar>
                <Link style={{ textDecoration: 'inherit', color: 'inherit' }} to={`${props.match.path}/Dashboard1`}>
                    <IconButton
                        color="inherit"
                        aria-label="open dashboard"
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <DragIndicatorIcon />
                    </IconButton>
                </Link>

                <Typography className={classes.title} variant="h6" noWrap>
                </Typography>

                <Link style={{ textDecoration: 'inherit', color: 'inherit' }} to={`${props.match.path}/Publish/prop`}>
                    <IconButton color="inherit">
                        <HouseIcon />
                    </IconButton>
                </Link>

                <Link style={{ textDecoration: 'inherit', color: 'inherit' }} to={`${props.match.path}/Publish/req`}>
                    <IconButton color="inherit">
                        <ListAltIcon />
                    </IconButton>
                </Link>


                <Link style={{ textDecoration: 'inherit', color: 'inherit' }} to={`${props.match.path}/MatchView`}>
                    <IconButton color="inherit">
                        <Badge badgeContent={notifications} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                </Link>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                >

                    <Avatar alt="N" src={userData ? userData.photoUrl : ""} className={classes.large} />

                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    keepMounted
                    open={open}
                    onClose={handleClose}
                >
                    <Link style={{ textDecoration: 'inherit', color: 'inherit' }} to={`/Home/AgentForm`}>
                        <MenuItem>
                            Mi Perfil
                  </MenuItem>
                    </Link>

                    <MenuItem onClick={signOut}>Cerrar sesión</MenuItem>
                </Menu>


            </Toolbar>

        </AppBar>
    )
}
