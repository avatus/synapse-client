import React from 'react'
import { connect } from 'react-redux'
import List from '@material-ui/core/List'
import Message from './Message'
import { View, StyleSheet, Dimensions } from 'react-native-web'

const width = Dimensions.get('window').width
const vh = width > 520 ? 100 : 8

const MessageList = props => {
    const { messages } = props
    return (
        <View style={styles.box}>
            <List>
                {messages.map(message => <Message key={message.id} message={message} />)}
            </List>
        </View>
    )
}

const styles = StyleSheet.create({
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
    return { messages: state.room.history }
}

export default connect(mapStateToProps)(MessageList)