import React, { useState } from 'react'
import moment from 'moment'
import parse from 'html-react-parser';
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import useInterval from '@use-it/interval';
import linkifyHtml from 'linkifyjs/html'
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

  const messageHtml = linkifyHtml(message.text, {
    defaultProtocol: 'https'
  });

  return (
    <div
      style={{
        maxWidth: '100%',
        display: 'flex',
        alignItems: 'center',
        padding: "0.5rem 1rem 0.5rem 1rem"
      }}
      className={classes.message}>
      <Avatar
        style={{ marginRight: "1rem" }}
        src={userImage}
        alt={message.user}
      />
      <div>
        <Typography>{parse(messageHtml)}</Typography>
        <Typography variant="caption" style={{color: "#666"}}>{message.delivered ? `${message.user.substring(message.user.length - 5)} - ${time}` : 'Sending...'}</Typography>
      </div>
    </div>
  )
  // return (
  //   <ListItem
  //     disabled={!message.delivered}
  //     key={message.id}
  //     className={classes.message}>
  //     <ListItemAvatar>
  //       <Avatar
  //         src={userImage}
  //         alt={message.user}
  //       />
  //     </ListItemAvatar>
  //     <ListItemText
  //       primary={message.text}
  //       secondary={
  //         <span style={{color: "#666"}}>{message.delivered ?
  //           `${message.user.substring(message.user.length - 5)} - ${time}`
  //           : 'Sending...'
  //         }
  //         </span>}
  //     />
  //   </ListItem>
  // )
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