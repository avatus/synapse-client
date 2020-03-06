import React, { useState } from 'react'
import * as interfaceActions from '../actions/interface/interface.actions'
import { connect } from 'react-redux'
import axios from 'axios'
import Paper from '@material-ui/core/Paper'
import { history } from '../App'
import Dialog from '@material-ui/core/Dialog'
import InputBase from '@material-ui/core/InputBase'
import Button from '@material-ui/core/Button'
import randomstring from 'randomstring'
import IconButton from '@material-ui/core/IconButton'
import Blockie from 'react-blockies'
import Divider from '@material-ui/core/Divider'
import RandomBlockie from './RandomRoomIcon'
import ChevronRight from '@material-ui/icons/ChevronRight'
import Typography from '@material-ui/core/Typography'
// import DialogContentText from '@material-ui/core/DialogContentText'
import DialogContent from '@material-ui/core/DialogContent'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import Slide from '@material-ui/core/Slide'

const actions = {
    ...interfaceActions,
}

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const randomName = randomstring.generate()


const JoinRoomDialog = ({ classes, joinDialogOpen, closeJoinDialog }) => {
    const open = Boolean(joinDialogOpen)
    const [roomName, setRoomName] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const handleChange = event => {
        let goodRoomName = event.target.value.replace(/[^a-z0-9]/gi,'');
        setRoomName(goodRoomName)
    }

    const joinRandomRoom = () => {
        axios.get(`${process.env.REACT_APP_ROOT_URL}/sockets/get_random_room`)
        .then(response => {
            closeJoinDialog()
            history.push(`/synapse/${response.data.room}`)
        })
        .catch(err => {
            setErrorMessage("Random synapse failed.")
            console.log(err)
        })
    }

    const joinRoom = () => {
        setRoomName("")
        closeJoinDialog()
        history.push(`/synapse/${roomName}`)
    }

    const renderRandomForm = () => {
        return (
            <div className={classes.dialogOption}>
                <Typography 
                    variant="h6" 
                    style={{ color: "#AAA"}}>Random</Typography>
                <Typography 
                    style={{ color: "#AAA"}}
                    variant="caption" 
                    paragraph>Enter a random synapse</Typography>
                <Grid container alignItems="center" spacing={1}>
                    <Grid item>
                        <RandomBlockie />
                    </Grid>
                    <Grid item>
                        <Button
                            onClick={joinRandomRoom}
                            variant="contained"
                            className={classes.randomButton}
                            endIcon={<ChevronRight />}  
                        >Join</Button>
                    </Grid>
                    <Grid item>
                        <Typography style={{color: "#f44336"}}>{errorMessage}</Typography>
                    </Grid>
                </Grid>
            </div>
        )
    }

    const renderJoinForm = () => {
        return (
            <div className={classes.dialogOption}>
                <Typography 
                    variant="h6" 
                    style={{ color: "#AAA",}}>Enter Synapse Name</Typography>
                <Typography 
                    style={{ color: "#AAA"}}
                    variant="caption" 
                    paragraph>Synapse names are case-sensitive. Spaces will be removed. If you enter a name that does not exist, a new synapse will be created for you.</Typography>
                <Grid container alignItems="center" spacing={1}>
                    <Grid item>
                        <Blockie seed={roomName ? roomName : randomName} scale={4} />
                    </Grid>
                    <Grid item xs>
                        <Paper
                            className={classes.root}>
                            <InputBase
                                inputProps={{
                                    maxLength: 12
                                }}
                                value={roomName}
                                onChange={handleChange}
                                fullWidth
                                className={classes.input}
                                placeholder="Enter Synapse Name"
                            />
                            <Divider className={classes.divider} orientation="vertical" />
                            <IconButton
                                disabled={roomName.length < 4}
                                onClick={joinRoom}
                                className={classes.iconButton} >
                                <ChevronRight />
                            </IconButton>
                        </Paper>

                    </Grid>
                </Grid>
            </div>
        )
    }


    return (
        <Dialog
            onBackdropClick={closeJoinDialog}
            TransitionComponent={Transition}
            fullWidth
            classes={{
                paper: classes.paper
            }}
            open={open}>
            <DialogContent>
                <Grid
                    justify="space-between"
                    alignItems="center"
                    container>
                    <Grid item md={12} xs={12}>

                        {renderRandomForm()}
                    </Grid>
                    <Grid item md={12} xs={12} style={{marginBottom: "2rem"}}>
                        {renderJoinForm()}

                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    )
}

const styles = theme => ({
    paper: {
        backgroundColor: "#333",
        margin: "auto",
        position: 'absolute',
        top: "10%",
    },
    dialogOption: {
        minHeight: 130, 
        width: "100%", 
        height: "100%",
    },
    randomButton: {
        backgroundColor: "#444",
        color: "#999",
        '&:hover': {
            backgroundColor: "#666",
            color: "#00e676"
        }
    },
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        color: '#00e676',
        padding: 10,
        transition: '0.2s',
    },
    divider: {
        height: 28,
        margin: 4,
    },
})

const mapStateToProps = state => {
    return { joinDialogOpen: state.interface.joinDialog }
}

export default connect(mapStateToProps, actions)(withStyles(styles)(JoinRoomDialog))