import React, { useState } from 'react'
import { connect } from 'react-redux'
import * as interfaceActions from '../actions/interface/interface.actions'
import * as messageActions from '../actions/messages/message.actions'
import Dialog from '@material-ui/core/Dialog'
import InputBase from '@material-ui/core/InputBase'
import Paper from '@material-ui/core/Paper'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Typography from '@material-ui/core/Typography'
import Message from '../components/Message'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import axios from 'axios'


const ReportMessageDialog = ({ classes, compact, report, open, closeReportDialog, submitReport }) => {
    const [error, setError] = useState("")
    const [reporting, setReporting] = useState(false)
    const [info, setInfo] = useState("")
    const handleReport = () => {
        setReporting(true)
        axios.post(`${process.env.REACT_APP_ROOT_URL}/messages/report_message`, {message: report, info})
        .then(response => {
            setReporting(false)
            closeReportDialog()
            setInfo("")
            interfaceActions.showMessage("Successfully reported. Thank you.")
        })
        .catch(err => {
            setError("There was an error while reporting this message.")
            setReporting(false)
        })
    }

    const updateInfo = event => {
        setInfo(event.target.value)
    }

    return (
        <Dialog
            open={open}
            fullWidth
            classes={{
                paper: classes.dialogPaper
            }}
        >
            <DialogTitle>Report Message</DialogTitle>
            <DialogContent>
                <Typography variant="caption">Please confirm your report for the message below.</Typography>
                <Message compact={compact} message={report} />
                <div style={{marginTop: "1rem"}}>

                    {/* <Typography variant="caption">Any Additional Information? (Optional)</Typography> */}
                        <Paper
                            className={classes.root}>
                            <InputBase
                                multiline
                                rows={1}
                                rowsMax={4}
                                inputProps={{
                                    maxLength: 250
                                }}
                                value={info}
                                onChange={updateInfo}
                                placeholder="Additional Information (Optional)"
                                fullWidth
                                className={classes.input}
                            />
                            {/* <Divider className={classes.divider} orientation="vertical" />
                                <IconButton
                                    onClick={handleImportIdToken}
                                    disabled={updating || importToken.length !== 32}
                                    className={classes.iconButton} >
                                    <ChevronRight />
                                </IconButton> */}
                        </Paper>
                </div>
                <Typography style={{color: "#ef5350"}}>{error}</Typography>
            </DialogContent>
            <DialogActions>
                <Button
                    color="primary"
                    disabled={reporting}
                    classes={{
                        textPrimary: classes.cancelUpload
                    }}
                    onClick={closeReportDialog} 
                >Cancel</Button>
                <Button
                    onClick={handleReport}
                    color="primary"
                    disabled={reporting}
                    classes={{
                        textPrimary: classes.confirmUpload
                    }} 
                >Report</Button>
            </DialogActions>
        </Dialog>
    )
}

const mapStateToProps = state => {
    return {
        report: state.messages.report,
        open: state.interface.reportDialog,
        compact: state.interface.compactMessages,
    }
}

const styles = theme => ({
    root: {
        backgroundColor: "#1F1F1F",
        padding: '4px 6px',
    },
    dialogPaper: {
        margin: "auto",
        position: 'absolute',
        top: "10%",
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
})

const actions = {
    ...interfaceActions,
    ...messageActions,
}

export default connect(mapStateToProps, actions)(withStyles(styles)(ReportMessageDialog))