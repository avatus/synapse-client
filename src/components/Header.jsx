import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
// import { css } from 'glamor'
import Toolbar from '@material-ui/core/Toolbar';
import Blockie from 'react-blockies'
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'
import { connect } from 'react-redux'
import GroupIcon from '@material-ui/icons/Group';
// import Blockie from 'react-blockies'
import { drawerWidth } from '../config/constants'


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    appbar: {
        backgroundColor: "#242424",
    },
    drawerOpen: {
        marginLeft: drawerWidth,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
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
    const { user, drawerOpen, room_users, current_room } = props
    const classes = useStyles()

    const userImage = `https://api.adorable.io/avatars/30/${user}`

    const roomStats = () => {
        return (
            <div className={classes.title}>
                <Grid
                    alignItems="center"
                    spacing={1}
                    container>
                    <Grid item style={{marginRight: "1rem"}}>
                        <Grid
                            spacing={1}
                            alignItems="center"
                            container>
                            <Grid item>
                                <Blockie scale={3} seed={current_room} />
                            </Grid>
                            <Grid item>
                                <Typography>
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
                                    style={{
                                        width: 30,
                                        height: 30,
                                    }}
                                    src={userImage}
                                    alt={user}
                                />
                                {/* <Blockie 
                                    scale={3}
                                    seed={user} /> */}
                            </Grid>
                        </Grid>
                    </div>
                </Toolbar>
            </AppBar>
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

export default connect(mapStateToProps)(Header)