import React, { useState } from "react"
import PropTypes from "prop-types"

const LoginForm = ({ onSubmit }) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleUsernameChange = (e) => setUsername(e.target.value)
    const handlePasswordChange = (e) => setPassword(e.target.value)

    const handleLogin = (e) => {
        e.preventDefault()

        const credentials = {
            username,
            password
        }

        onSubmit(credentials)

        setUsername("")
        setPassword("")
    }

    return (
        <div>
            <h2>Login to application</h2>

            <form onSubmit={handleLogin}>
                <div>
                    Name
                    <input
                        id="username"
                        name="Username"
                        type="text"
                        onChange={handleUsernameChange}
                        value={username}
                    />
                </div>
                <div>
                    Password
                    <input
                        id="password"
                        name="Password"
                        type="password"
                        onChange={handlePasswordChange}
                        value={password}
                    />
                </div>

                <div>
                    <button id="login-button" type="submit">Login</button>
                </div>
            </form>
        </div>
    )
}

LoginForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
}

export default LoginForm