import * as TYPES from '../actions/messages/messages.types'

const initialState = {
    messages: [],
}

export default (state = {}, action) => {
    switch (action.type) {
        case TYPES.SEND_MESSAGE:
            return {
                messages: [...state.messages, action.payload]
            }
        case TYPES.RECEIVE_MESSAGE:
            return {
                messages: [...state.messages, action.payload]
            }
        default:
            return {...initialState, ...state}
    }
}