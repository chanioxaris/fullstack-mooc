const express = require('express')
const morgan = require('morgan')

const app = express()
const PORT = process.env.PORT || 3001

morgan.token("postBody", function (request, response) {
    if (request.method === "POST") {
        return JSON.stringify(request.body)
    }

    return null
})

app.use(express.static("build"))
app.use(express.json())
app.use(morgan(":method :url :status :req[content-length] - :response-time ms :postBody"))

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    }
]

app.get("/api/persons", (request, response) => {
    return response.json(persons)
})

app.get("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (!person) {
        return response.status(404).end()
    }

    return response.json(person)
})

app.post("/api/persons", (request, response) => {
    const newPerson = request.body
    newPerson.id = Math.floor(Math.random() * 100)

    if (!newPerson.name) {
        const resp = {error: "name is missing"}
        return response.status(400).json(resp)
    }

    if (!newPerson.number) {
        const resp = {error: "number is missing"}
        return response.status(400).json(resp)
    }

    if (persons.some(person => person.name === newPerson.name)) {
        const resp = {error: "name must be unique"}
        return response.status(400).json(resp)
    }

    persons = persons.concat(newPerson)

    return response.status(201).json(newPerson)
})

app.delete("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    return response.status(204).end()
})

app.get("/info", (request, response) => {
    const personsLen = persons.length
    const dateNow = new Date().toString()

    return response.end(`
        <div>
            <p>Phonebook has info for ${personsLen} people</p>
            <p>${dateNow}</p>
        </div>
    `)
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))