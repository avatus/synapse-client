import React from 'react'
import { connect } from 'react-redux'
import * as interfaceActions from '../actions/interface/interface.actions'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import Slide from '@material-ui/core/Slide'
import Typography from '@material-ui/core/Typography'
import Switch from '@material-ui/core/Switch'
import { withStyles } from '@material-ui/core/styles'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const SettingsDialog = props => {
    const { classes, settings, closeSettingsDialog, updateSetting_COMPACT_MESSAGES } = props

    const handleCompactMessages = event => {
        updateSetting_COMPACT_MESSAGES(event.target.checked)
    }

    return (
        <Dialog
        open={settings.settingsDialog}
        onBackdropClick={closeSettingsDialog}
        TransitionComponent={Transition}
        fullWidth
        maxWidth="sm"
        classes={{
            paper: classes.paper
        }}
        >
            <DialogTitle>Settings</DialogTitle>
            <DialogContent>
                <div 
                    style={{
                        padding: "0.5rem",
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center'}}>
                    <Typography 
                        variant="body1">Compact Messages</Typography>
                    <Switch 
                        color="secondary"
                        size="small"
                        checked={settings.compactMessages} 
                        onChange={handleCompactMessages} />
                </div>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={closeSettingsDialog}
                    style={{
                        color: "#9575cd"
                    }} 
                >
                    Close
                </Button>
            </DialogActions>
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
})

const mapStateToProps = state => {
    return { settings: state.interface }
}

const actions = {
    ...interfaceActions,
}

export default connect(mapStateToProps, actions)(withStyles(styles)(SettingsDialog))