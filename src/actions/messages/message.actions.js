import * as TYPES from './messages.types'
import { store } from '../../index'
import socket from '../../config/socket'

socket.on(TYPES.ROOM_MESSAGE, ({ room, message }) => {
    const { room_name } = store.getState().room
    if (room === room_name) {
        store.dispatch({ type: TYPES.ROOM_MESSAGE, payload: message })
    }
    else {
        const { room_list } = store.getState().auth
        let update =  room_list[room]
        update.unread = update.unread += 1
        store.dispatch({ type: TYPES.INACTIVE_ROOM_MESSAGE, payload: {room, update} })
    }
    // store.dispatch({ type: TYPES.RECEIVE_MESSAGE, payload: message })
})

export const sendMessage = (room, message) => dispatch => {
    socket.emit(TYPES.SEND_MESSAGE, {room, message})
    // dispatch({ type: TYPES.SEND_MESSAGE, payload: message })
}