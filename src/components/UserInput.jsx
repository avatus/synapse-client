import React, { useState } from 'react'
import { connect } from 'react-redux'
import * as messageActions from '../actions/messages/message.actions'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography'
import SubdirectoryArrowLeftIcon from '@material-ui/icons/SubdirectoryArrowLeft';
import moment from 'moment'
import TextField from '@material-ui/core/TextField'
import uuid from 'uuid/v4'
import { withStyles } from '@material-ui/core/styles'
import { animateScroll } from "react-scroll";

const scrollMessages = () => {
    animateScroll.scrollToBottom({
        duration: 0,
        containerId: "message-box"
    });
}


const actions = {
    ...messageActions
}

const UserInput = props => {
    const { classes, user, sendMessage, current_room } = props
    const [input, setInput] = useState("")
    const [error, setError] = useState("")

    const submitMessage = () => {
        if (input.length <1) {
            return setError('Please enter a message first.')
        }
        let newMessage = {
            id: uuid(),
            user: user,
            text: input,
            delivered: false,
            time: moment(),
        }

        if (newMessage.text.length > 1000) {
            return setError(`Your message is over the limit by ${newMessage.text.length-1000} characters.`)
        }
        sendMessage(current_room, newMessage)
        setError("")
        setInput("")
    }

    const handleChange = event => {
        setError("")
        setInput(event.target.value)
    }

    return (
        <div>
            {
                error !== "" &&
            <Typography 
                variant="caption" 
                style={{
                    color: "#ef5350",
                    marginLeft: "1rem"
                }}>{error}</Typography>
            }
            <TextField
                onFocus={scrollMessages}
                InputProps={{
                    disableUnderline: true,
                    className: classes.inputText,
                    startAdornment: <InputAdornment position="start">›</InputAdornment>,
                    endAdornment: <InputAdornment position="end">
                        <IconButton 
                            onClick={submitMessage}
                            edge="end"
                            style={{color: "#666"}}>
                            <SubdirectoryArrowLeftIcon />
                        </IconButton>
                    </InputAdornment>
                }}
                color="secondary"
                fullWidth
                placeholder="Enter a message..."
                className={classes.userInput}
                value={input}
                onKeyDown={event => {
                    if (event.keyCode === 13) {
                        submitMessage()
                    }
                }}
                onChange={handleChange}
            />
        </div>
    )
}

const muiStyles = theme => ({
    userInput: {
        backgroundColor: "#333",
    },
    inputText: {
        paddingLeft: "0.5rem",
        paddingRight: "0.5rem",
        color: "#DDDDDD"
    },
})

const mapStateToProps = state => {
    return { 
        user: state.auth.user,
        current_room: state.room.room_name
    }
}

export default connect(mapStateToProps, actions)(withStyles(muiStyles)(UserInput))