import React, { useState } from 'react'
import moment from 'moment'
import parse from 'html-react-parser';
import { connect } from 'react-redux'
import Avatar from '@material-ui/core/Avatar'
import randomColor from 'randomcolor'
import * as messageActions from '../actions/messages/message.actions'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import MoreIcon from '@material-ui/icons/MoreVert'
import MoreCompactIcon from '@material-ui/icons/MoreHoriz'
import Typography from '@material-ui/core/Typography'
import useInterval from '@use-it/interval';
import linkifyHtml from 'linkifyjs/html'
import * as linkify from 'linkifyjs';
import hashtag from 'linkifyjs/plugins/hashtag';
import mention from 'linkifyjs/plugins/mention'
import { withStyles } from '@material-ui/core/styles'
mention(linkify)
hashtag(linkify);

const formatTime = time => {
  return time.fromNow()
}

const htmlify = (text, user) => {
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
      if (type === "mention") {
        href = ""
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
      if (type === "mention" && href.includes(user)) {
        return 'linkified-mention-self'

      }
      if (type === "mention" && !href.includes(user)) {
        return 'linkified-mention'

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
  const { message, classes, user, compact, dashboard, tagUser } = props
  const momentTime = moment(message.time)
  const [time, setTime] = useState(momentTime.fromNow())
  const [anchorEl, setAnchorEl] = useState(null);
  const userString = user.substring(user.length - 5)

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleReport = () => {
        messageActions.reportMessage(message)
    }

  useInterval(() => {
    setTime(formatTime(momentTime))
  }, 60000)

  const userImage = `https://api.adorable.io/avatars/64/${message.user}`

  const handleTagClick = () => {
    tagUser(message.user.substring(user.length - 5))
  }

  const messageMenu = () => {
    return (
      <Menu
      id="auth-menu"
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
  >
      <MenuItem onClick={() => {
          handleClose()
          handleReport()
        }}>Report</MenuItem>
      </Menu>
    )
  }

  const renderTextMessage = () => {
    return (
      <div>
        {
          compact ?
          <div style={{display: 'flex', alignItems: 'center'}}>
            <Typography 
            onClick={handleTagClick}
              variant="caption" style={{cursor: 'pointer', minWidth: 44, color: randomColor({seed: message.user}), marginRight: "0.5rem"}}>{message.delivered ? `${message.user.substring(message.user.length - 5)}:` : 'Sending...'}</Typography>
            <Typography style={{wordBreak:"break-word"}}>{parse(htmlify(message.text, userString))}</Typography>
          </div>
          :
          <div>
            <Typography>{parse(htmlify(message.text, userString))}</Typography>
            <Typography 
            onClick={handleTagClick}
              variant="caption" style={{cursor: 'pointer', color: "#666", wordBreak: "break-word"}}>{message.delivered ? `${message.user.substring(message.user.length - 5)} - ${time}` : 'Sending...'}</Typography>
          </div>
        }
      </div>
    )

  }

  const renderImageMessage = () => {
    return (
      <div>
        <div style={{display: 'flex', alignItems: 'flex-end'}}>
          {
            compact &&
            <Typography 
            onClick={handleTagClick}
            variant="caption" style={{cursor: 'pointer', minWidth: 44, color: randomColor({seed: message.user}), marginRight: "0.5rem"}}>{message.delivered ? `${message.user.substring(message.user.length - 5)}:` : 'Sending...'}</Typography>
          }
          <div>
            {
              dashboard ?
              <img 
                style={{maxHeight: 150, maxWidth: "100%"}}
                alt=""
                src={message.text} />
                :
            <a 
              target="_blank"
              rel="noopener noreferrer"
              href={message.text}>
              <img 
                style={{maxHeight: 150, maxWidth: "100%"}}
                alt=""
                src={message.text} />
            </a>
            }
          </div>
        </div>
          {!compact &&
            <Typography 
            onClick={handleTagClick}
            variant="caption" style={{color: "#666", cursor: 'pointer'}}>{message.delivered ? `${message.user.substring(message.user.length - 5)} - ${time}` : 'Sending...'}</Typography>
          }
      </div>
    )

  }

  if (compact) {
    return (
      <div
        style={{
          maxWidth: '100%',
          display: 'flex',
          alignItems: 'center',
          padding: "0.2rem 0.5rem 0.2rem 0.5rem"
        }}
      className={message.text.includes(userString) ? classes.taggedMessage : classes.message}>
          <div style={{flex: 1}}>
            {message.type === "image" ? renderImageMessage() : renderTextMessage()}
          </div>
          {
            !dashboard &&
          <div style={{justifySelf: 'flex-end'}}>
            <IconButton 
              onClick={handleClick}
              size="small"
              style={{color: "#333"}}>
              <MoreCompactIcon />
            </IconButton>
          </div>
          }
      {messageMenu()}
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
      className={message.text.includes(userString) ? classes.taggedMessage : classes.message}>
      <Avatar
        onClick={handleTagClick}
        style={{ marginRight: "1rem", cursor: 'pointer' }}
        src={userImage}
        alt={message.user}
      />
      <div style={{flex: 1}}>
          {message.type === "image" ? renderImageMessage() : renderTextMessage()}
      </div>
      <div style={{justifySelf: 'flex-end'}}>
        <IconButton 
          onClick={handleClick}
          size="small"
          style={{color: "#333"}}>
          <MoreIcon />
        </IconButton>
      </div>
      {messageMenu()}
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
  taggedMessage: {
    marginTop: "0.5rem",
    backgroundColor: "#2F342F",
    borderLeft: "2px solid #00e676",
    borderRight: "2px solid #00e676",
    borderRadius: "4px",
    listStyleType: "none",
    transition: '0.1s',
  },
})

const mapStateToProps = state => {
  return { user: state.auth.user }
}

const actions = {
  ...messageActions
}

export default connect(mapStateToProps, actions)(withStyles(styles)(Message))