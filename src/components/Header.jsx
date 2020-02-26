import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid'
import { connect } from 'react-redux'
import Blockie from 'react-blockies'
import IconButton from '@material-ui/core/IconButton';
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    chevron: {
        color: "#666",
        '&:hover': {
            color: '#00e676'
         },
         transition: '0.2s'
    },
    appbar: {
        backgroundColor: "#242424",
    },
    toolbar: {

    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const Header = props => {
    const { user } = props
    const [showId, setShowId] = useState(false)
    const classes = useStyles()

    const mouseEnter = () => {
        setShowId(true)
    }

    const mouseLeave = () => {
        setShowId(false)
    }

    return (
        <div className={classes.root}>
            <AppBar className={classes.appbar} position="absolute">
                <Toolbar variant="dense">
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <ChevronRightIcon className={classes.chevron} />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                    
                    </Typography>
                    <div>
                        <Grid container
                            alignItems="center"
                            spacing={1}
                            onMouseEnter={mouseEnter}
                            onMouseLeave={mouseLeave}
                        >
                            <Fade 
                                in={showId}>
                                <Grid item>
                                    <Typography 
                                        style={{color: "#666"}}
                                        variant="caption">{user.substring(user.length - 5)}</Typography>
                                </Grid>
                            </Fade>
                            <Grid item>
                                <Blockie 
                                    scale={3}
                                    seed={user} />
                            </Grid>
                        </Grid>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}

const mapStateToProps = state => {
    return { user: state.auth.user }
}

export default connect(mapStateToProps)(Header)