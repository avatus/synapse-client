import * as TYPES from './room.types'
import axios from 'axios'
// import socket from '../../config/socket'

export const getRoom = room_id => dispatch => {
    dispatch({ type: TYPES.UNSET_ROOM })
    axios.get(`${process.env.REACT_APP_ROOT_URL}/sockets/get_room_info/${room_id}`)
    .then(response => {
        dispatch({ type: TYPES.SET_ROOM, payload: response.data })
    })
    .catch(err => {
        console.log(err)
    })
}

export const unsetRoom = room_id => dispatch => {
    return dispatch({ type: TYPES.UNSET_ROOM })
}

export const setAllRooms = () => dispatch => {
    axios.get(`${process.env.REACT_APP_ROOT_URL}/sockets/get_all_rooms`)
    .then(response => {
        return dispatch({ type: TYPES.SET_ALL_ROOMS, payload: response.data })
    })
    .catch(err => {
        console.log(err)
    })
}