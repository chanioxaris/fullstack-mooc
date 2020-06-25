const initialState ={
    message: "",
    isError: false
}

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case "NOTIFICATION_SET_SUCCESS":
            return {message: action.data, isError: false}
        case "NOTIFICATION_SET_ERROR":
            return {message: action.data, isError: true}
        case "NOTIFICATION_CLEAR":
            return initialState
        default:
            return state
    }
}

export const setNotificationSuccess = (data, timeout) => {
    return async (dispatch) => {
        dispatch({
            type: "NOTIFICATION_SET_SUCCESS",
            data
        })

        setTimeout(() => {
            dispatch(clearNotification())
        }, timeout * 1000)
    }
}

export const setNotificationError = (data, timeout) => {
    return async (dispatch) => {
        dispatch({
            type: "NOTIFICATION_SET_ERROR",
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