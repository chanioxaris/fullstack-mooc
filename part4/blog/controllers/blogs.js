const blogsRouter = require("express").Router()
require("express-async-errors")
const Blog = require("../models/blog")
const User = require("../models/user")

blogsRouter.get("/", async (request, response) => {
    const result = await Blog.find({})
        .populate("user")

    response.json(result.map(blog => blog.toJSON()))
})

blogsRouter.post("/", async (request, response) => {
    const user = await User.findById(request.token.id)
    const newBlog = new Blog(request.body)
    newBlog.user = user._id

    const result = await newBlog.save()
    user.blogs = user.blogs.concat(result._id)
    await user.save()

    response.status(201).json(result.toJSON())
})

blogsRouter.put("/:id", async (request, response) => {
    const id = request.params.id
    const body = request.body

    const updatedBlog = {
        likes: body.likes
    }

    const result = await Blog.findByIdAndUpdate(id, updatedBlog, { new: true, runValidators: true, context: "query" })
    response.json(result.toJSON())
})

blogsRouter.delete("/:id", async (request, response) => {
    const id = request.params.id

    const blog = await Blog.findById(id)
    if (!blog) {
        return response.status(400).end()
    } else if (blog.user.toString() !== request.token.id) {
        return response.status(403).json({ error: "not allowed to delete specific blog" })
    }

    await Blog.findByIdAndRemove(id)
    response.status(204).end()
})

module.exports = blogsRouter