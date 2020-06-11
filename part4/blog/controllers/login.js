const loginRouter = require("express").Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const User = require("../models/user")
const config = require("../utils/config")

loginRouter.post("/", async (request, response) => {
    const body = request.body

    const user = await User.findOne({ username: body.username })
    const isPasswordValid = user === null ?
        false
        :
        await bcrypt.compare(body.password, user.password)

    if (!(user && isPasswordValid)) {
        return response.status(401).json({ error: "invalid username or password" })
    }

    const token = {
        id: user._id,
        username: user.username
    }

    const signedToken = jwt.sign(token, config.JWT_SECRET)

    response.json({ token: signedToken })
})

module.exports = loginRouter
