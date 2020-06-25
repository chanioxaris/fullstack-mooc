import axios from "axios"

const baseURL = "/api/blogs"

const getAll = async () => {
    const response = await axios.get(baseURL)
    return response.data
}

const createObject = async (blog) => {
    const token = window.localStorage.getItem("token")

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(baseURL, blog, config)
    return response.data
}

const updateObject = async (blog) => {
    const response = await axios.put(`${baseURL}/${blog.id}`, blog)
    return response.data
}

const deleteObject = async (id) => {
    const token = window.localStorage.getItem("token")

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(`${baseURL}/${id}`, config)
    return response.data
}

export default { getAll, createObject, updateObject, deleteObject }

