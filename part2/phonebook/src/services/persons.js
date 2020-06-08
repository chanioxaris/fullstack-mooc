import axios from 'axios'

const baseURL = "http://localhost:3001/persons"

const getAll = () => {
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}

const createObject = newObject => {
    const request = axios.post(baseURL, newObject)
    return request.then(response => response.data)
}

const updateObject = updateObject => {
    const request = axios.put(`${baseURL}/${updateObject.id}`, updateObject)
    return request.then(response => response.data)
}

const deleteObject = id => {
    const request = axios.delete(`${baseURL}/${id}`)
    return request.then(response => response.data)
}

export default { getAll, createObject, updateObject, deleteObject }