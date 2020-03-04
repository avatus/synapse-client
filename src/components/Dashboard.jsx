import React, { useEffect } from 'react'
import * as roomActions from '../actions/rooms/room.actions'
import GroupIcon from '@material-ui/icons/Person';
import RoomIcon from '@material-ui/icons/SettingsEthernet';
import { connect } from 'react-redux'
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native-web'
// import Grid from '@material-ui/core/Grid'
import { VirtuosoGrid } from 'react-virtuoso'
import { GuardSpinner } from 'react-spinners-kit'
import Typography from '@material-ui/core/Typography'
import styled from '@emotion/styled'
// import ListItem from '@material-ui/core/ListItem'
// import ListItemText from '@material-ui/core/ListItemText'
import Blockie from 'react-blockies'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import useInterval from '@use-it/interval'
// import randomString from 'randomstring'

// const width = Dimensions.get('window').width
// const vh = width > 520 ? 100 : 85

const ItemContainer = styled.div`
  width: 25%;
  display: flex;
  flex: none;
  align-content: stretch;

  @media (max-width: 1024px) {
    width: 25%;
  }

  @media (max-width: 768px) {
    width: 50%;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`

const ItemWrapper = styled.div`
    flex: 1;
  }
`

const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Dashboard = props => {
    let { classes, setAllRooms, fetching_rooms, rooms, totalUsers } = props
    useEffect(() => {
        setAllRooms()
    }, [setAllRooms])

    useInterval(() => {
        setAllRooms()
    }, 30000)

    const renderRoom = r => {
        if (r) {
            return (
                <Link 
                    to={`/synapse/${r.name}`}>
                    <div
                        className={classes.roomView}>
                        <Blockie
                            seed={r.name} scale={3} />
                        <Typography style={{ marginLeft: "0.5rem" }}>{r.name}</Typography>
                        <div style={{justifyContent: "flex-end", flex: 1, display: 'flex', alignItems: 'center'}}>
                            <Typography variant="caption">{r.users}</Typography>
                            <GroupIcon style={{ marginLeft: '0.1rem', color: "#69f0ae", height: 16, width: 16 }} />
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


    // rooms = []
    // for (var i = 0; i < 300; i++) {
    //     rooms.push({
    //         name: Math.floor(Math.random()*100000).toString()
    //     })
    // }

    return (
        <div className={classes.dashboardRoot}>
            <View style={styles.roomBox}>
                <div style={{
                    display: 'flex', 
                    paddingLeft: "0.5rem",
                    paddingRight: "0.5rem",
                    justifyContent: "space-between",
                    alignItems: 'flex-end'}}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <Typography style={{marginRight: "2rem"}}>Synapse Index</Typography>
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
                <VirtuosoGrid
                    totalCount={rooms.length}
                    overscan={40}
                    ItemContainer={ItemContainer}
                    ListContainer={ListContainer}
                    item={index => <ItemWrapper style={{ padding: "0.5rem" }}>{renderRoom(rooms[index])}</ItemWrapper>}
                    className={classes.roomBox}
                    style={{height: 200}}
                />
            </View>
        </div>
    )
}

const muiStyles = theme => ({
    roomView: {
        display: 'flex',
        padding: "0.5rem",
        borderLeft: "1px solid #00b676",
        backgroundColor: "#333",
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: "#373737"
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
}

export default connect(mapStateToProps, actions)(withStyles(muiStyles)(Dashboard))