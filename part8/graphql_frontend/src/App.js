import React, { useState } from "react"
import { useApolloClient, useQuery, useSubscription } from "@apollo/client"
import { BOOK_ADDED, LIST_AUTHORS, LIST_BOOKS } from "./queries"
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import Notify from "./components/Notify"
import LoginForm from "./components/LoginForm"
import BookRecommendations from "./components/BookRecommendations"

const App = () => {
    const [page, setPage] = useState("authors")
    const [notification, setNotification] = useState(null)
    const [token, setToken] = useState(null)

    const client = useApolloClient()

    const resultListAuthors = useQuery(LIST_AUTHORS)
    const resultListBooks = useQuery(LIST_BOOKS)

    const updateCacheWith = (addedBook) => {
        const includedIn = (set, object) => set.map(p => p.id).includes(object.id)

        const dataInStore = client.readQuery({ query: LIST_BOOKS })
        if (!includedIn(dataInStore.allBooks, addedBook)) {
            client.writeQuery({
                query: LIST_BOOKS,
                data: { allBooks: dataInStore.allBooks.concat(addedBook)}
            })
        }
    }

    useSubscription(BOOK_ADDED, {
        onSubscriptionData: ({ subscriptionData }) => {
            const addedBook = subscriptionData.data.bookAdded
            setNotification({message: `New book ${addedBook.title} added`, isError: false})
            setTimeout(() => {
                setNotification(null)
            }, 5000)

            updateCacheWith(addedBook)
        }
    })

    const handleOnError = (message) => {
        setNotification({ isError: true, message })
        setTimeout(() => {
            setNotification(null)
        }, 5000)
    }
    const handleLogout = () => {
        setToken(null)
        localStorage.clear()
        client.resetStore()
    }

    if (resultListAuthors.loading || resultListBooks.loading) {
        return <div>Loading...</div>
    }

    if (!token) {
        return (
            <div>
                <Notify
                    notification={notification}
                />

                <h2>Login</h2>

                <LoginForm
                    setToken={setToken}
                    onError={handleOnError}
                />
            </div>
        )
    }

    return (
        <div>
            <div>
                <button onClick={() => setPage("authors")}>Authors</button>
                <button onClick={() => setPage("books")}>Books</button>
                <button onClick={() => setPage("addBook")}>Add book</button>
                <button onClick={() => setPage("recommendations")}>Recommendations</button>
                <button onClick={handleLogout}>Logout</button>
            </div>

            <Notify
                notification={notification}
            />
            
            <Authors
                show={page === "authors"}
                authors={resultListAuthors.data.allAuthors}
                onError={handleOnError}
            />

            <Books
                show={page === "books"}
                books={resultListBooks.data.allBooks}
            />

            <NewBook
                show={page === "addBook"}
                onError={handleOnError}
                updateCacheWith={updateCacheWith}
            />

            <BookRecommendations
                show={page === "recommendations"}
            />
        </div>
    )
}

export default App