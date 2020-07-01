import React, { useEffect, useState } from "react"
import { useMutation } from "@apollo/client"
import { LOGIN } from "../queries"

const LoginForm = ({ setToken, onError }) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [login, result] = useMutation(LOGIN, {
        onError: (error => {
            onError(error.graphQLErrors[0].message)
        })
    })

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value

            setToken(token)
            localStorage.setItem("token", token)
        }
    }, [result.data]) // eslint-disable-line

    const handleLogin = (e) => {
        e.preventDefault()

        login({ variables: { username, password }})

        setUsername("")
        setPassword("")
    }

    return (
        <div>
            <form onSubmit={handleLogin}>
                <div>
                    Username
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    Password
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div>
                    <button id="login-button" type="submit">Login</button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm