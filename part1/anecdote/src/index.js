import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const Button = ({ onClick, text }) => {
    return (
        <button onClick={onClick}>
            {text}
        </button>
    )
}

const DisplayAnecdote = ({ anecdote}) => <p>{anecdote}</p>

const DisplayAnecdoteVote = ({ vote }) => <p>Has {vote} votes</p>

const App = ({ anecdotes }) => {
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

    const handleNextAnecdote = () => {
        const randomAnecdote = Math.floor(Math.random() * anecdotes.length)

        return (
            setSelected(randomAnecdote)
        )
    }

    const handleVote = () => {
        const newVotes = [...votes]
        newVotes[selected] += 1
        setVotes(newVotes)
    }

    const anecdoteMostIndex = votes.indexOf(Math.max(...votes))

    return (
        <div>
            <h1>Anecdote of the day</h1>
            <DisplayAnecdote anecdote={anecdotes[selected]} />
            <DisplayAnecdoteVote vote={votes[selected]} />

            <Button onClick={handleVote} text="Vote" />
            <Button onClick={handleNextAnecdote} text="Next anecdote" />

            <h1>Anecdote with most votes</h1>
            <DisplayAnecdote anecdote={anecdotes[anecdoteMostIndex]} />
        </div>
    )
}

ReactDOM.render(<App anecdotes={anecdotes}/>, document.getElementById("root"));