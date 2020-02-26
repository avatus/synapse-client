import React, { useState } from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import moment from 'moment'
import Blockies from 'react-blockies';
import useInterval from '@use-it/interval';
import { withStyles } from '@material-ui/core/styles'

const formatTime = time => {
  return time.fromNow()
}

const Message = props => {
    const { message, classes } = props
    const momentTime = moment(message.time)
    const [time, setTime] = useState(momentTime.fromNow())

    useInterval(() => {
      setTime(formatTime(momentTime))
    }, 60000)

    return (
      <ListItem
        key={message.id}
        className={classes.message}>
        <ListItemAvatar>
          <Blockies
            seed={message.user}
          />
        </ListItemAvatar>
        <ListItemText
          primary={message.text}
          secondary={
            <span style={{color: "#666"}}>{
              `${message.user.substring(message.user.length - 5)} - ${time}`}
            </span>}
        />
      </ListItem>
    )
}

const styles = theme => ({
    message: {
        marginTop: "0.5rem",
        backgroundColor: "#282828",
        borderRadius: "4px",
        listStyleType: "none"
      }
})

export default withStyles(styles)(Message)