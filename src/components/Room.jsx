import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Dimensions, View, StyleSheet, KeyboardAvoidingView } from 'react-native-web'
import * as roomActions from '../actions/rooms/room.actions'
import * as authActions from '../actions/auth/auth.actions'
import MessageList from './MessageList'
import { GuardSpinner } from 'react-spinners-kit'
import UserInput from './UserInput'

const actions = {
    ...roomActions,
    ...authActions,
}

const width = Dimensions.get('window').width
const vh = width > 520 ? 100 : 85

const Room = ({ room_name, getRoom, unsetRoom, match }) => {
    const { id } = match.params
    useEffect(() => {
        getRoom(id)
        return function cleanup () {
            unsetRoom(id) 
        }

    }, [id, getRoom, unsetRoom])

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
        <View style={styles.dashboardRoot}>
            <KeyboardAvoidingView style={styles.container}>
                <View style={styles.box}>
                    <MessageList />
                </View>
                <UserInput />
            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    dashboardRoot: {
        minHeight: `${vh}vh`,
        padding: "0.5rem",
        flex: 1,
    },
    loading: {
        flex: 1,
        marginTop: "10%",
        alignItems: 'center'
    },
    container: {
        flexDirection: 'column',
        flex: 1,
    },
})

const mapStateToProps = state => {
    return { 
        user: state.auth.user,
        room_name: state.room.room_name
    }
}

export default connect(mapStateToProps, actions)(Room)