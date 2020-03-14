import * as TYPES from '../actions/messages/messages.types'

const initialState = {
    messages: [],
    userInput: "",
    report: null,
    focusInput: false,
}

export default (state = {}, action) => {
    switch (action.type) {
        case TYPES.SEND_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.payload]
            }
        case TYPES.UPDATE_USER_INPUT:
            return {
                ...state,
                userInput: action.payload,
            }
        case TYPES.TAG_USER:
            return {
                ...state,
                userInput: `${state.userInput}@${action.payload} `,
                focusInput: true,
            }
        case TYPES.BLUR_USER_INPUT:
            return {
                ...state,
                focusInput: false,
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