import React from "react"

const Notify = ({ notification }) => {
    if (!notification) {
        return null
    }

    let color = "green"
    if (notification.isError) {
        color = "red"
    }

    return (
        <div style={{ color: color, marginTop: 10, marginBottom: 10 }}>
            {notification.message}
        </div>
    )
}

export default Notify