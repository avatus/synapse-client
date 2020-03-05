import * as TYPES from '../actions/auth/auth.types'
import * as messageTYPES from '../actions/messages/messages.types'
import * as roomTYPES from '../actions/rooms/room.types'

const initialState = {
    user: null,
    human: false,
    room_list: {},
    fetching_rooms: true,
    unread: 0,
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
        case messageTYPES.UPDATE_UNFOCUSED_UNREAD: {
            return {
                ...state,
                unread: state.unread + 1
            }
        }
        case messageTYPES.UPDATE_FOCUSED_UNREAD: {
            return {
                ...state,
                unread: 0
            }
        }
        case TYPES.USER_ROOM_LIST:
            return {
                ...state,
                room_list: action.payload,
                fetching_rooms: false,
            }
        case roomTYPES.SET_ROOM:
            return {
                ...state,
                room_list: {...state.room_list, [action.payload.room_name]: {unread: 0}}
            }
        case messageTYPES.INACTIVE_ROOM_MESSAGE:
            return {
                ...state,
                room_list: {...state.room_list, [action.payload.room]: action.payload.update,  }
            }
        default:
            return {...initialState, ...state}
    }
}