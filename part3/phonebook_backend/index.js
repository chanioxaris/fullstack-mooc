const express = require("express")
const morgan = require("morgan")
const Person = require("./models/person")

const app = express()
const PORT = process.env.PORT || 3001

morgan.token("postBody", function (request) {
    if (request.method === "POST") {
        return JSON.stringify(request.body)
    }

    return null
})

app.use(express.static("build"))
app.use(express.json())
app.use(morgan(":method :url :status :req[content-length] - :response-time ms :postBody"))


app.get("/api/persons", (request, response, next) => {
    Person.find({})
        .then(result => {
            response.json(result)
        })
        .catch(error => next(error))
})

app.get("/api/persons/:id", (request, response, next) => {
    const id = request.params.id

    Person.findById(id)
        .then(result => {
            if (!result) {
                return response.status(404).end()
            }

            response.json(result)
        })
        .catch(error => next(error))
})

app.post("/api/persons", (request, response, next) => {
    const body = request.body
    const newPerson = new Person({
        name: body.name,
        number: body.number
    })

    if (!newPerson.name) {
        return response.status(400).json({ error: "name missing" })
    }

    if (!newPerson.number) {
        return response.status(400).json({ error: "number missing" })
    }

    newPerson.save()
        .then(result => {
            response.status(201).json(result)
        })
        .catch(error => next(error))
})

app.put("/api/persons/:id", (request, response, next) => {
    const id = request.params.id
    const body = request.body

    const updatedPerson = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(id, updatedPerson, { new: true, runValidators: true, context: "query" })
        .then(result => {
            response.json(result)
        })
        .catch(error => next(error))
})

app.delete("/api/persons/:id", (request, response, next) => {
    const id = request.params.id

    Person.findByIdAndDelete(id)
        .then(() => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.get("/info", (request, response, next) => {
    Person.find({})
        .then(result => {
            response.end(`
                <div>
                    <p>Phonebook has info for ${result.length} people</p>
                    <p>${new Date().toString()}</p>
                </div>
            `)
        })
        .catch(error => next(error))
})

// Handler of requests with unknown endpoint
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" })
}

app.use(unknownEndpoint)

// Handler of requests with result to error
const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === "CastError") {
        return response.status(400).json({ error: "malformed id" })
    } else if (error.name === "ValidationError") {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)


app.listen(PORT, () => console.log(`Server running on port ${PORT}`))