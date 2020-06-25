const usersRoute = require("express").Router()
require("express-async-errors")
const bcrypt = require("bcrypt")
const User = require("../models/user")

usersRoute.get("/", async (request, response) => {
    const result = await User.find({})
        .populate("blogs")

    response.json(result.map(user => user.toJSON()))
})

usersRoute.post("/", async (request, response) => {
    const body = request.body

    if (body.password === undefined || body.password.length < 3) {
        return response.status(400).json({ error: "invalid password" })
    }

    const newUser = new User(request.body)
    newUser.password = await bcrypt.hash(body.password, 10)

    const result = await newUser.save()
    response.status(201).json(result.toJSON())
})

module.exports = usersRoute
