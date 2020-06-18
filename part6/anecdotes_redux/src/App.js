import React, { useEffect } from 'react';
import { useDispatch } from "react-redux"
import { initAnecdote } from "./reducers/anecdoteReducer"
import AnecdoteForm from "./components/AnecdoteForm"
import Anecdotes from "./components/Anecdotes"
import Notification from "./components/Notification"
import Filter from "./components/Filter"

const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initAnecdote())
    }, [dispatch])

    return (
        <div>
            <Notification />

            <h2>Anecdotes</h2>
            <Filter />

            <Anecdotes />

            <AnecdoteForm />
        </div>
    )
}

export default App
