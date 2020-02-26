import * as TYPES from '../actions/auth/auth.types'

const initialState = {
    user: null,
    human: false,
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
        default:
            return {...initialState, ...state}
    }
}