const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const User = require("../models/user")
const testHelper = require("./test_helper")

const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})

    for (let user of testHelper.initialUsers) {
        let userObject = new User(user)
        await userObject.save()
    }
})

describe("get initial users", () => {
    test("users are returned as json", async () => {
        await api.get("/api/users")
            .expect(200)
            .expect("Content-Type", /application\/json/)
    })

    test("all users are returned", async () => {
        const response = await api.get("/api/users")

        expect(response.body).toHaveLength(testHelper.initialUsers.length)
    })

    test("specific user is within the returned users", async () => {
        const response = await api.get("/api/users")

        const usernames = response.body.map(user => user.username)
        const randomUserIndex = testHelper.randomIndex(testHelper.initialUsers)

        expect(usernames).toContain(testHelper.initialUsers[randomUserIndex].username)
    })

    test("user unique identifier named id", async () => {
        const response = await api.get("/api/users")

        response.body.forEach(user => {
            expect(user.id).toBeDefined()
            expect(user._id).not.toBeDefined()
        })
    })
})

describe("add new user", () => {
    test("success with status code 201 if valid data", async () => {
        const newUser = {
            username: "usertest",
            password: "passwordtest",
            name: "Test User"
        }

        await api.post("/api/users")
            .send(newUser)
            .expect(201)
            .expect("Content-Type", /application\/json/)

        const usersDB = await testHelper.getUsersDB()
        expect(usersDB).toHaveLength(testHelper.initialUsers.length + 1)

        const usernames = usersDB.map(user => user.username)
        expect(usernames).toContain(newUser.username)
    })

    test("fails with status code 400 if username is missing", async () => {
        const newUser = {
            password: "passwordtest",
            name: "Test User"
        }

        await api.post("/api/users")
            .send(newUser)
            .expect(400)
            .expect("Content-Type", /application\/json/)
    })

    test("fails with status code 400 if password is missing", async () => {
        const newUser = {
            username: "usertest",
            name: "Test User"
        }

        await api.post("/api/users")
            .send(newUser)
            .expect(400)
            .expect("Content-Type", /application\/json/)
    })

    test("fails with status code 400 if username is invalid", async () => {
        const newUser = {
            username: "us",
            password: "passwordtest",
            name: "Test User"
        }

        await api.post("/api/users")
            .send(newUser)
            .expect(400)
            .expect("Content-Type", /application\/json/)
    })

    test("fails with status code 400 if password is invalid", async () => {
        const newUser = {
            username: "usertest",
            password: "pa",
            name: "Test User"
        }

        await api.post("/api/users")
            .send(newUser)
            .expect(400)
            .expect("Content-Type", /application\/json/)
    })
})

afterAll(() => {
    mongoose.connection.close()
})