import React from "react"
import Blog from "./Blog"
import PropTypes from "prop-types"

const Blogs = ({ blogs, user, onUpdate, onDelete }) => {
    return (
        blogs
            .sort((a, b) => (a.likes < b.likes) ? 1 : -1)
            .map(blog =>
                <Blog
                    key={blog.id}
                    blog={blog}
                    user={user}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                />
            )
    )
}

Blogs.propTypes = {
    blogs: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
}

export default Blogs