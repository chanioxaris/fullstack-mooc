import React from "react"
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useField } from "../hooks"
import loginService from "../services/login"
import { setUser } from "../reducers/userReducer"
import { setNotificationError } from "../reducers/notificationReducer"
import {FormControl, FormLabel, TextField, Button, Grid } from "@material-ui/core"

const LoginForm = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const username = useField("text")
    const password = useField("password")


    const handleLogin = async (e) => {
        e.preventDefault()

        const credentials = {
            username: username.input.value,
            password: password.input.value
        }

        username.reset()
        password.reset()

        try {
            const data = await loginService.login(credentials)

            window.localStorage.setItem("token", data.token)
            window.localStorage.setItem("user", JSON.stringify(data.user))
            dispatch(setUser(data.user))
        } catch (exception) {
            dispatch(setNotificationError("Invalid username or password", 3))
        }

        history.push("/")
    }

    return (
        <Grid container justify="center" style={{"marginTop": 100}}>
            <form onSubmit={handleLogin}>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Login to application</FormLabel>

                    <TextField
                        required
                        id="username"
                        label="Username"
                        {...username.input}
                    />
                    <TextField
                        required
                        id="password"
                        label="Password"
                        {...password.input}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        style={{"marginTop": 20}}
                    >
                        Login
                    </Button>
                </FormControl>
            </form>
        </Grid>
    )
}

export default LoginForm