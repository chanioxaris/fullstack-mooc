import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Switch, Route, useRouteMatch } from "react-router-dom"
import { initBlog } from "./reducers/blogReducer"
import blogService from "./services/blogs"
import Blogs from "./components/Blogs"
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogForm"
import Notification from "./components/Notification"
import Users from "./components/Users"
import User from "./components/User"
import Blog from "./components/Blog"
import Menu from "./components/Menu"

const App = () => {
    const dispatch = useDispatch()
    const blogs = useSelector(state => state.blogs)

    useEffect(() => {
        blogService.getAll()
            .then(data => {
                dispatch(initBlog(data))
            })
    }, [dispatch])

    const matchUser = useRouteMatch("/users/:id")
    const userBlogs = matchUser ?
        blogs.filter(blog => blog.user.id === matchUser.params.id)
        :
        null

    const matchBlog = useRouteMatch("/blogs/:id")
    const blog = matchBlog ?
        blogs.find(blog => blog.id === matchBlog.params.id)
        :
        null

    return (
        <>
            {!localStorage.getItem("token") ?
                <div>
                    <Notification/>

                    <LoginForm />
                </div>
                :
                <div>
                    <Menu />

                    <Notification/>

                    <h2>Blogs</h2>

                    <Switch>
                        <Route path="/users/:id">
                            <User
                                userBlogs={userBlogs}
                            />
                        </Route>
                        <Route path="/users">
                            <Users />
                        </Route>
                        <Route path="/blogs/:id">
                            <Blog
                                blog={blog}
                            />
                        </Route>
                        <Route path="/create">
                            <BlogForm />
                        </Route>
                        <Route path="/">
                            <Blogs />
                        </Route>
                    </Switch>
                </div>
            }
        </>
    )
}

export default App
