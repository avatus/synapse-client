import React from 'react'
import clsx from 'clsx'
import Drawer from '@material-ui/core/Drawer'
import Blockies from 'react-blockies'
import List from '@material-ui/core/List'
import Badge from '@material-ui/core/Badge'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton';
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import RandomBlockie from './RandomRoomIcon'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { drawerWidth } from '../config/constants'

import * as interfaceActions from '../actions/interface/interface.actions'

const actions = {
    ...interfaceActions,
}

const Menu = props => {
    const { classes, drawerOpen: open, openMenu, closeMenu } = props
    return (
        <Drawer
        className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
        })}
        classes={{
            paper: clsx({
                [classes.drawerPaper]: true,
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
            }),
        }}
        variant="permanent"
        open={true}>
        <div
            style={{
                width: drawerWidth,
                backgroundColor: "#222",
                height: "100%",
            }}
        >
            <div
                style={{
                    width: open ? drawerWidth : 65,
                    transition: '0.2s'
                }}
                className={classes.menuTopDiv}
            >
                <IconButton
                    onClick={open ? closeMenu : openMenu}
                    edge="start"
                    className={classes.chevron} 
                    color="inherit"
                    aria-label="menu">
                    { open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </div>
            <div style={{ color: "gainsboro" }}>
                <div>
                    <List >
                        <ListItem 
                            style={{
                                color: "#aaa"
                            }}
                            button
                            dense 
                            key={1}>
                            <ListItemIcon>
                                <Badge 
                                    color="primary"
                                    classes={{
                                        badge: classes.badgeDefault,
                                        colorPrimary: classes.badgeColor
                                    }}
                                    badgeContent={3}>
                                    <Blockies seed={"098asdf098"} scale={3} />
                                </Badge>
                            </ListItemIcon>
                            <ListItemText>Room 1</ListItemText>
                        </ListItem>
                        <ListItem 
                            style={{
                                color: "#aaa"
                            }}
                            button
                            dense 
                            key={3}>
                            <ListItemIcon>
                                <Blockies seed={"asdfasdf09"} scale={3} />
                            </ListItemIcon>
                            <ListItemText>Room 2</ListItemText>
                        </ListItem>
                        <ListItem 
                            style={{
                                color: "#aaa"
                            }}
                            dense
                            button
                            key={4}>
                            <ListItemIcon>
                                <AddBoxRoundedIcon style={{color: "#777"}} />
                            </ListItemIcon>
                            <ListItemText>Join Room</ListItemText>
                        </ListItem>
                        <ListItem 
                            style={{
                                color: "#aaa"
                            }}
                            dense
                            button
                            key={2}>
                            <ListItemIcon>
                                <RandomBlockie />
                            </ListItemIcon>
                            <ListItemText>Random Room</ListItemText>
                        </ListItem>
                    </List>
                </div>
            </div>
        </div>
    </Drawer>
    )
}

const mapStateToProps = state => {
    return { drawerOpen: state.interface.drawerOpen }
}

const styles = theme => ({
    badgeDefault: {
        border: "1px solid #222",
    },
    chevron: {
        color: "#666",
        '&:hover': {
            color: '#00e676'
        },
        transition: '0.2s'
    },
    menuTopDiv: {
        display: 'flex',
        justifyContent: "center",
        height: 48,
        transition: '0.2s'
    },
    badgeColor: {
        backgroundColor: "#444",
        color: "#29b6f6",
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerPaper: {
        overflowX: 'hidden',
        backgroundColor: "#222 !important",
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(8) + 1,
        },
    },
})

export default connect(mapStateToProps, actions)(withStyles(styles)(Menu))