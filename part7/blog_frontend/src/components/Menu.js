import React from "react"
import { Link, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { AppBar, Toolbar, IconButton } from "@material-ui/core"
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { clearUser } from "../reducers/userReducer"

const linkStyle = {
    paddingRight: 10,
    color: "#FFFFFF",
    textDecoration: "none"
}

const Menu = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.user)

    const handleLogout = () => {
        window.localStorage.clear()
        dispatch(clearUser())

        history.push("/")
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Link style={linkStyle} to="/">Blogs</Link>
                <Link style={linkStyle} to="/create">Create blog</Link>
                <Link style={linkStyle} to="/users">Users</Link>

                <div style={{"position": "fixed", "right": 0}}>
                    {user.name}
                    <IconButton onClick={handleLogout}>
                        <ExitToAppIcon />
                    </IconButton>
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default Menu