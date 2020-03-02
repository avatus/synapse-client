import * as TYPES from './auth.types'
import { store } from '../../index'
import { history } from '../../App'
import axios from 'axios'
import randomString from 'randomstring'

export const setUserRooms = rooms =>  {
    let roomObj = {}
    rooms.forEach(r => {
        roomObj[r] = {
            unread: 0,
        }
    })
    store.dispatch({ type: TYPES.USER_ROOM_LIST, payload: roomObj })
}

export const checkHumanToken = (token, done) => dispatch => {
    axios.defaults.headers.common.Authorization = `${token}`
    axios.defaults.headers.common.Pragma = "no-cache"
    axios.get(`${process.env.REACT_APP_ROOT_URL}/auth/verify`)
    .then(response => {
        dispatch({ type: TYPES.IS_HUMAN })
        return done()
    })
    .catch(err => {
        localStorage.removeItem('token')
        return done()
    })
}

export const isHuman = (token) => dispatch => {
    axios.defaults.headers.common.Authorization = `${token}`
    axios.defaults.headers.common.Pragma = "no-cache"
    localStorage.setItem('token', token)
    return dispatch({ type: TYPES.IS_HUMAN })
}

export const updateIdToken = (getNew, callback) => dispatch => {
    if (getNew === true) {
        localStorage.setItem('id_token', randomString.generate())
        history.push('/')
        window.location.reload()
    }
    if (getNew === false) {
        axios.get(`${process.env.REACT_APP_ROOT_URL}/sockets/regen_id_token`)
        .then(response => {
            localStorage.setItem('id_token', response.data.id_token)
            history.push('/')
            window.location.reload()
        })
        .catch(err => {
            callback(err?.response?.data?.message || "Something went wrong.")
        })
    }
}

export const importIdToken = token => dispatch => {
    localStorage.setItem('id_token', token)
    window.location.reload()
}

export const leaveRoom = room => dispatch => {
    let { room_list } = store.getState().auth
    axios.post(`${process.env.REACT_APP_ROOT_URL}/sockets/leave_room`, {room})
    .then(response => {
        delete room_list[room]
        dispatch({ type: TYPES.USER_ROOM_LIST, payload: room_list })
        history.replace('/')
    })
    .catch(err => {
        console.log(err)
    })
}