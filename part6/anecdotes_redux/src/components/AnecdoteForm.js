import React from "react"
import { connect } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteForm = (props) => {
    const handleCreateAnecdote = async (e) => {
        e.preventDefault()

        const content = e.target.content.value
        e.target.content.value = ""

        const newAnecdote = {
            votes: 0,
            content
        }

        props.createAnecdote(newAnecdote)
        props.setNotification(`You created anecdote ${content}`, 5)
    }

    return (
        <div>
            <h2>Create new</h2>
            <form onSubmit={handleCreateAnecdote}>
                <div>
                    <input name="content" />
                </div>

                <button type="submit">Create</button>
            </form>
        </div>
    )
}

const mapDispatchToProps = {
    createAnecdote,
    setNotification
}

const ConnectedAnecdoteForm = connect(
    null,
    mapDispatchToProps
)(AnecdoteForm)

export default ConnectedAnecdoteForm