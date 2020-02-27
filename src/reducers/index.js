import { combineReducers } from 'redux'

import messageReducer from './message.reducer'
import authReducer from './auth.reducer'
import interfaceReducer from './interface.reducer'

export default combineReducers({
    auth: authReducer,
    messages: messageReducer,
    interface: interfaceReducer,
})