import React from "react"
import { useDispatch } from "react-redux"
import { updateBlog } from "../reducers/blogReducer"
import { setNotificationError, setNotificationSuccess } from "../reducers/notificationReducer"
import blogService from "../services/blogs"
import { useField } from "../hooks"

const BlogCommentForm = ({ blog }) => {
    const dispatch = useDispatch()
    const comment = useField("text")

    const handleSubmit = async (e) => {
        e.preventDefault()

        blog.comments = blog.comments.concat(comment.input.value)
        comment.reset()

        try {
            const data = await blogService.updateObject(blog)

            dispatch(updateBlog(data))
            dispatch(setNotificationSuccess(`Blog ${data.title} updated`, 3))
        } catch (exception) {
            dispatch(setNotificationError("Failed to update blog", 3))
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input {...comment.input} />
            </div>

            <div>
                <button id="add-comment-button" type="submit">Add comment</button>
            </div>
        </form>
    )
}

export default BlogCommentForm