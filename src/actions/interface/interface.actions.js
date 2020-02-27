import * as TYPES from './interface.types'
import { toast } from 'react-toastify'
import { css } from 'glamor'

export const showMessage = (message, status) => {
    if (!status) {
        toast(message, {
            className: css({
                borderLeft: "1px solid #00e676",
            }),
            closeButton: false,
            hideProgressBar: true,
        });
    }
    if (status === "error") {
        toast(message, {
            className: css({
                borderLeft: "1px solid #ff5722",
            }),
            autoClose: false,
            hideProgressBar: true,
        });
    }
    if (status === "warning") {
        toast(message, {
            className: css({
                borderLeft: "1px solid #ff5722",
            }),
            hideProgressBar: true,
        });
    }
}

export const openMenu = () => dispatch => {
    return dispatch({ type: TYPES.OPEN_MENU })
}

export const closeMenu = () => dispatch => {
    return dispatch({ type: TYPES.CLOSE_MENU })
}