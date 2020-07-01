import React from "react"
import SetBirthYear from "./SetBirthYear"

const Authors = ({ show, authors, onError }) => {
    if (!show) {
        return null
    }

    return (
        <div>
            <h2>Authors</h2>
            <table>
                <tbody>
                <tr>
                    <th></th>
                    <th>
                        Born
                    </th>
                    <th>
                        Books
                    </th>
                </tr>
                {authors.map(author =>
                    <tr key={author.name}>
                        <td>{author.name}</td>
                        <td>{author.born}</td>
                        <td>{author.bookCount}</td>
                    </tr>
                )}
                </tbody>
            </table>

            <h2>Set birth year</h2>
            <SetBirthYear
                authors={authors}
                onError={onError}
            />
        </div>
    )
}

export default Authors