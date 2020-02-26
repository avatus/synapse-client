import * as TYPES from './auth.types'
import axios from 'axios'

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
    dispatch({ type: TYPES.IS_HUMAN })
}