import React from "react"
import PropTypes from "prop-types"
import { List, ListItemIcon, ListItemText, ListItem } from "@material-ui/core"
import { DvrRounded } from "@material-ui/icons"

const User = ({ userBlogs }) => {
    if (userBlogs.length === 0 ) {
        return null
    }

    return (
        <div>
            <h2>{userBlogs[0].user.name}</h2>

            <h3>Added blogs</h3>

            <List dense={true}>
                {
                    userBlogs.map(blog =>
                        <ListItem key={blog.id}>
                            <ListItemIcon>
                                <DvrRounded />
                            </ListItemIcon>
                            <ListItemText
                                primary={blog.title}
                            />
                        </ListItem>
                    )
                }
            </List>
        </div>
    )
}

User.propTypes = {
    userBlogs: PropTypes.array
}

export default User