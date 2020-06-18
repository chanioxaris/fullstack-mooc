import React from "react"
import { connect } from "react-redux"
import { setFilter } from "../reducers/filterReducer"

const Filter = (props) => {
    const handleChange = (e) => {
        const value = e.target.value
        props.setFilter(value)
    }

    const style = {
        marginBottom: 20
    }

    return (
        <div style={style}>
            Filter
            <input
                onChange={handleChange}
                value={props.filter}
            />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        filter: state.filter
    }
}

const mapDispatchToProps = {
    setFilter
}

const ConnectedFilter = connect(
    mapStateToProps,
    mapDispatchToProps
)(Filter)

export default ConnectedFilter