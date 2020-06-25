import React from "react"
import PropTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import blogService from "../services/blogs"
import { deleteBlog, updateBlog } from "../reducers/blogReducer"
import { setNotificationError, setNotificationSuccess } from "../reducers/notificationReducer"
import Button from "./Button"
import BlogCommentForm from "./BlogCommentForm"

const Blog = ({ blog }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.user)

    if (!blog) {
        return null
    }

    const handleLike = async () => {
        blog.likes = blog.likes + 1

        try {
            const data = await blogService.updateObject(blog)

            dispatch(updateBlog(data))
            dispatch(setNotificationSuccess(`Blog ${data.title} updated`, 3))
        } catch (exception) {
            dispatch(setNotificationError("Failed to update blog", 3))
        }
    }
    const handleDelete = async () => {
        try {
            if (!window.confirm(`Delete ${blog.title} by ${blog.author}`)) {
                return
            }

            await blogService.deleteObject(blog.id)

            dispatch(deleteBlog(blog.id))
            dispatch(setNotificationSuccess(`Blog ${blog.title} deleted`, 3))
        } catch (exception) {
            dispatch(setNotificationError("Failed to delete blog", 3))
        }

        history.push("/")
    }

    return (
        <div>
            <h2>{blog.title}</h2>
            <a href={blog.url}>{blog.url} </a>
            <div>
                {blog.likes}

                <Button
                    onClick={handleLike}
                    text="Like"
                />
            </div>

            <p>Added by {blog.user.name}</p>

            <h3>Comments</h3>

            <BlogCommentForm
                blog={blog}
            />

            {
                blog.comments.map(comment =>
                    <li key={comment}>
                        {comment}
                    </li>
                )
            }

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
    )
}

Blog.propTypes = {
    blog: PropTypes.object,
}

export default Blog