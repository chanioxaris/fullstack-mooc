const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const logger = require("./utils/logger")
const config = require("./utils/config")
const middleware = require("./utils/middleware")
const blogsRouter = require("./controllers/blogs")
const usersRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")

logger.info("Connecting to MongoDB")

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        logger.info("Connected to MongoDB")
    })
    .catch(error => {
        logger.error("Failed to connect to MongoDB", error.message)
    })

const app = express()


app.use(cors())
app.use(express.json())

app.use("/api/blogs", middleware.tokenExtractor)

app.use("/api/blogs", blogsRouter)
app.use("/api/login", loginRouter)
app.use("/api/users", usersRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app