import * as TYPES from '../actions/auth/auth.types'

const initialState = {
    user: null,
    human: false,
    room_list: [],
    fetching_rooms: true,
}

export default (state = {}, action) => {
    switch (action.type) {
        case TYPES.AUTH_USER:
            return {
                ...state,
                user: action.payload, 
            }
        case TYPES.IS_HUMAN:
            return {
                ...state,
                human: true, 
            }
        case TYPES.USER_ROOM_LIST:
            return {
                ...state,
                room_list: action.payload,
                fetching_rooms: false,
            }
        default:
            return {...initialState, ...state}
    }
}