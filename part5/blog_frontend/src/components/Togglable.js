import React, { useState, useImperativeHandle } from "react"
import Button from "./Button"
import PropTypes from "prop-types"

const Togglable = React.forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    const handleVisible = () => setVisible(!visible)

    const hideWhenVisible = { display: visible ? "none" : "" }
    const showWhenVisible = { display: visible ? "" : "none" }

    useImperativeHandle(ref, () => {
        return {
            handleVisible
        }
    })

    return (
        <div>
            <div style={hideWhenVisible}>
                <Button
                    onClick={handleVisible}
                    text={props.buttonLabel}
                />
            </div>
            <div style={showWhenVisible}>
                {props.children}

                <Button
                    onClick={handleVisible}
                    text="Cancel"
                />
            </div>
        </div>
    )
})

Togglable.displayName = "Togglable"

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}

export default Togglable