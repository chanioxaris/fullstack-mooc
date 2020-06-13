import React, { useState } from "react"
import Button from "./Button"
import PropTypes from "prop-types"

const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
}

const Blog = ({ blog, user, onUpdate, onDelete }) => {
    const [visible, setVisible] = useState(false)

    const handleVisible = () => setVisible(!visible)
    const handleLike = () => {
        blog.likes = blog.likes + 1
        onUpdate(blog)
    }
    const handleDelete = () => {
        onDelete(blog)
    }

    const hideWhenVisible = { display: visible ? "none" : "" }
    const showWhenVisible = { display: visible ? "" : "none" }

    return (
        <div style={blogStyle}>
            <div style={hideWhenVisible} className="defaultContent">
                <Button
                    onClick={handleVisible}
                    text="View"
                />

                <p className="defaultTitle">{blog.title}</p>
                <p className="defaultAuthor">{blog.author}</p>
            </div>
            <div style={showWhenVisible} className="expandContent">
                <Button
                    onClick={handleVisible}
                    text="Hide"
                />

                <p className="expandTitle">{blog.title}</p>
                <p className="expandAuthor">{blog.author}</p>
                <p className="expandUrl">{blog.url}</p>
                <p className="expandLikes">{blog.likes}</p>

                <Button
                    onClick={handleLike}
                    text="Like"
                />

                {
                    user.id === blog.user.id ?
                        <Button
                            onClick={handleDelete}
                            text="Remove"
                        />
                        :
                        null
                }
            </div>
        </div>
    )
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
}

export default Blog