import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux'
import configureStore from './config/redux-store'
import 'typeface-roboto-mono'

export const store = configureStore()

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider> 
    , document.getElementById('root'))