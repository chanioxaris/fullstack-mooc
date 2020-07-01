import React, { useState } from "react"
import BookGenreFilters from "./BookGenreFilters"

const Books = ({ show, books }) => {
    const [filterGenre, setFilterGenre] = useState(null)

    if (!show) {
        return null
    }

    return (
        <div>
            <h2>Books</h2>

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
                {books
                    .filter(book => filterGenre ? book.genres.includes(filterGenre) : book)
                    .map(book =>
                    <tr key={book.title}>
                        <td>{book.title}</td>
                        <td>{book.author.name}</td>
                        <td>{book.published}</td>
                    </tr>
                )}
                </tbody>
            </table>

            <BookGenreFilters
                setFilterGenre={setFilterGenre}
            />
        </div>
    )
}

export default Books