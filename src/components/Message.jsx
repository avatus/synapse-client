import React, { useState } from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import moment from 'moment'
import Avatar from '@material-ui/core/Avatar'
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

    const userImage = `https://api.adorable.io/avatars/64/${message.user}`

    return (
      <ListItem
        disabled={!message.delivered}
        key={message.id}
        className={classes.message}>
        <ListItemAvatar>
          <Avatar
            src={userImage}
            alt={message.user}
          />
        </ListItemAvatar>
        <ListItemText
          primary={message.text}
          secondary={
            <span style={{color: "#666"}}>{message.delivered ?
              `${message.user.substring(message.user.length - 5)} - ${time}`
              : 'Sending...'
            }
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
        listStyleType: "none",
        transition: '0.1s',
      //   transition: theme.transitions.create('transform', {
      //     easing: theme.transitions.easing.sharp,
      //     duration: theme.transitions.duration.enteringScreen,
      // }),
    },
})

export default withStyles(styles)(Message)