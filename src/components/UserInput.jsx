import React, { useState } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet } from 'react-native-web'
import * as messageActions from '../actions/messages/message.actions'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment';
import SubdirectoryArrowLeftIcon from '@material-ui/icons/SubdirectoryArrowLeft';
import moment from 'moment'
import TextField from '@material-ui/core/TextField'
import uuid from 'uuid/v4'
import { withStyles } from '@material-ui/core/styles'

const actions = {
    ...messageActions
}

const UserInput = props => {
    const { classes, user, sendMessage } = props
    const [input, setInput] = useState("")

    const submitMessage = () => {
        if (input.length < 1) {
            return alert('Please enter a real message, fucker')
        }
        let newMessage = {
            id: uuid(),
            user: user,
            text: input,
            time: moment(),
        }
        sendMessage(newMessage)
        setInput("")
    }

    return (
        <View style={styles.root}>
                <div></div>
                <TextField
                    InputProps={{
                        disableUnderline: true,
                        className: classes.inputText,
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
                    placeholder="›"
                    className={classes.userInput}
                    value={input}
                    onKeyDown={event => {
                        if (event.keyCode === 13) {
                            submitMessage()
                        }
                    }}
                    onChange={(event) => setInput(event.target.value)}
                />
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        width: "100%",
        position: 'absolute',
        bottom: 0
    },
})

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
    return { user: state.auth.user }
}

export default connect(mapStateToProps, actions)(withStyles(muiStyles)(UserInput))