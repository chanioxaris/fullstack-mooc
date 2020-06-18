import axios from "axios"

const baseURL = "http://localhost:3001/anecdotes"

const getAll = async () => {
    const response = await axios.get(baseURL)
    return response.data
}

const createObject = async (anecdote) => {
    const response = await axios.post(baseURL, anecdote)
    return response.data
}

const updateObject = async (anecdote) => {
    const response = await axios.put(`${baseURL}/${anecdote.id}`, anecdote)
    return response.data
}

export default { getAll, createObject, updateObject }