import * as TYPES from '../actions/messages/messages.types'

const initialState = {
    messages: [],
    report: null
}

export default (state = {}, action) => {
    switch (action.type) {
        case TYPES.SEND_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.payload]
            }
        case TYPES.RECEIVE_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.payload]
            }
        case TYPES.REPORT_MESSAGE:
            return {
                ...state,
                report: action.payload
            }
        default:
            return {...initialState, ...state}
    }
}