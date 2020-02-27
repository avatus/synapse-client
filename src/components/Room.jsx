import React from 'react'
import { connect } from 'react-redux'
import { Dimensions, View, StyleSheet, KeyboardAvoidingView } from 'react-native-web'
import MessageList from './MessageList'
import UserInput from './UserInput'

const width = Dimensions.get('window').width
const vh = width > 520 ? 100 : 85

const Room = props => {
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
    container: {
        flexDirection: 'column',
        flex: 1,
    },
    box: {
        overflowY: "overlay",
        minHeight: `calc(${vh}vh - ${58}px)`,
        maxHeight: `calc(${vh}vh - ${58}px)`,
        listStyleType: "none",
        display: 'flex',
        flexDirection: "column-reverse",
        '&::-webkit-scrollbar': {
            width: '0.4em'
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#666',
            borderRadius: "5px"
        }
    }
})

const mapStateToProps = state => {
    return { user: state.auth.user }
}

export default connect(mapStateToProps)(Room)