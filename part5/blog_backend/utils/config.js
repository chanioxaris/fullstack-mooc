let NODE_ENV = process.env.NODE_ENV
let PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI
let JWT_SECRET = process.env.JWT_SECRET

if (NODE_ENV === "test") {
    MONGODB_URI = process.env.TEST_MONGODB_URI
}

module.exports = { NODE_ENV, PORT, MONGODB_URI, JWT_SECRET }