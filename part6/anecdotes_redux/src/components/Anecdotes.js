import React from "react"
import { connect } from "react-redux"
import Anecdote from "./Anecdote"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const Anecdotes = (props) => {
    const handleVote = (anecdote) => {
        const updateAnecdote = {...anecdote, votes: anecdote.votes + 1}

        props.voteAnecdote(updateAnecdote)
        props.setNotification(`You voted ${anecdote.content}`, 5)
    }

    return (
       props.anecdotes.map(anecdote =>
            <Anecdote
                key={anecdote.id}
                anecdote={anecdote}
                handleVote={() => handleVote(anecdote)}
            />
        )
    )
}

const mapStateToProps = (state) => {
    let anecdotes = state.anecdotes.sort((a, b) => a.votes < b.votes ? 1 : -1)
    const filter = state.filter

    if (filter) {
        anecdotes = anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    }

    return {
        anecdotes,
        filter
    }
}

const mapDispatchToProps = {
    voteAnecdote,
    setNotification
}

const ConnectedAnecdotes = connect(
    mapStateToProps,
    mapDispatchToProps
    )(Anecdotes)

export default ConnectedAnecdotes