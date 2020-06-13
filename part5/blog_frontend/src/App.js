import React, { useState, useEffect } from "react"
import blogService from "./services/blogs"
import loginService from "./services/login"
import Blogs from "./components/Blogs"
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogForm"
import Notification from "./components/Notification"
import Button from "./components/Button"
import Togglable from "./components/Togglable"

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [loggedIn, setLoggedIn] = useState(false)
    const [notification, setNotification] = useState({ message: "" })

    useEffect(() => {
        blogService.getAll()
            .then(data => {
                setBlogs(data)
            })
    }, [])

    const handleLogin = async (credentials) => {
        try {
            const data = await loginService.login(credentials)

            window.localStorage.setItem("token", data.token)
            window.localStorage.setItem("user", JSON.stringify(data.user))
            setLoggedIn(true)
        } catch (exception) {
            setNotification({
                message: "Invalid username or password",
                is_error: true
            })

            setTimeout(() => {
                setNotification({ message: "" })
            }, 3000)
        }
    }
    const handleLogout = () => {
        window.localStorage.clear()
        setLoggedIn(false)
    }
    const handleCreateBlog = async (newBlog) => {
        try {
            blogFormRef.current.handleVisible()
            const data = await blogService.createObject(newBlog)

            setBlogs(blogs.concat(data))

            setNotification({
                message: `New blog added ${newBlog.title} ${newBlog.author}`,
                is_error: false
            })

            setTimeout(() => {
                setNotification({ message: "" })
            }, 3000)
        } catch (exception) {
            setNotification({
                message: "Failed to create blog",
                is_error: true
            })

            setTimeout(() => {
                setNotification({ message: "" })
            }, 3000)
        }
    }
    const handleUpdateBlog = async (updateBlog) => {
        try {
            const data = await blogService.updateObject(updateBlog)

            setBlogs(blogs.map(blog => blog.id === updateBlog.id ? data : blog))

            setNotification({
                message: `Blog ${data.title} updated`,
                is_error: false
            })

            setTimeout(() => {
                setNotification({ message: "" })
            }, 3000)
        } catch (exception) {
            setNotification({
                message: "Failed to update blog",
                is_error: true
            })

            setTimeout(() => {
                setNotification({ message: "" })
            }, 3000)
        }
    }
    const handleDeleteBlog = async (deletedBlog) => {
        try {
            if (!window.confirm(`Delete ${deletedBlog.title} by ${deletedBlog.author}`)) {
                return
            }

            await blogService.deleteObject(deletedBlog.id)

            setBlogs(blogs.filter(blog => blog.id !== deletedBlog.id))

            setNotification({
                message: `Blog ${deletedBlog.title} deleted`,
                is_error: false
            })

            setTimeout(() => {
                setNotification({ message: "" })
            }, 3000)
        } catch (exception) {
            setNotification({
                message: "Failed to delete blog",
                is_error: true
            })

            setTimeout(() => {
                setNotification({ message: "" })
            }, 3000)
        }
    }

    const blogFormRef = React.createRef()

    return (
        <>
            <Notification
                message={notification.message}
                isError={notification.is_error}
            />

            {!loggedIn && !localStorage.getItem("token") ?
                <div>
                    <LoginForm
                        onSubmit={handleLogin}
                    />
                </div>
                :
                <div>
                    <h2>Blogs</h2>

                    <p>{JSON.parse(localStorage.getItem("user")).username} logged in</p>

                    <Button
                        onClick={handleLogout}
                        text="Logout"
                    />

                    <Togglable buttonLabel="New blog" ref={blogFormRef}>
                        <BlogForm
                            onSubmit={handleCreateBlog}
                        />
                    </Togglable>

                    <Blogs
                        blogs={blogs}
                        user={JSON.parse(localStorage.getItem("user"))}
                        onUpdate={handleUpdateBlog}
                        onDelete={handleDeleteBlog}
                    />
                </div>
            }
        </>
    )
}

export default App
