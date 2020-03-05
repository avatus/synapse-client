import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { store } from '../index'
import * as messageTypes from '../actions/messages/messages.types'

const returnUnredTotal = (unfocused, rooms) => {
    let roomUnread = 0
    Object.keys(rooms).forEach(r => {
        if (rooms[r].unread) {
            roomUnread += rooms[r].unread
        }
    })
    let unread = unfocused + roomUnread
    return unread
}

const HelmetHeader = ({ current_room, room_list, unfocusedUnread }) => {
    const unread = returnUnredTotal(unfocusedUnread, room_list)
    const title = current_room || 'Synapse Index'
    useEffect(() => {
        function handleMarkRead() {
            store.dispatch({ type: messageTypes.UPDATE_FOCUSED_UNREAD })
        }

        window.addEventListener('focus', handleMarkRead);
        return () => window.removeEventListener('focus', handleMarkRead);
    })
    return (
        <Helmet
            defer={false} 
        >
            <title>{unread > 0 ? `(${unread}) ${title}` : title}</title>
        </Helmet>
    )
}

const mapStateToProps = state => {
    return { 
        unfocusedUnread: state.auth.unread,
        current_room: state.room.room_name,
        room_list: state.auth.room_list,
    }
}

export default connect(mapStateToProps)(HelmetHeader)