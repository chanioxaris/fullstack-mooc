import React from 'react'

const Notification = ({message, isError}) => {
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
        <div style={successStyle}>
            {message}
        </div>
    )
}

const error = (message, style) => {
    const errorStyle = { ...style,  color: "red" }

    return (
        <div style={errorStyle}>
            {message}
        </div>
    )
}

export default Notification