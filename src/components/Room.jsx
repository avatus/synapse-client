import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native-web'
import * as roomActions from '../actions/rooms/room.actions'
import * as authActions from '../actions/auth/auth.actions'
import MessageList from './MessageList'
import { GuardSpinner } from 'react-spinners-kit'
import UserInput from './UserInput'
import { withStyles } from '@material-ui/core/styles'

const actions = {
    ...roomActions,
    ...authActions,
}

// const width = Dimensions.get('window').width
// const vh = width > 520 ? 100 : 85

const Room = ({ room_name, getRoom, unsetRoom, match, history, classes }) => {
    const { id } = match.params
    useEffect(() => {
        
        let reg = /^[a-z0-9]+$/i
        if(!reg.test(id)){
            return history.replace('/')
        }
        getRoom(id)
        return function cleanup () {
            unsetRoom(id) 
        }

    }, [id, getRoom, unsetRoom, history])

    if (room_name === null) {
        return (
            <View style={styles.dashboardRoot}>
                <View style={styles.loading}>
                    <GuardSpinner />
                </View>
            </View>
        )
    }

    return (
        <div className={classes.dashboardRoot}>
            <KeyboardAvoidingView style={styles.container}>
                {/* <View style={styles.box}>
                </View> */}
                <UserInput />
                <MessageList />
            </KeyboardAvoidingView>
        </div>
    )
}

const muiStyles = theme => ({
    dashboardRoot: {
        marginTop: 48,
        padding: "0.5rem",
        maxHeight: "100%"
    },
})

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        marginTop: "10%",
        alignItems: 'center'
    },
    container: {
        // position: 'absolute',
        // bottom: '0',
        flexDirection: 'column-reverse',
    },
})

const mapStateToProps = state => {
    return { 
        user: state.auth.user,
        room_name: state.room.room_name
    }
}

export default connect(mapStateToProps, actions)(withStyles(muiStyles)(Room))