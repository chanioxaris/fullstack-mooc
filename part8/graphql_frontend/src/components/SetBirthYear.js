import React, { useState } from "react"
import { useMutation } from "@apollo/client"
import { LIST_AUTHORS, UPDATE_AUTHOR_BIRTH_YEAR } from "../queries"

const SetBirthYear = ({ authors, onError }) => {
    const [name, setName] = useState("")
    const [born, setBorn] = useState("")

    const [ updateBirthYear ] = useMutation(UPDATE_AUTHOR_BIRTH_YEAR, {
        refetchQueries: [ { query: LIST_AUTHORS }],
        onError: (error => {
            onError(error.graphQLErrors[0].message)
        })
    })

    const handleUpdateBirthYear = async (e) => {
        e.preventDefault()

        await updateBirthYear({ variables: {
            born: Number(born),
            name
        }})

        setName("")
        setBorn("")
    }
    
    return (
        <div>
            <form onSubmit={handleUpdateBirthYear}>
                <div>
                    Name
                    <select onChange={(e) => setName(e.target.value)}>
                        {authors.map(author =>
                            <option key={author.name} value={author.name}>
                                {author.name}
                            </option>
                        )}
                    </select>
                </div>
                <div>
                    Born
                    <input
                        type="number"
                        value={born}
                        onChange={({ target }) => setBorn(target.value)}
                    />
                </div>
                <button type="submit">Update author</button>
            </form>
        </div>
    )
}

export default SetBirthYear