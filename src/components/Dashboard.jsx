import React, { useEffect, useState } from 'react'
import * as roomActions from '../actions/rooms/room.actions'
import * as interfaceActions from '../actions/interface/interface.actions'
import GroupIcon from '@material-ui/icons/Person';
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import RecentMessages from './RecentMessages'
import { connect } from 'react-redux'
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native-web'
import { GuardSpinner } from 'react-spinners-kit'
import SwipeableViews from 'react-swipeable-views';
import Typography from '@material-ui/core/Typography'
import Blockie from 'react-blockies'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import useInterval from '@use-it/interval'
    // let testingRooms = []
    // for (var i = 0; i < 300; i++) {
    //     testingRooms.push({
    //         name: Math.floor(Math.random()*100000).toString()
    //     })
    // }

const Dashboard = props => {
    let { classes, setAllRooms, fetching_rooms, rooms } = props
    const [tab, setTab] = useState(0)
    useEffect(() => {
        setAllRooms()
    }, [setAllRooms])

    useInterval(() => {
        setAllRooms()
    }, 300000)

    const renderRoom = r => {
        if (r) {
            return (
                <Link 
                    className={classes.roomWrapper}
                    style={{
                        color: "#DDD"
                    }}
                    key={r.name}
                    to={`/synapse/${r.name}`}>
                        <div style={{padding: "0.2rem"}}>
                            <div
                                className={classes.roomView}
                                >
                                <Blockie
                                    seed={r.name} scale={3} />
                                <Typography style={{ marginLeft: "0.5rem", fontSize: "0.8rem" }}>{r.name}</Typography>
                                <div style={{justifyContent: "flex-end", flex: 1, display: 'flex', alignItems: 'center'}}>
                                    <Typography variant="caption">{r.users}</Typography>
                                    <GroupIcon style={{ marginLeft: '0.1rem', color: "#69f0ae", height: 16, width: 16 }} />
                                </div>
                            </div>

                        </div>
                </Link>
            )
        }
    }

    if (fetching_rooms) {
        return (
            <View style={styles.dashboardRoot}>
                <KeyboardAvoidingView style={styles.container}>
                    <View style={styles.loading}>
                        <GuardSpinner />
                        <Typography
                            style={{ color: "#666"}}
                            variant="caption"
                            align="center">loading synapse index</Typography>
                    </View>
                </KeyboardAvoidingView>
            </View>
        )
    }


    const handleTabChange = (_, tab) => {
        setTab(tab)
    }

    const handleChangeIndex = index => {
        setTab(index);
    };

    return (
        <div className={classes.dashboardRoot}>
            <View style={styles.roomBox}>
                <Tabs
                    value={tab}
                    onChange={handleTabChange}
                    style={{marginBottom: "0.5rem"}}
                >
                    <Tab label="Synapse Index" />
                    <Tab label="Recent Messages" />
                </Tabs>
                <SwipeableViews
                    index={tab}
                    onChangeIndex={handleChangeIndex}
                >
                        <div className={classes.dashboardBox}>
                            <div className={classes.roomBox}>
                                {rooms.map(r => renderRoom(r))}
                            </div>
                        </div>

                        <div className={classes.dashboardBox}>
                            <div className={classes.recentContainer}>
                                <RecentMessages />
                            </div>
                        </div>

                </SwipeableViews>
            </View>
        </div>
    )
}

const muiStyles = theme => ({
        recentContainer: {
            display: 'flex',
            maxHeight: "100%",
            flexDirection: 'column-reverse',
        },
    roomWrapper: {
        // flex: 'none',
        width: "100%",
        [theme.breakpoints.up('md')]: {
            width: "50%",
        },
        [theme.breakpoints.up('lg')]: {
            width: "25%",
        },
    },
    roomView: {
        display: 'flex',
        padding: "0.5rem",
        alignItems: "center",
        borderLeft: "1px solid #00b676",
        backgroundColor: "#333",
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: "#3C3C3C"
        },
        transition: '0.2s'
    },
    dashboardRoot: {
        marginTop: 48,
        // minHeight: `${vh}vh`,
        padding: "0.5rem",
        maxHeight: "100%",
    },
    dashboardBox: {
        overflowY: "auto",
        height: "calc(100vh - 130px) !important",
        '&::-webkit-scrollbar': {
            display: 'none'
        },
        [theme.breakpoints.down('sm')]: {
            height: "calc(100vh - 15rem) !important",
        },

    },
    roomBox: {
        // width: "100%",
        // flex: 1,
        display: 'flex',
        alignContent: 'flex-start',
        flexWrap: 'wrap',
    }
})

const styles = StyleSheet.create({
    roomBox: {
        // overflowY: "auto",
        // overflowX: "hidden",
        minHeight: "100%",
        // minHeight: `calc(${vh}vh - ${110}px)`,
        // maxHeight: `calc(${vh}vh - ${110}px)`,
        // backgroundColor: "#666"
    },
    loading: {
        flex: 1,
        marginTop: "10%",
        alignItems: 'center'
    },
    container: {
        // flexDirection: 'column',
    },
    text: {
        color: "gainsboro",
        marginBottom: "1rem"
    },
})

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        fetching_rooms: state.auth.fetching_rooms,
        rooms: state.room.allRooms,
        totalUsers: state.room.totalUsers,
    }
}

const actions = {
    ...roomActions,
    ...interfaceActions,
}

export default connect(mapStateToProps, actions)(withStyles(muiStyles)(Dashboard))