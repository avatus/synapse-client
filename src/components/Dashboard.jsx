import React, { useEffect } from 'react'
import * as roomActions from '../actions/rooms/room.actions'
import * as interfaceActions from '../actions/interface/interface.actions'
import GroupIcon from '@material-ui/icons/Person';
import RoomIcon from '@material-ui/icons/SettingsEthernet';
import { connect } from 'react-redux'
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native-web'
import { GuardSpinner } from 'react-spinners-kit'
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
    let { classes, setAllRooms, fetching_rooms, rooms, totalUsers } = props
    useEffect(() => {
        setAllRooms()
        console.log('running set rooms')
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



    return (
        <div className={classes.dashboardRoot}>
            <View style={styles.roomBox}>
                <div style={{
                    display: 'flex', 
                    paddingLeft: "0.5rem",
                    paddingRight: "0.5rem",
                    justifyContent: "space-between",
                    alignItems: 'flex-start'}}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <div>
                        <Typography>Synapse Index</Typography>
                        </div>
                    </div>
                    <div>
                        <div style={{display: 'flex', justifyContent:'flex-end', alignItems: 'center', alignContent: 'center'}}>
                            <Typography style={{color: "#999"}}>{`online: ${totalUsers}`}</Typography>
                            <GroupIcon style={{ marginLeft: '0.1rem', color: "#69f0ae", height: 16, width: 16 }} />
                        </div>
                        <div style={{display: 'flex', justifyContent:'flex-end', alignItems: 'center', alignContent: 'center'}}>
                            <Typography style={{color: "#999"}}>{`synapses: ${rooms.length}`}</Typography>
                            <RoomIcon style={{ marginLeft: '0.1rem', color: "#2196f3", height: 16, width: 16 }} />
                        </div>
                    </div>
                </div>
                <div className={classes.roomBox}>
                    {rooms.map(r => renderRoom(r))}
                </div>
            </View>
        </div>
    )
}

const muiStyles = theme => ({
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
    roomBox: {
        // width: "100%",
        // flex: 1,
        display: 'flex',
        alignContent: 'flex-start',
        flexWrap: 'wrap',
        overflowY: "auto",
        height: "calc(100vh - 120px) !important",
        '&::-webkit-scrollbar': {
            display: 'none'
        },
        [theme.breakpoints.down('sm')]: {
            height: "calc(100vh - 15rem) !important",
        },
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
        rooms: state.room.allRooms,
        fetching_rooms: state.auth.fetching_rooms,
        totalUsers: state.room.totalUsers,
    }
}

const actions = {
    ...roomActions,
    ...interfaceActions,
}

export default connect(mapStateToProps, actions)(withStyles(muiStyles)(Dashboard))