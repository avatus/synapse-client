import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'

export default function configureStore () {
  let composeEnhancers
  if (process.env.REACT_APP_ENV === "dev") {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  }
  else {
    composeEnhancers = compose
  }
    return createStore(rootReducer, composeEnhancers(
        applyMiddleware(thunk)
  ));
}