import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import * as interfaceActions from '../actions/interface/interface.actions'
import * as authActions from '../actions/auth/auth.actions'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Blockie from 'react-blockies'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'
import { connect } from 'react-redux'
import GroupIcon from '@material-ui/icons/Group';
import { drawerWidth } from '../config/constants'
import useInterval from '@use-it/interval';
import socket from '../config/socket'


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    appbar: {
        overflow: "hidden",
        backgroundColor: "#242424",
    },
    drawerOpen: {
        overflow: "hidden",
        marginLeft: drawerWidth,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        overflow: "hidden",
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        marginLeft: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(7) + 1,
        },
    },
    title: {
        flexGrow: 1,
        color: "#aaa",
    },
}));

const Header = props => {
    const { user, drawerOpen, current_room, openIdTokenDialog, room_users, leaveRoom } = props
    const [anchorEl, setAnchorEl] = useState(null);
    const [roomAnchorEl, setRoomAnchorEl] = useState(null);
    const classes = useStyles()

    useEffect(() => {
        socket.emit('GET_ROOM_USER_COUNT', current_room)
    }, [current_room])

    useInterval(() => {
        if (current_room) {
            socket.emit('GET_ROOM_USER_COUNT', current_room)
        }
    }, current_room ? 30000 : null)

    const userImage = `https://api.adorable.io/avatars/30/${user}`

    const roomStats = () => {
        return (
            <div className={classes.title}>
                <Grid
                    alignItems="center"
                    spacing={1}
                    container>
                    <Grid item style={{ marginRight: "1rem" }}>
                        <Grid
                            spacing={1}
                            alignItems="center"
                            container>
                            <Grid item>
                                <Blockie scale={3} seed={current_room} />
                            </Grid>
                            <Grid item>
                                <Typography
                                    onClick={current_room ? handleRoomClick: null} 
                                >
                                    {current_room}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid
                            alignItems="center"
                            container>
                            <Grid item>
                                <GroupIcon style={{ color: "#69f0ae", height: 16, width: 16 }} />
                            </Grid>
                            <Grid item>
                                <Typography variant="caption">{room_users}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )
    }

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    }

    const handleRoomClick = event => {
        setRoomAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleRoomClose = () => {
        setRoomAnchorEl(null);
    };

    const handleLeaveRoom = () => {
        setRoomAnchorEl(null)
        leaveRoom(current_room)
    }

    return (
        <div className={classes.root}>
            <AppBar className={classes.appbar} position="absolute">
                <Toolbar
                    className={drawerOpen ? classes.drawerOpen : classes.drawerClose}
                    variant="dense">
                    {current_room ? roomStats() : <div className={classes.title} />}
                    <div>
                        <Grid container
                            alignItems="center"
                            spacing={1}
                        >
                            <Grid item>
                                <Typography
                                    style={{ color: "#666" }}
                                    variant="caption">{user.substring(user.length - 5)}</Typography>
                            </Grid>
                            <Grid item>
                                <Avatar
                                    onClick={handleClick}
                                    style={{
                                        width: 30,
                                        height: 30,
                                    }}
                                    src={userImage}
                                    alt={user}
                                />
                            </Grid>
                        </Grid>
                    </div>
                </Toolbar>
            </AppBar>
            <Menu
                id="auth-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => {
                    handleClose()
                    openIdTokenDialog()
                }}>ID Token</MenuItem>
            </Menu>
            <Menu
                id="room-menu"
                anchorEl={roomAnchorEl}
                keepMounted
                open={Boolean(roomAnchorEl)}
                onClose={handleRoomClose}
            >
                <MenuItem onClick={() => {
                    handleLeaveRoom()
                }}>Leave Synapse</MenuItem>
            </Menu>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        drawerOpen: state.interface.drawerOpen,
        current_room: state.room.room_name,
        room_users: state.room.users,
    }
}

const actions = {
    ...interfaceActions,
    ...authActions,
}

export default connect(mapStateToProps, actions)(Header)