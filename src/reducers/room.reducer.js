import * as TYPES from '../actions/rooms/room.types'
import * as messageTYPES from '../actions/messages/messages.types'

const initialState = {
    room_name: null,
    users: 0,
    history: [],
}

export default (state = {}, action) => {
    switch (action.type) {
        case TYPES.SET_ROOM:
            return {
                ...state,
                room_name: action.payload.room_name,
                history: action.payload.history,
                users: action.payload.users,
            }
        case TYPES.UNSET_ROOM:
            return {
                ...state,
                ...initialState
            }
        case messageTYPES.ROOM_MESSAGE:
            return {
                ...state,
                history: [...state.history, action.payload]
            }
        case TYPES.USER_LEFT_ROOM:
            return {
                ...state,
                users: state.users - 1
            }
        case TYPES.USER_JOINED_ROOM:
            return {
                ...state,
                users: state.users + 1
            }
        default:
            return {...initialState, ...state}
    }
}