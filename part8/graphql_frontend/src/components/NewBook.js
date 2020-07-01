import React, { useState } from "react"
import { useMutation } from "@apollo/client"
import { CREATE_BOOK, LIST_AUTHORS, LIST_BOOKS } from "../queries"

const NewBook = ({ show, onError, updateCacheWith }) => {
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [published, setPublished] = useState("")
    const [genre, setGenre] = useState("")
    const [genres, setGenres] = useState([])

    const [ createBook ] = useMutation(CREATE_BOOK, {
        refetchQueries: [ { query: LIST_AUTHORS }, { query: LIST_BOOKS } ],
        onError: (error => {
            onError(error.graphQLErrors[0].message)
        }),
        update: (store, response) => {
            updateCacheWith(response.data.addBook)
        }
    })

    if (!show) {
        return null
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        await createBook({ variables: {
            published: Number(published),
            title,
            author,
            genres
        }})

        setTitle("")
        setAuthor("")
        setPublished("")
        setGenre("")
        setGenres([])
    }

    const handleAddGenre = () => {
        setGenres(genres.concat(genre))
        setGenre("")
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    Title
                    <input
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    Author
                    <input
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    Published
                    <input
                        type="number"
                        value={published}
                        onChange={({ target }) => setPublished(target.value)}
                    />
                </div>
                <div>
                    <input
                        value={genre}
                        onChange={({ target }) => setGenre(target.value)}
                    />
                    <button onClick={handleAddGenre} type="button">add genre</button>
                </div>
                <div>
                    Genres: {genres.join(" ")}
                </div>
                <button type="submit">Create book</button>
            </form>
        </div>
    )
}

export default NewBook