const initialState = JSON.parse(window.localStorage.getItem("user"))

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "USER_SET":
            return action.data
        case "USER_CLEAR":
            return initialState
        default:
            return state
    }
}

export const setUser = (data) => {
    return async (dispatch) => {
        dispatch({
            type: "USER_SET",
            data
        })
    }
}

export const clearUser = () => {
    return async (dispatch) => {
        dispatch({
            type: "USER_CLEAR",
        })
    }
}

export default userReducer