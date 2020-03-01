import React, { useEffect } from 'react'
import * as roomActions from '../actions/rooms/room.actions'
import { connect } from 'react-redux'
import { Dimensions, View, StyleSheet, KeyboardAvoidingView, Text } from 'react-native-web'
import Grid from '@material-ui/core/Grid'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Blockie from 'react-blockies'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

const width = Dimensions.get('window').width
const vh = width > 520 ? 100 : 85

const Dashboard = props => {
    const { classes, setAllRooms, fetching_all_rooms, rooms } = props
    useEffect(() => {
        setAllRooms()
    }, [setAllRooms])

    // const renderRooms = () => {
    //     return (
    //         <Grid 
    //             className={classes.roomBox}
    //             spacing={1}
    //         >
    //             {mynewrooms.map(r => (
    //                 <Grid key={r} item >
    //                     <div>testing</div>
    //                 </Grid>
    //             ))}
    //         </Grid>
    //     )
    // }

    if (fetching_all_rooms) {
        return (
            <View style={styles.dashboardRoot}>
                <KeyboardAvoidingView style={styles.container}>
                    <View>
                        <Text style={styles.text}>Synapse Index</Text>
                    </View>
                </KeyboardAvoidingView>
            </View>
        )
    }
    return (
        <View style={styles.dashboardRoot}>
            <KeyboardAvoidingView style={styles.container}>
                <View style={styles.roomBox}>
                    <Text style={styles.text}>Synapse Index</Text>
                    <Grid 
                        wrap="wrap"
                        container 
                        spacing={1}>
                        {rooms.map(r => (
                            <Grid key={r._id} item xs={6} md={3}>
                                <ListItem
                                    button
                                    component={Link}
                                    to={`/synapse/${r.name}`}
                                    className={classes.roomView}
                                >
                                    <Grid 
                                        container 
                                        spacing={2} 
                                        alignItems="center">
                                            <Grid item>
                                                <Blockie seed={r.name} scale={3} />
                                            </Grid>
                                            <Grid item>
                                                <ListItemText>{r.name}</ListItemText>
                                            </Grid>
                                    </Grid>
                                </ListItem>
                            </Grid>
                        ))}
                    </Grid>
                    {/* {renderRooms()} */}
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

const muiStyles = theme => ({
    roomView: {
        borderLeft: "1px solid #00b676",
        backgroundColor: "#333",
        // padding: "0.5rem",
        marginBottom: 10,
    },
})

const styles = StyleSheet.create({
    roomBox: {
        overflowY: "auto",
        overflowX: "hidden",
        minHeight: `calc(${vh}vh - ${110}px)`,
        maxHeight: `calc(${vh}vh - ${110}px)`,
    },
    dashboardRoot: {
        marginTop: 48,
        minHeight: `${vh}vh`,
        padding: "0.5rem",
    },
    container: {
        // flexDirection: 'column',
    },
    text: {
        color: "gainsboro",
        marginBottom: "1rem"
    },
    // box: {
    //     overflowY: "overlay",
    //     minHeight: `calc(${vh}vh - ${58}px)`,
    //     maxHeight: `calc(${vh}vh - ${58}px)`,
    //     listStyleType: "none",
    //     display: 'flex',
    //     // flexDirection: "column-reverse",
    //     '&::-webkit-scrollbar': {
    //         width: '0.4em'
    //     },
    //     '&::-webkit-scrollbar-thumb': {
    //         backgroundColor: '#666',
    //         borderRadius: "5px"
    //     }
    // }
})

const mapStateToProps = state => {
    return { 
        user: state.auth.user,
        rooms: state.room.allRooms
    }
}

const actions = {
    ...roomActions,
}

export default connect(mapStateToProps, actions)(withStyles(muiStyles)(Dashboard))