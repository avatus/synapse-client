import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import * as authActions from '../actions/auth/auth.actions'
import ReCAPTCHA from "react-google-recaptcha";

const actions = {
    ...authActions
}


const Captcha = props => {
    const { isHuman } = props

    const verifyRecaptcha = key => {
        axios.post(`${process.env.REACT_APP_ROOT_URL}/auth/recaptcha`, {key})
        .then(response => {
            isHuman(response.data.token)
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <ReCAPTCHA 
            onChange={verifyRecaptcha}
            sitekey={process.env.REACT_APP_RECAPTCHA}
            theme="dark"
        />
    )
}

export default connect(null, actions)(Captcha)