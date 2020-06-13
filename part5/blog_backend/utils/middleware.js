const jwt = require("jsonwebtoken")
const logger = require("./logger")
const config = require("./config")

// Handler of requests with unknown endpoint
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" })
}

// Handler of requests with result to error
const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if (error.name === "CastError") {
        return response.status(400).json({ error: "malformed id" })
    } else if (error.name === "ValidationError") {
        return response.status(400).json({ error: error.message })
    } else if (error.name === "JsonWebTokenError") {
        return response.status(401).json({ error: "invalid token" })
    }

    next(error)
}

// Handler of requests to insert token from header to request
const tokenExtractor = (request, response, next) => {
    if (request.method === "GET" || request.method === "PUT") {
        return next()
    }

    const authorization = request.get("authorization")
    if (!authorization || !authorization.toLowerCase().startsWith("bearer ")) {
        return response.status(401).json({ error: "missing token" })
    }

    const tokenHeader = authorization.substring(7)
    const token = jwt.verify(tokenHeader, config.JWT_SECRET)
    if (!token.id || !token.username) {
        return response.status(401).json({ error: "invalid token" })
    }

    request.token = token

    next()
}

module.exports = {
    unknownEndpoint,
    errorHandler,
    tokenExtractor
}