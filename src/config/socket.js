import io from 'socket.io-client'
import axios from 'axios'
import { store } from '../index'
import * as interfaceActions from '../actions/interface/interface.actions'
import * as roomTypes from '../actions/rooms/room.types'
import * as authActions from '../actions/auth/auth.actions'
import * as roomActions from '../actions/rooms/room.actions'
import * as TYPES from '../actions/auth/auth.types'
// import * as roomTypes from '../actions/rooms/room.types'
import randomstring from 'randomstring'
let failedOnce = false

let id_token = localStorage.getItem('id_token')
if (!id_token) {
    id_token = randomstring.generate()
    localStorage.setItem('id_token', id_token)
}

axios.defaults.headers.common['X-ID-TOKEN'] = id_token

const socket = io(process.env.REACT_APP_ROOT_URL, {
    query: { id_token },
    reconnectionDelay: 10000,
})

socket.on('error', error => {
    console.log(error)
})

socket.on('connect', () => {
    store.dispatch({ type: TYPES.AUTH_USER, payload: id_token })
})

socket.on('disconnect_message', message => {
    interfaceActions.showMessage(message, "warning")
})

socket.on('reconnect', () => {
    let sendBuffer = socket.sendBuffer
    let { room_name: current_room } = store.getState().room
    setTimeout(() => {
        socket.emit('USER_RECONNECTED', {id: id_token})
        sendBuffer.forEach(buf => {
            socket.emit(buf.data[0], buf.data[1], buf.options)
        })
        if (current_room) {
            roomActions.getRoom(current_room, false)(store.dispatch)
        }
        else {
            roomActions.getRecentMessages()(store.dispatch)
        }
    }, 1000)
})

socket.on('connect_error', error => {
    if (!failedOnce) {
        interfaceActions.showMessage("Failed to connect to websocket. Retrying...", "warning")
        failedOnce = true
    }
})

socket.on('USER_ROOM_LIST', ({rooms, unread}) => {
    authActions.setUserRooms(rooms, unread)
})

socket.on('UPDATE_ROOM_USER_COUNT', ({room, users}) => {
    const { room_name } = store.getState().room
    if (room_name === room) {
        store.dispatch({ type: roomTypes.UPDATE_ROOM_USER_COUNT, payload: users })
    }
})

socket.on('RECENT_MESSAGE', message => {
    console.log(message)
    return store.dispatch({ type: roomTypes.UPDATE_NEW_RECENT_MESSAGE, payload: message })
})

// socket.on('USER_LEFT_ROOM', room => {
//     const { room_name } = store.getState().room
//     console.log(room_name, room)
//     if (room_name === room) {
//         store.dispatch({ type: roomTypes.USER_LEFT_ROOM })
//     }
// })

// socket.on('USER_JOINED_ROOM', ({room, id_token: user_token}) => {
//     const { room_name } = store.getState().room
//     if (room_name === room && id_token !== user_token) {
//         console.log(user_token, id_token)
//         store.dispatch({ type: roomTypes.USER_JOINED_ROOM })
//     }
// })

socket.on('reconnect_failed', () => {
    interfaceActions.showMessage("Connection to websocket failed.","error")
})

export default socket