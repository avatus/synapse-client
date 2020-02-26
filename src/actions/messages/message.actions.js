import * as TYPES from './messages.types'
import { store } from '../../index'
import socket from '../../config/socket'

socket.on(TYPES.RECEIVE_MESSAGE, message => {
    store.dispatch({ type: TYPES.RECEIVE_MESSAGE, payload: message })
})

export const sendMessage = (message) => dispatch => {
    socket.emit(TYPES.SEND_MESSAGE, message)
    dispatch({ type: TYPES.SEND_MESSAGE, payload: message })
}