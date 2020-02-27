import * as TYPES from '../actions/interface/interface.types'

const initialState = {
    drawerOpen: false,
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
        default:
            return {...initialState, ...state}
    }
}