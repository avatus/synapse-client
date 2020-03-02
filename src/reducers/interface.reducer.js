import * as TYPES from '../actions/interface/interface.types'

const initialState = {
    drawerOpen: false,
    joinDialog: false,
    idTokenDialog: false,
}

export default (state = {}, action) => {
    switch (action.type) {
        case TYPES.OPEN_MENU:
            return {
                ...state,
                drawerOpen: true, 
            }
        case TYPES.CLOSE_MENU:
            return {
                ...state,
                drawerOpen: false, 
            }

        case TYPES.OPEN_JOIN_DIALOG:
            return {
                ...state,
                joinDialog: true
            }
        case TYPES.CLOSE_JOIN_DIALOG:
            return {
                ...state,
                joinDialog: false
            }
        case TYPES.OPEN_ID_TOKEN_DIALOG:
            return {
                ...state,
                idTokenDialog: true
            }
        case TYPES.CLOSE_ID_TOKEN_DIALOG:
            return {
                ...state,
                idTokenDialog: false
            }
        default:
            return {...initialState, ...state}
    }
}