const initialState = ""

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case "NOTIFICATION_SET":
            return action.data
        case "NOTIFICATION_CLEAR":
            return initialState
        default:
            return state
    }
}

export const setNotification = (data, timeout) => {
    return async (dispatch) => {
        dispatch({
            type: "NOTIFICATION_SET",
            data
        })

        setTimeout(() => {
            dispatch(clearNotification())
        }, timeout * 1000)
    }
}

export const clearNotification = () => {
    return async (dispatch) => {
        dispatch({
            type: "NOTIFICATION_CLEAR"
        })
    }
}

export default notificationReducer