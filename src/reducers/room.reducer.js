import * as TYPES from '../actions/rooms/room.types'
import * as messageTYPES from '../actions/messages/messages.types'

const initialState = {
    room_name: null,
    users: 0,
    totalUsers: 0,
    history: [],
    recentMessages: [],
    allRooms: [],
    fetching_all_rooms: true
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
                history: [...state.history.slice(-100), action.payload]
            }
        case TYPES.USER_LEFT_ROOM:
            console.log('user left room')
            return {
                ...state,
                users: state.users - 1
            }
        case TYPES.USER_JOINED_ROOM:
            console.log('user left room')
            return {
                ...state,
                users: state.users + 1
            }
        case TYPES.UPDATE_ROOM_USER_COUNT:
            return {
                ...state,
                users: action.payload
            }
        case TYPES.SET_ALL_ROOMS:
            return {
                ...state,
                allRooms: action.payload.rooms,
                totalUsers: action.payload.clients,
                recentMessages: action.payload.recentMessages,
                fetching_all_rooms: false,
            }
        case messageTYPES.UPDATE_USER_MESSAGE_DELIVERED:
            return {
                ...state,
                history: action.payload,
            }
        default:
            return {...initialState, ...state}
    }
}