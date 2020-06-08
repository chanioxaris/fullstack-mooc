import React from 'react';

const PersonForm = (props) => {
    const {onSubmit, onChangeName, valueName, onChangeNumber, valueNumber} = props

    return (
        <form onSubmit={onSubmit}>
            <div>
                Name <input onChange={onChangeName} value={valueName} />
            </div>
            <div>
                Number <input onChange={onChangeNumber} value={valueNumber} />
            </div>
            <div>
                <button type="submit">Add</button>
            </div>
        </form>
    )
}

export default PersonForm