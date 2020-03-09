import React from 'react'
import { connect } from 'react-redux'
import Message from './Message'
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import Blockie from 'react-blockies'

const RecentMessages = ({ messages }) => {
    let messageData = {}
    messages.forEach(m => {
        if (messageData[m.room]) {
            let array = messageData[m.room]
            array.push(m)
            messageData[m.room] = array
        }
        else {
            messageData[m.room] = [m]
        }
    })
    let keys = Object.keys(messageData)
    return (
        <div style={{display: 'flex', flexDirection: 'column-reverse'}}>
            {keys.map(k => (
                <Link
                    style={{ color: "#DDD", width: "100%", backgroundColor: "#272727", marginBottom: "0.5rem", paddingTop: "0.5rem" }}
                    key={k}
                    to={`/synapse/${k}`}>
                <div key={k} >
                    <div style={{
                        paddingLeft: "0.5rem",
                        display: 'flex',
                        width: "100%",
                        flex: 1,
                        alignItems: 'center',
                    }}>
                        <Blockie scale={2} seed={k} />
                        <Typography style={{ marginLeft: "0.5rem", color: "#999" }} variant="caption">{k}</Typography>
                    </div>
                    <div>
                        {messageData[k].map(m => (
                                <Message key={m.message.id} compact={true} message={m.message} />
                        ))}
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

export default connect(mapStateToProps)(RecentMessages)