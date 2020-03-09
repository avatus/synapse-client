import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import Message from './Message'
import { Link } from 'react-router-dom'
import * as roomActions from '../actions/rooms/room.actions'
import Typography from '@material-ui/core/Typography'
import Blockie from 'react-blockies'
import { withStyles } from '@material-ui/core/styles'
import { animateScroll } from "react-scroll";

const scrollMessages = () => {
    animateScroll.scrollToBottom({
        duration: 0,
        containerId: "message-box"
    });
}

const RecentMessages = ({ messages, classes, getRecentMessages }) => {
    useEffect(() => {
        getRecentMessages()
        roomActions.recentMessageListener()
        return function cleanup() {
            roomActions.removeRecentMessageListener()
        }
    }, [getRecentMessages])

    useEffect(() => {
        scrollMessages()
    }, [messages])

    return (
        <div 
            id="message-box"
            className={classes.box}>
                {messages.map(m => (
                    <Link
                        style={{ color: "#DDD", width: "100%", backgroundColor: "#272727", marginBottom: "0.5rem", paddingTop: "0.5rem" }}
                        key={m.message.id}
                        to={`/synapse/${m.room}`}>
                    <div key={m.room} >
                        <div style={{
                            paddingLeft: "0.5rem",
                            display: 'flex',
                            width: "100%",
                            flex: 1,
                            alignItems: 'center',
                        }}>
                            <Blockie scale={2} seed={m.room} />
                            <Typography 
                                style={{ marginLeft: "0.5rem", color: "#999" }} 
                                variant="caption">{m.room}</Typography>
                        </div>
                        <div>
                            <Message key={m.message.id} compact={true} message={m.message} dashboard={true} />
                        </div>
                    </div>
                </Link>
                ))}
        </div>
    )
}

const mapStateToProps = state => {
    return { messages: state.room.recentMessages }
}

const styles = theme => ({
    box: {
        overflowY: "auto",
        overflowX: "hidden",
        display: 'flex',
        flexDirection: "column",
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

const actions = {
    ...roomActions,
}

export default connect(mapStateToProps, actions)(withStyles(styles)(RecentMessages))