import React from "react"

const BookGenreFilters = ({ setFilterGenre }) => {
    return (
        <div style={{ paddingTop: 20 }}>
            <button onClick={() => setFilterGenre("refactoring")}>Refactoring</button>
            <button onClick={() => setFilterGenre("agile")}>Agile</button>
            <button onClick={() => setFilterGenre("patterns")}>Patterns</button>
            <button onClick={() => setFilterGenre("design")}>Design</button>
            <button onClick={() => setFilterGenre("crime")}>Crime</button>
            <button onClick={() => setFilterGenre("classic")}>Classic</button>
            <button onClick={() => setFilterGenre(null)}>All genres</button>
        </div>
    )
}

export default BookGenreFilters