import * as TYPES from '../actions/interface/interface.types'

const checkStorage = () => {
    try {
      localStorage.setItem('storageCheck', '1');
      localStorage.removeItem('storageCheck');
      return true;
    } catch (err) {
      return false;
    }
}

let initialState = {
    drawerOpen: false,
    mobileDrawerOpen: false,
    joinDialog: false,
    compactMessages: false,
    idTokenDialog: false,
    settingsDialog: false,
}

if (checkStorage()) {
    let compactMessages = localStorage.getItem('compactMessages')
    if (compactMessages === "true") {
        initialState.compactMessages = true
    }
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
        case TYPES.OPEN_MOBILE_MENU:
            return {
                ...state,
                mobileDrawerOpen: true, 
            }
        case TYPES.CLOSE_MOBILE_MENU:
            return {
                ...state,
                mobileDrawerOpen: false, 
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
        case TYPES.OPEN_SETTINGS_DIALOG:
            return {
                ...state,
                settingsDialog: true
            }
        case TYPES.CLOSE_SETTINGS_DIALOG:
            return {
                ...state,
                settingsDialog: false
            }
        case TYPES.UPDATE_SETTING_COMPACT_MESSAGES:
            return {
                ...state,
                compactMessages: action.payload,
            }
        default:
            return {...initialState, ...state}
    }
}