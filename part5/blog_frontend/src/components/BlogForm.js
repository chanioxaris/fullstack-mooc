import React, { useState } from "react"
import PropTypes from "prop-types"

const BlogForm = ({ onSubmit }) => {
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [url, setURL] = useState("")

    const handleTitleChange = (e) => setTitle(e.target.value)
    const handleAuthorChange = (e) => setAuthor(e.target.value)
    const handleURLChange = (e) => setURL(e.target.value)

    const handleCreate = (e) => {
        e.preventDefault()

        const newBlog = {
            title,
            author,
            url
        }

        onSubmit(newBlog)

        setTitle("")
        setAuthor("")
        setURL("")
    }

    return (
        <div className="divForm">
            <h2>Create new blog</h2>

            <form onSubmit={handleCreate}>
                <div>
                    Title
                    <input
                        id="title"
                        name="Title"
                        type="text"
                        onChange={handleTitleChange}
                        value={title}
                    />
                </div>
                <div>
                    Author
                    <input
                        id="author"
                        name="Author"
                        type="text"
                        onChange={handleAuthorChange}
                        value={author}
                    />
                </div>
                <div>
                    URL
                    <input
                        id="url"
                        name="URL"
                        type="text"
                        onChange={handleURLChange}
                        value={url}
                    />
                </div>
                <div>
                    <button id="create-button" type="submit">Create</button>
                </div>
            </form>
        </div>
    )
}

BlogForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
}

export default BlogForm