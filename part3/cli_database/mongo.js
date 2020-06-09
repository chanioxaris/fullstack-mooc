const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log("Please provide password as argument: node mongo.js <password>")
    process.exit(1)
}

const password = process.argv[2]
const mongoURI = `mongodb+srv://mooc-fullstack:${password}@cluster0-2pev1.mongodb.net/persons?retryWrites=true&w=majority`

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
    id: Number,
    name: String,
    number: String
})

const Person = mongoose.model("Person", personSchema)

if (process.argv.length === 3) {
    console.log("Phonebook:")
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })

        mongoose.connection.close()
    })
} else {
    const name = process.argv[3]
    const number = process.argv[4]

    const newPerson = new Person({
        name: name,
        number: number
    })

    newPerson.save().then(result => {
        console.log(`Added ${newPerson.name} ${newPerson.number} to phonebook`)
        mongoose.connection.close()
    })
}