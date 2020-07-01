const { ApolloServer, gql, UserInputError, AuthenticationError } = require("apollo-server")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const { PubSub } = require("apollo-server")

const Book = require("./models/book")
const Author = require("./models/author")
const User = require("./models/user")

const MONGODB_URI = "mongodb+srv://mooc-fullstack:2tzx2cp03tocJCvU@cluster0-2pev1.mongodb.net/graphql?retryWrites=true&w=majority"
const JWT_SECRET = "super_secret"

const pubSub = new PubSub()

mongoose.set("useFindAndModify", true)


console.log("connecting to", MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("connected to MongoDB"))
    .catch((e) => console.log("failed to connect to MongoDB", e.message))


const typeDefs = gql`
    type Author {
        id: ID!
        name: String!
        born: Int
        bookCount: Int
    }
    
    type Book {
        id: ID!
        title: String!
        published: Int!
        author: Author!
        genres: [String!]!
    }
    
    type User {
        id: ID!
        username: String!
        favoriteGenre: String!
    }
    
    type Token {
        value: String!
    }
    
    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book!]
        allAuthors: [Author!]!
        me: User
    }
    
    type Mutation {
        addBook(
            title: String!
            author: String!
            published: Int!
            genres: [String!]!
        ): Book
        editAuthor(
            name: String!
            setBornTo: Int!
        ): Author
        createUser(
            username: String!
            favoriteGenre: String!
        ): User
        login(
            username: String!
            password: String!
        ): Token
    }
    
    type Subscription {
        bookAdded: Book!
    }
`

const resolvers = {
    Query: {
        bookCount: () => Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments(),
        allBooks: async (root, args) => {
            if (args.genre) {
                return Book.find({ "genres": { $in: args.genre }}).populate("author")
            }

            return Book.find({}).populate("author")
        },
        allAuthors: () => Author.find({}),
        me: (root, args, context) => context.currentUser
    },
    Mutation: {
        addBook: async (root, args, context) => {
            let book = new Book({ ...args })
            const currentUser = context.currentUser

            if (!currentUser) {
                throw new AuthenticationError("not authenticated")
            }

            try {
                let author = await Author.findOne({ name: args.author })

                if (!author) {
                    const newAuthor = new Author({ name: args.author, bookCount: 1 })
                    author = await newAuthor.save()
                } else {
                    author.bookCount += 1
                    await author.save()
                }

                book.author = author._id

                await book.save()
            } catch (e) {
                throw new UserInputError(e.message, {
                    invalidArgs: args
                })
            }

            await pubSub.publish("BOOK_ADDED", { bookAdded: book })

            return book
        },
        editAuthor: async (root, args, context) => {
            const currentUser = context.currentUser

            if (!currentUser) {
                throw new AuthenticationError("not authenticated")
            }

            try {
                const author = await Author.findOne({ name: args.name })
                if (!author) {
                    return null
                }

                author.born = args.setBornTo
                return author.save()
            } catch (e) {
                throw new UserInputError(e.message, {
                    invalidArgs: args
                })
            }
        },
        createUser: (root, args) => {
            const user = new User({
                username: args.username ,
                favoriteGenre: args.favoriteGenre
            })

            try {
                return user.save()
            } catch (e) {
                throw new UserInputError(e.message, {
                    invalidArgs: args
                })
            }
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })

            if (!user || args.password !== "password") {
                throw new UserInputError("invalid credentials")
            }

            const userForToken = {
                id: user._id,
                username: user.username
            }

            return { value: jwt.sign(userForToken, JWT_SECRET)}
        }
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubSub.asyncIterator(["BOOK_ADDED"])
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null

        if (auth && auth.toLowerCase().startsWith("bearer ")) {
            const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)

            const currentUser = await User.findById(decodedToken.id)
            return { currentUser }
        }
    }
})

server.listen().then(({ url, subscriptionsUrl }) => {
    console.log(`Server ready at ${url}`)
    console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})