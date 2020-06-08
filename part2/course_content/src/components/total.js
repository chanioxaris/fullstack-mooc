import React from 'react';

const Total = ({ parts }) => {
    const totalExercises = parts.reduce((s, p) => s + p.exercises, 0)

    return (
        <p><b>Total of {totalExercises} exercises</b></p>
    )
}

export default Total