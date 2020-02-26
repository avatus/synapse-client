import { combineReducers } from 'redux'

import messageReducer from './message.reducer'
import authReducer from './auth.reducer'

export default combineReducers({
    auth: authReducer,
    messages: messageReducer,
})