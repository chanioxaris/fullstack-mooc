const initialState = ""

const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FILTER_SET":
            return action.data
        default:
            return state
    }
}

export const setFilter = (data) => {
    return ({
        type: "FILTER_SET",
        data
    })
}

export default filterReducer