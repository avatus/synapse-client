import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native-web'
import * as roomActions from '../actions/rooms/room.actions'
import * as authActions from '../actions/auth/auth.actions'
import MessageList from './MessageList'
import { GuardSpinner } from 'react-spinners-kit'
import UserInput from './UserInput'
import { withStyles } from '@material-ui/core/styles'
import useWindowSize from '../utils/useWindowSize'

const actions = {
    ...roomActions,
    ...authActions,
}

const Room = ({ room_name, getRoom, unsetRoom, match, history, classes }) => {
    const { id } = match.params
    const size = useWindowSize();
    useEffect(() => {
        let reg = /^[a-z0-9]+$/i
        if(!reg.test(id)){
            return history.replace('/')
        }
        if (id.length < 4 || id.length > 12) {
            return history.replace('/')
        }
        getRoom(id, true)
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
            <KeyboardAvoidingView>
                <div 
                    style={{height: size.height-65}}
                    className={classes.container}>
                    <UserInput />
                    <MessageList />
                </div>
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
    container: {
        display: 'flex',
        flexDirection: 'column-reverse',
    },
})

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        marginTop: "10%",
        alignItems: 'center'
    },
})

const mapStateToProps = state => {
    return { 
        user: state.auth.user,
        room_name: state.room.room_name
    }
}

export default connect(mapStateToProps, actions)(withStyles(muiStyles)(Room))