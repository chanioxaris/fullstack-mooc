import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ onClick, text }) => {
    return (
        <button onClick={onClick}>
            {text}
        </button>
    )
}

const Statistic = ({ text, value }) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}

const Statistics = ({ good, neutral, bad }) => {
    if (good === 0 && neutral === 0 && bad === 0) {
        return (
            <p>No feedback given</p>
        )
    }

    const all = good + neutral + bad
    const average = (good - bad) / all
    const positive = (good / all) * 100

    return (
        <table>
            <tbody>
                <Statistic text="Good" value={good} />
                <Statistic text="Neutral" value={neutral} />
                <Statistic text="Bad" value={bad} />
                <Statistic text="All" value={all} />
                <Statistic text="Average" value={average} />
                <Statistic text="Positive" value={positive} />
            </tbody>
        </table>
    )
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleGood = () => setGood(good + 1)
    const handleNeutral = () => setNeutral(neutral + 1)
    const handlerBad = () => setBad(bad + 1)

    return (
        <div>
            <h1>Give feedback</h1>
            <Button onClick={handleGood} text="Good" />
            <Button onClick={handleNeutral} text="Neutral" />
            <Button onClick={handlerBad} text="Bad" />

            <h1>Statistics</h1>
            <Statistics good={good} neutral={neutral} bad={bad}/>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
