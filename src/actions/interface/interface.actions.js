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