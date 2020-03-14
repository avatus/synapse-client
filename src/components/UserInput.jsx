import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import * as messageActions from '../actions/messages/message.actions'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment';
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import axios from 'axios'
import DialogContent from '@material-ui/core/DialogContent'
import Button from '@material-ui/core/Button'
import DialogActions from '@material-ui/core/DialogActions'
import Dropzone from 'react-dropzone'
import ImageIcon from '@material-ui/icons/AddCircle'
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
    const { 
        classes, 
        user, 
        sendMessage, 
        updateUserInput: setInput, 
        userInput: input, 
        current_room,
        focusInput,
        blurInput,
    } = props

    const inputRef = useRef(null)

    useEffect(() => {
        if (focusInput === true && inputRef) {
            inputRef.current.focus()
        }
    }, [focusInput])
    // const [input, setInput] = useState("")
    const [imagePreview, setImagePreview] = useState(null)
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState("")

    const handleImageUpload = () => {
        setUploading(true)
        axios.post(`${process.env.REACT_APP_ROOT_URL}/auth/user_image_upload`, {data: imagePreview.path})
        .then(response => {
            const formData = new FormData()
            formData.append("file", imagePreview);
            formData.append("public_id", response.data.public_id)
            formData.append("api_key", "752562424818857");
            formData.append("timestamp", response.data.timestamp);
            formData.append("signature", response.data.signature)
            let pragma = axios.defaults.headers.common['Pragma']
            delete axios.defaults.headers.common["Authorization"]
            delete axios.defaults.headers.common["X-ID-TOKEN"]
            delete axios.defaults.headers.common["Pragma"]
            axios.post(`https://api.cloudinary.com/v1_1/synaptics/image/upload`, formData)
            .then(clresponse => {
                axios.defaults.headers.common['X-ID-TOKEN'] = localStorage.getItem('id_token')
                axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
                axios.defaults.headers.common['Pragma'] = pragma
                let newMessage = {
                    id: uuid(),
                    user: user,
                    text: clresponse.data.secure_url,
                    type: "image",
                    delivered: false,
                    time: moment(),
                }
                setUploading(false)
                sendMessage(current_room, newMessage)
                setError("")
                setInput("")
                setImagePreview(null)
            })
            .catch(err => {
                console.log(err)
                setError("Image upload failed")
                axios.defaults.headers.common['X-ID-TOKEN'] = localStorage.getItem('id_token')
                axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
                axios.defaults.headers.common['Pragma'] = pragma
                setUploading(false)
            })
        })
        .catch(err => {
            setUploading(false)
            console.log(err)
        })
    }

    const previewDialog = () => {
        let image = imagePreview || {name: '', preview: ''}
        return (
            <Dialog
                classes={{
                    paper: classes.dialogPaper
                }}
                open={imagePreview !== null} 
                fullWidth
            >
                <DialogTitle>
                    <Typography style={{color: "#CCC"}}>{`Upload ${image.name}`}</Typography>
                </DialogTitle>
                <DialogContent style={{margin: "auto"}}>
                    <img 
                        style={{
                            width: "auto", 
                            maxWidth: "100%", 
                            height: "auto", 
                            maxHeight: "400px"}}
                        alt={image.name}
                        src={image.preview} />
                </DialogContent>
                <DialogActions>
                    <Button
                        disabled={uploading}
                        onClick={clearPreview}
                        color="primary"
                        classes={{
                            textPrimary: classes.cancelUpload
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        disabled={uploading}
                        onClick={handleImageUpload}
                        color="primary"
                        classes={{
                            textPrimary: classes.confirmUpload
                        }}
                    >
                            Upload
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }

    const clearPreview = () => {
        setImagePreview(null)
    }

    const submitMessage = () => {
        if (input.length < 1) {
            return setError('Please enter a message first.')
        }
        let newMessage = {
            id: uuid(),
            user: user,
            text: input,
            type: "text",
            delivered: false,
            time: moment(),
        }

        if (newMessage.text.length > 1000) {
            return setError(`Your message is over the limit by ${newMessage.text.length - 1000} characters.`)
        }
        sendMessage(current_room, newMessage)
        setError("")
        setInput("")
    }

    const handleChange = event => {
        setError("")
        setInput(event.target.value)
    }

    const handleImageDrop = files => {
        let file = files[0]
        file.preview = URL.createObjectURL(file)
        setImagePreview(file)
    }

    const handleBlur = () => {
        blurInput()
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
                inputRef={inputRef}
                onBlur={handleBlur}
                onFocus={scrollMessages}
                InputProps={{
                    disableUnderline: true,
                    className: classes.inputText,
                    startAdornment:
                    <Dropzone 
                        maxSize={10000000}
                        accept={['image/png', 'image/jpeg', 'image/gif']}
                        multiple={false}
                        onDrop={handleImageDrop}>
                        {({ getRootProps, getInputProps }) => (
                            <div style={{padding: "0.1rem",display: 'flex', alignItems: 'center', cursor: "pointer",}} {...getRootProps()}>
                                <ImageIcon style={{color: "#777" }} />
                                <input {...getInputProps()} />
                            </div>
                        )}
                    </Dropzone>,
                    endAdornment: <InputAdornment position="end">
                        <IconButton
                            onClick={submitMessage}
                            edge="end"
                            style={{ color: "#666" }}>
                            <SubdirectoryArrowLeftIcon />
                        </IconButton>
                    </InputAdornment>
                }}
                inputProps={{
                    style: {
                        marginLeft: "0.4rem",
                    }
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
            {previewDialog()}
        </div>
    )
}

const muiStyles = theme => ({
    userInput: {
        backgroundColor: "#333",
    },
    confirmUpload: {
        color: "#00B676"
    },
    cancelUpload: {
        color: "#ef5350"
    },
    inputText: {
        paddingRight: "0.5rem",
        color: "#DDDDDD"
    },
    uploadButton: {
        cursor: "pointer",
        backgroundColor: "#333",
    },
    dialogPaper: {
        minHeight: 200,
        maxHeight: "90vh",
    }
})

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        current_room: state.room.room_name,
        userInput: state.messages.userInput,
        focusInput: state.messages.focusInput,
    }
}

export default connect(mapStateToProps, actions)(withStyles(muiStyles)(UserInput))