import React, { useState } from 'react'
import * as interfaceActions from '../actions/interface/interface.actions'
import * as authActions from '../actions/auth/auth.actions'
import { connect } from 'react-redux'
import Tooltip from '@material-ui/core/Tooltip'
import Paper from '@material-ui/core/Paper'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Dialog from '@material-ui/core/Dialog'
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Avatar from '@material-ui/core/Avatar'
import InputBase from '@material-ui/core/InputBase'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Divider from '@material-ui/core/Divider'
import ChevronRight from '@material-ui/icons/ChevronRight'
import Typography from '@material-ui/core/Typography'
// import DialogContentText from '@material-ui/core/DialogContentText'
import DialogContent from '@material-ui/core/DialogContent'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import Slide from '@material-ui/core/Slide'

const actions = {
    ...interfaceActions,
    ...authActions,
}

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});


const IdTokenDialog = ({ 
    classes, 
    idDialogOpen, 
    closeIdTokenDialog, 
    importIdToken ,
    updateIdToken,
    }) => {
    const id_token = localStorage.getItem('id_token')
    const userImage = `https://api.adorable.io/avatars/30/${id_token}`
    const open = Boolean(idDialogOpen)
    const [errorMessage, setErrorMessage] = useState("")
    const [importErrorMessage, setImportErrorMessage] = useState("")
    const [updating, setUpdating] = useState(false)
    const [importToken, setImportToken] = useState("")
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        setCopied(true)
        setTimeout(() => {
            setCopied(false)
        }, 2000)
    }

    const handleImportChange = event => {
        setImportToken(event.target.value)
    }

    const handleImportIdToken = () => {
        setUpdating(true)
        importIdToken(importToken)
    }

    const handleError = error => {
        setErrorMessage(error, handleImportError)
        setUpdating(false)
    }

    const handleImportError = error => {
        setImportErrorMessage(error)
    }

    const handleUpdateToken = getnew => () => {
        setUpdating(true)
        updateIdToken(getnew, handleError)
    }

    const renderRandomForm = () => {
        return (
            <div className={classes.dialogOption}>
                <Typography
                    variant="h6"
                    style={{ color: "#AAA", }}>Identification Token</Typography>
                <Typography
                    style={{ color: "#AAA" }}
                    variant="caption"
                    paragraph>This id_token is randomly generated and unique to your browser. This is how we track what synapses you belong to. It will <em>not</em> be present if you open a private/incognito window.</Typography>
                <Typography>Export Identification Token</Typography>
                <Typography
                    style={{ color: "#AAA" }}
                    variant="caption"
                    paragraph>Copy your token below and store. You can use this to import into another browser.</Typography>
                <Grid 
                    container 
                    style={{marginBottom: "2rem"}}
                    alignItems="center" 
                    spacing={1}>
                    <Grid item>
                        <Avatar alt={id_token} src={userImage} />
                    </Grid>
                    <Grid item xs>
                        <Paper
                            className={classes.root}>
                            <InputBase
                                inputProps={{
                                    maxLength: 12
                                }}
                                disabled={true}
                                value={id_token}
                                fullWidth
                                className={classes.input}
                            />
                            <Divider className={classes.divider} orientation="vertical" />
                            <Tooltip 
                                placement="top"
                                open={copied} 
                                title="Copied to Clipboard!">
                                <CopyToClipboard 
                                    onCopy={handleCopy}
                                    text={id_token}>
                                    <IconButton
                                        disabled={updating}
                                        className={classes.iconButton} >
                                        <FileCopyIcon />
                                    </IconButton>
                                </CopyToClipboard>
                            </Tooltip>
                        </Paper>
                    </Grid>
                </Grid>
                <Typography>Import Identification Token</Typography>
                <Typography
                    style={{ color: "#AAA" }}
                    variant="caption"
                    paragraph>You can import your id_token from another browser here.</Typography>
                <Typography style={{color: "#d32f2f"}}>{importErrorMessage}</Typography>
                <Grid 
                    container 
                    style={{marginBottom: "2rem"}}
                    alignItems="center" 
                    spacing={1}>
                    <Grid item>
                        <Avatar alt={id_token} src={`https://api.adorable.io/avatars/30/${importToken}`} />
                    </Grid>
                    <Grid item xs>
                        <Paper
                            className={classes.root}>
                            <InputBase
                                inputProps={{
                                    maxLength: 32
                                }}
                                value={importToken}
                                onChange={handleImportChange}
                                placeholder="Paste id_token here"
                                fullWidth
                                className={classes.input}
                            />
                            <Divider className={classes.divider} orientation="vertical" />
                                <IconButton
                                    onClick={handleImportIdToken}
                                    disabled={updating || importToken.length !== 32}
                                    className={classes.iconButton} >
                                    <ChevronRight />
                                </IconButton>
                        </Paper>
                    </Grid>
                </Grid>
                <Typography>Generate New Identification Token</Typography>
                <Typography
                    style={{ color: "#AAA" }}
                    variant="caption"
                    paragraph>If you'd like to reset your identity, you can do so by selecting an option below.</Typography>
                <Typography paragraph style={{color: "#d32f2f"}}>{errorMessage}</Typography>
                <div className={classes.newButtonBox}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <Button
                                onClick={handleUpdateToken(true)}
                                disabled={updating}
                                className={classes.freshToken}
                                size="small"
                                variant="contained"
                            >Fresh Token</Button>
                        </Grid>
                        <Grid item xs>
                            <Typography variant="caption">This will generate a completely new id_token and remove you from all current synapses</Typography>
                        </Grid>
                    </Grid>
                </div>
                <div className={classes.newButtonBox}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <Button
                                disabled={updating}
                                onClick={handleUpdateToken(false)}
                                className={classes.regenToken}
                                size="small"
                                variant="contained"
                            >Regen Token</Button>
                        </Grid>
                        <Grid item xs>
                            <Typography variant="caption">This will generate a new id_token but retain your current synapse list.</Typography>
                        </Grid>
                    </Grid>
                </div>
            </div>
        )
    }

    return (
        <Dialog
            onBackdropClick={closeIdTokenDialog}
            TransitionComponent={Transition}
            fullWidth
            maxWidth="md"
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
    newButtonBox: {
        marginBottom: "1rem"
    },
    freshToken: {
        backgroundColor: "#222",
        color: "#00B676"
    },
    regenToken: {
        backgroundColor: "#222",
        color: "#ef5350"
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
    return { idDialogOpen: state.interface.idTokenDialog }
}

export default connect(mapStateToProps, actions)(withStyles(styles)(IdTokenDialog))