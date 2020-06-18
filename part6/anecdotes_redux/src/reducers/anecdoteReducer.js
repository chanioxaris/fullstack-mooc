import anecdoteService from "../services/anecdotes"

const initialState = []

const anecdoteReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ANECDOTE_INIT":
            return action.data
        case "ANECDOTE_NEW":
            return state.concat(action.data)
        case "ANECDOTE_VOTE":
            const id = action.data.id
            return state.map(anecdote => anecdote.id === id ? action.data : anecdote)
        default:
            return state
    }
}

export const initAnecdote = () => {
    return async (dispatch) => {
        const data = await anecdoteService.getAll()
        dispatch({
            type: "ANECDOTE_INIT",
            data
        })
    }
}

export const createAnecdote = (content) => {
    return async (dispatch) => {
        const data = await anecdoteService.createObject(content)
        dispatch({
            type: "ANECDOTE_NEW",
            data
        })
    }
}

export const voteAnecdote = (anecdote) => {
    return async (dispatch) => {
        const data = await anecdoteService.updateObject(anecdote)
        dispatch({
            type: "ANECDOTE_VOTE",
            data
        })
    }
}

export default anecdoteReducer