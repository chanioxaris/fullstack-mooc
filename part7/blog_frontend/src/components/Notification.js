import React from "react"
import { useSelector } from "react-redux"
import { Snackbar } from "@material-ui/core"
import { Alert } from "@material-ui/lab"

const Notification = () => {
    const notification = useSelector(state => state.notification)

    if (notification.message === "") {
        return null
    }

    if (notification.isError) {
        return error(notification.message)
    }

    return success(notification.message)
}

const success = (message) => {
    return (
        <Snackbar
            id="success-notification"
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={true}
            autoHideDuration={5000}
        >
            <Alert severity="success">
                {message}
            </Alert>
        </Snackbar>
    )
}

const error = (message) => {
    return (
        <Snackbar
            id="error-notification"
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={true}
            autoHideDuration={5000}
        >
            <Alert severity="error">
                {message}
            </Alert>
        </Snackbar>
    )
}

export default Notification