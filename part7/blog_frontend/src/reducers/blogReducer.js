const initialState = []

const blogReducer = (state = initialState, action) => {
    switch (action.type) {
        case "BLOG_INIT":
            return action.data
        case "BLOG_NEW":
            return state.concat(action.data)
        case "BLOG_UPDATE":
            return state.map(blog => blog.id === action.data.id ? action.data : blog)
        case "BLOG_DELETE":
            return state.filter(blog => blog.id !== action.data)
        default:
            return state
    }
}

export const initBlog = (data) => {
    return async (dispatch) => {
        dispatch({
            type: "BLOG_INIT",
            data
        })
    }
}

export const createBlog = (data) => {
    return async (dispatch) => {
        dispatch({
            type: "BLOG_NEW",
            data
        })
    }
}

export const updateBlog = (data) => {
    return async (dispatch) => {
        dispatch({
            type: "BLOG_UPDATE",
            data
        })
    }
}

export const deleteBlog = (data) => {
    return async (dispatch) => {
        dispatch({
            type: "BLOG_DELETE",
            data
        })
    }
}

export default blogReducer