import io from 'socket.io-client'
import axios from 'axios'
import { store } from '../index'
import { showMessage } from '../actions/interface/interface.actions'
import * as TYPES from '../actions/auth/auth.types'
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
    reconnectionAttempts: 3,
    reconnectionDelay: 10000,
})

socket.on('error', error => {
    console.log(error)
})

socket.on('connect', () => {
    store.dispatch({ type: TYPES.AUTH_USER, payload: id_token })
})

socket.on('disconnect_message', message => {
    showMessage(message, "warning")
})

socket.on('connect_error', error => {
    console.log(error)
    if (!failedOnce) {
        showMessage("Failed to connect to websocket. Retrying...", "warning")
        failedOnce = true
    }
})

socket.on('reconnect_failed', () => {
    showMessage("Connection to websocket failed.","error")
})

export default socket