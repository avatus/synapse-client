import React from 'react'
import { connect } from 'react-redux'
import List from '@material-ui/core/List'
import Message from './Message'

const MessageList = props => {
    const { messages } = props
    return (
        <List>
            {messages.map(message => <Message key={message.id} message={message} />)}
        </List>
    )
}

const mapStateToProps = state => {
    return { messages: state.room.history }
}

export default connect(mapStateToProps)(MessageList)