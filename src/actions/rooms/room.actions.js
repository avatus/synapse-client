import * as TYPES from './room.types'
import axios from 'axios'

export const getRoom = (room_id, newRoom) => dispatch => {
    if (newRoom)  {
        dispatch({ type: TYPES.UNSET_ROOM })
    }
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
        response.data.rooms.sort((a,b) => b.users-a.users)
        return dispatch({ type: TYPES.SET_ALL_ROOMS, payload: response.data })
    })
    .catch(err => {
        console.log(err)
    })
}

export const recentMessageListener = () => {
    axios.post(`${process.env.REACT_APP_ROOT_URL}/sockets/listen_to_recent_messages`)
    .then(response => {
    })
    .catch(err => {
        console.log(err)
    })
}

export const removeRecentMessageListener = () => {
    axios.post(`${process.env.REACT_APP_ROOT_URL}/sockets/stop_listen_to_recent_messages`)
    .then(response => {
    })
    .catch(err => {
        console.log(err)
    })
}

export const getRecentMessages = () => dispatch => {
    axios.get(`${process.env.REACT_APP_ROOT_URL}/sockets/get_recent_messages`)
    .then(response => {
        return dispatch({ type: TYPES.UPDATE_RECENT_MESSAGES, payload: response.data})
    })
    .catch(err => {
        console.log(err)
    })
}