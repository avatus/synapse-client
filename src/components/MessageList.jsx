import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import List from '@material-ui/core/List'
import Message from './Message'
import { withStyles } from '@material-ui/core/styles'
import { animateScroll } from "react-scroll";

const scrollMessages = () => {
    animateScroll.scrollToBottom({
        duration: 0,
        containerId: "message-box"
    });
}

const MessageList = props => {
    const { messages, classes } = props
    useEffect(() => {
        scrollMessages()
    }, [messages])
    return (
        <div id="message-box" className={classes.box}>
            <List>
                {messages.map(message => <Message key={message.id} message={message} />)}
            </List>
        </div>
    )
}

const styles = theme => ({
    box: {
        overflowY: "auto",
        minHeight: `calc(100vh - 100px)`,
        maxHeight: `calc(100vh - 100px)`,
        display: 'flex',
        flexDirection: "column-reverse",
        listStyleType: "none",
        '&::-webkit-scrollbar': {
            width: '0.4em'
        },
        '&::-webkit-scrollbar-thumb': {
            borderRadius: 2,
            backgroundColor: '#444',
            outline: '1px solid slategrey'
        }
    }
})

const mapStateToProps = state => {
    return { messages: state.room.history }
}

export default connect(mapStateToProps)(withStyles(styles)(MessageList))