const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const Blog = require("../models/blog")
const User = require("../models/user")
const testHelper = require("./test_helper")

const api = supertest(app)
let token
let user

beforeEach(async () => {
    await User.deleteMany({})

    const blogTestUser = {
        username: "blog-test",
        password: "password"
    }

    const userResponse = await api.post("/api/users")
        .send(blogTestUser)

    user = userResponse.body

    await Blog.deleteMany({})

    for (let blog of testHelper.initialBlogs) {
        let blogObject = new Blog(blog)
        blogObject.user = user.id

        await blogObject.save()
    }

    const blogResponse = await api.post("/api/login")
        .send(blogTestUser)

    token = `Bearer ${blogResponse.body.token}`
})

describe("get initial blogs", () => {
    test("blogs are returned as json", async () => {
        await api.get("/api/blogs")
            .expect(200)
            .expect("Content-Type", /application\/json/)
    })

    test("all blogs are returned", async () => {
        const response = await api.get("/api/blogs")

        expect(response.body).toHaveLength(testHelper.initialBlogs.length)
    })

    test("specific blog is within the returned blogs", async () => {
        const response = await api.get("/api/blogs")

        const titles = response.body.map(blog => blog.title)
        const randomBlogIndex = testHelper.randomIndex(testHelper.initialBlogs)

        expect(titles).toContain(testHelper.initialBlogs[randomBlogIndex].title)
    })

    test("blog unique identifier named id", async () => {
        const response = await api.get("/api/blogs")

        response.body.forEach(blog => {
            expect(blog.id).toBeDefined()
            expect(blog._id).not.toBeDefined()
        })
    })
})

describe("add new blog", () => {
    test("success with status code 201 if valid data", async () => {
        const newBlog = {
            title: "Blog from test",
            author: "Tester",
            url: "random url",
            likes: 6,
        }

        await api.post("/api/blogs")
            .send(newBlog)
            .set("Authorization", token)
            .expect(201)
            .expect("Content-Type", /application\/json/)

        const blogsDB = await testHelper.getBlogsDB()
        expect(blogsDB).toHaveLength(testHelper.initialBlogs.length + 1)

        const titles = blogsDB.map(blog => blog.title)
        expect(titles).toContain(newBlog.title)
    })

    test("success with status code 201 with default likes value", async () => {
        const newBlog = {
            title: "Blog from test",
            author: "Tester",
            url: "random url"
        }

        const response = await api.post("/api/blogs")
            .send(newBlog)
            .set("Authorization", token)
            .expect(201)
            .expect("Content-Type", /application\/json/)

        expect(response.body.likes).toBe(0)
    })

    test("fails with status code 400 if title is missing", async () => {
        const newBlog = {
            author: "Tester",
            url: "random url",
            likes: 5
        }

        await api.post("/api/blogs")
            .send(newBlog)
            .set("Authorization", token)
            .expect(400)
            .expect("Content-Type", /application\/json/)
    })

    test("fails with status code 400 if url is missing", async () => {
        const newBlog = {
            title: "Blog from test",
            author: "Tester",
            likes: 5
        }

        await api.post("/api/blogs")
            .send(newBlog)
            .set("Authorization", token)
            .expect(400)
            .expect("Content-Type", /application\/json/)
    })

    test("fails with status code 401 if token is missing", async () => {
        const newBlog = {
            title: "Blog from test",
            author: "Tester",
            likes: 5
        }

        await api.post("/api/blogs")
            .send(newBlog)
            .expect(401)
    })
})

describe("update blog likes", () => {
    test("success with status code 200 if valid data", async () => {
        const blogsDBBefore = await testHelper.getBlogsDB()
        const randomBlogIndex = testHelper.randomIndex(testHelper.initialBlogs)
        const blogToUpdate = blogsDBBefore[randomBlogIndex]
        const expectedBlog = {
            id: blogToUpdate.id,
            title: blogToUpdate.title,
            author: blogToUpdate.author,
            url: blogToUpdate.url,
            likes: 1000
        }

        const response = await api.put(`/api/blogs/${blogToUpdate.id}`)
            .send({ likes: 1000 })
            .expect(200)

        expectedBlog.user = user.id
        expect(response.body).toEqual(expectedBlog)

        const blogsDBAfter = await testHelper.getBlogsDB()
        expect(blogsDBAfter).toHaveLength(testHelper.initialBlogs.length)
    })

    test("fails with status code 400 if malformed id", async () => {
        const malformedID = 123

        await api.put(`/api/blogs/${malformedID}`)
            .send({ likes: 1000 })
            .expect(400)

        const blogsDBAfter = await testHelper.getBlogsDB()
        expect(blogsDBAfter).toHaveLength(testHelper.initialBlogs.length)
    })
})

describe("delete blog", () => {
    test("success with status code 204 if id is valid", async () => {
        const blogsDBBefore = await testHelper.getBlogsDB()
        const randomBlogIndex = testHelper.randomIndex(testHelper.initialBlogs)
        const blogToDelete = blogsDBBefore[randomBlogIndex]

        await api.delete(`/api/blogs/${blogToDelete.id}`)
            .set("Authorization", token)
            .expect(204)

        const blogsDBAfter = await testHelper.getBlogsDB()
        expect(blogsDBAfter).toHaveLength(testHelper.initialBlogs.length - 1)

        const titles = blogsDBAfter.map(blog => blog.title)
        expect(titles).not.toContain(blogToDelete.title)
    })

    test("fails with status code 400 if malformed id", async () => {
        const malformedID = 123

        await api.delete(`/api/blogs/${malformedID}`)
            .set("Authorization", token)
            .expect(400)

        const blogsDBAfter = await testHelper.getBlogsDB()
        expect(blogsDBAfter).toHaveLength(testHelper.initialBlogs.length)
    })

    test("fails with status code 204 if token is missing", async () => {
        const blogsDBBefore = await testHelper.getBlogsDB()
        const randomBlogIndex = testHelper.randomIndex(testHelper.initialBlogs)
        const blogToDelete = blogsDBBefore[randomBlogIndex]

        await api.delete(`/api/blogs/${blogToDelete.id}`)
            .expect(401)
    })
})

afterAll(() => {
    mongoose.connection.close()
})