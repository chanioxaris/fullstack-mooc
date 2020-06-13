import React from "react"
import PropTypes from "prop-types"

const Notification = ({ message, isError }) => {
    const style = {
        fontStyle: "italic",
        fontSize: 20,
        background: "lightgrey",
        borderStyle: "solid",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    if (message === "") {
        return null
    }

    if (isError) {
        return error(message, style)
    }

    return success(message, style)
}

const success = (message, style) => {
    const successStyle = { ...style,  color: "green" }

    return (
        <div id="success-notification" style={successStyle}>
            {message}
        </div>
    )
}

const error = (message, style) => {
    const errorStyle = { ...style,  color: "red" }

    return (
        <div id="error-notification" style={errorStyle}>
            {message}
        </div>
    )
}

Notification.propTypes = {
    message: PropTypes.string.isRequired,
    isError: PropTypes.bool
}

export default Notification