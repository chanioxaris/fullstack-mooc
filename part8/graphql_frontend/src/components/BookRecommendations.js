import React, { useEffect, useState } from "react"
import { useLazyQuery, useQuery } from "@apollo/client"
import { LIST_BOOKS_GENRE, ME } from "../queries"

const BookRecommendations = ({ show }) => {
    const [recommendedBooks, setRecommendedBooks] = useState([])
    const [favoriteGenre, setFavoriteGenre] = useState("")

    const resultMe = useQuery(ME)
    const [getListBooksGenre, resultListBooksGenre] = useLazyQuery(LIST_BOOKS_GENRE)

    useEffect(() => {
        if (resultMe.data) {
            const genre = resultMe.data.me.favoriteGenre

            setFavoriteGenre(genre)
            getListBooksGenre({ variables: { genre: genre }})

            if (resultListBooksGenre.data) {
                setRecommendedBooks(resultListBooksGenre.data.allBooks)
            }
        }
    }, [resultMe, resultListBooksGenre.data]) // eslint-disable-line

    if (!show) {
        return null
    }

    return (
        <div>
            <h2>Recommendations</h2>

            <p>Books of your favorite genre <b>{favoriteGenre}</b></p>

            <table>
                <tbody>
                <tr>
                    <th></th>
                    <th>
                        Author
                    </th>
                    <th>
                        Published
                    </th>
                </tr>
                {recommendedBooks.map(book =>
                        <tr key={book.title}>
                            <td>{book.title}</td>
                            <td>{book.author.name}</td>
                            <td>{book.published}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default BookRecommendations