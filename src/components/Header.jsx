import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import * as interfaceActions from '../actions/interface/interface.actions'
import * as authActions from '../actions/auth/auth.actions'
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button'
import ChevronRight from '@material-ui/icons/ChevronRight'
import Toolbar from '@material-ui/core/Toolbar';
import Blockie from 'react-blockies'
import CopyToClipboard from 'react-copy-to-clipboard'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar'
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
    headerRoomName: {
        '&:hover': {
            cursor: 'pointer'
        }
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
    const { user, drawerOpen, current_room, openIdTokenDialog, room_users, leaveRoom, openJoinDialog } = props
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

    const handleCopyLink = () => {
        interfaceActions.showMessage("Copied to cliboard!") 
        setRoomAnchorEl(null)
    }

    return (
        <div className={classes.root}>
            <AppBar className={classes.appbar} position="absolute">
                <Toolbar
                    style={{ display: 'flex' }}
                    className={drawerOpen ? classes.drawerOpen : classes.drawerClose}
                    variant="dense">
                        {
                            !current_room && <div style={{flex: 1}}>
                                <Button
                                    onClick={openJoinDialog}
                                    style={{
                                        color: "#999",
                                    }}
                                    size="small"
                                    endIcon={<ChevronRight style={{color: "#ba68c8"}} />}
                                >Enter Synapse</Button>
                            </div>
                        }
                        {
                            current_room &&
                            <div 
                                style={{ 
                                        flex: 1, 
                                        display: 'flex', 
                                        alignItems: 'center' ,
                                }}>
                                    <div 
                                        className={classes.headerRoomName}
                                        onClick={current_room ? handleRoomClick : null}
                                        style={{display:'flex', alignItems: 'center'}}>
                                        <Blockie scale={3} seed={current_room} />
                                        <Typography
                                            style={{marginLeft: '0.5rem', color: "#999"}}
                                        >
                                            {current_room}
                                        </Typography>
                                        <GroupIcon style={{ marginLeft: '1rem', color: "#69f0ae", height: 16, width: 16 }} />
                                        <Typography variant="caption">{room_users}</Typography>
                                    </div>
                            </div>
                        }
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <Typography
                            style={{ color: "#666" }}
                            variant="caption">{user.substring(user.length - 5)}</Typography>
                        <Avatar
                            onClick={handleClick}
                            style={{
                                width: 30,
                                height: 30,
                                marginLeft: '0.5rem'
                            }}
                            src={userImage}
                            alt={user}
                        />
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
                <CopyToClipboard text={`${process.env.REACT_APP_LINK_ROOT}/synapse/${current_room}`}>
                    <MenuItem onClick={() => {
                        handleCopyLink()
                    }}>Copy Invite Link</MenuItem>
                </CopyToClipboard>
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