import React, { useState } from 'react'
import moment from 'moment'
import parse from 'html-react-parser';
import Avatar from '@material-ui/core/Avatar'
import randomColor from 'randomcolor'
import Typography from '@material-ui/core/Typography'
import useInterval from '@use-it/interval';
import linkifyHtml from 'linkifyjs/html'
import * as linkify from 'linkifyjs';
import hashtag from 'linkifyjs/plugins/hashtag';
import { withStyles } from '@material-ui/core/styles'
hashtag(linkify);

const formatTime = time => {
  return time.fromNow()
}

const htmlify = text => {
  return linkifyHtml(text, {
    defaultProtocol: 'https',
    formatHref: function (href, type) {
      if (type === "hashtag") {
        href = process.env.REACT_APP_LINK_ROOT + '/synapse/' + href.substring(1)
      }
      if (type === "url" && href.includes(process.env.REACT_APP_LINK_ROOT)) {
        let parts = href.split('/')
        href = `${process.env.REACT_APP_LINK_ROOT}/synapse/${parts[parts.length-1]}`
      }
      return href
    },
    format: function (value, type) {
      if (type === "url" && value.includes(process.env.REACT_APP_LINK_ROOT)) {
        let parts = value.split('/')
        value = `#${parts[parts.length-1]}`
      }
      return value
    },
    className: function (href, type) {
      if (type === "hashtag") {
        return 'linkified-hashtag'
      }
      if (type === "url" && href.includes(process.env.REACT_APP_LINK_ROOT)) {
        return 'linkified-hashtag'
      }
      return 'linkified'
    },
    target: function(value, type) {
      let target = '_blank'
      if (type === "url" && value.includes(process.env.REACT_APP_LINK_ROOT)) {
        target =  null
      }
      if (type === "hashtag") {
        target = null
      }
      return target
    }
  })
}

const Message = props => {
  const { message, classes, compact } = props
  const momentTime = moment(message.time)
  const [time, setTime] = useState(momentTime.fromNow())

  useInterval(() => {
    setTime(formatTime(momentTime))
  }, 60000)

  const userImage = `https://api.adorable.io/avatars/64/${message.user}`

  if (compact) {
    return (
      <div
        style={{
          maxWidth: '100%',
          display: 'flex',
          alignItems: 'center',
          padding: "0.2rem 0.5rem 0.2rem 0.5rem"
        }}
        className={classes.message}>
          <Typography variant="caption" style={{color: randomColor({seed: message.user}), marginRight: "0.5rem"}}>{message.delivered ? `${message.user.substring(message.user.length - 5)}:` : 'Sending...'}</Typography>
          <Typography>{parse(htmlify(message.text))}</Typography>
      </div>
    )
  }
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
        <Typography>{parse(htmlify(message.text))}</Typography>
        <Typography variant="caption" style={{color: "#666"}}>{message.delivered ? `${message.user.substring(message.user.length - 5)} - ${time}` : 'Sending...'}</Typography>
      </div>
    </div>
  )
}

const styles = theme => ({
  message: {
    marginTop: "0.5rem",
    backgroundColor: "#282828",
    borderRadius: "4px",
    listStyleType: "none",
    transition: '0.1s',
  },
})

export default withStyles(styles)(Message)