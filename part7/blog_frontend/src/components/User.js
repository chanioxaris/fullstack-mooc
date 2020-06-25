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
                                // secondary={secondary ? 'Secondary text' : null}
                            />
                        </ListItem>


                    // <li key={blog.id}>
                    //     {blog.title}
                    // </li>
                    )
                }


                {/*{generate(*/}
                {/*    <ListItem>*/}
                {/*        <ListItemIcon>*/}
                {/*            <FolderIcon />*/}
                {/*        </ListItemIcon>*/}
                {/*        <ListItemText*/}
                {/*            primary="Single-line item"*/}
                {/*            secondary={secondary ? 'Secondary text' : null}*/}
                {/*        />*/}
                {/*    </ListItem>*/}
                {/*)}*/}
            </List>

            {/*<ul>*/}
            {/*    {userBlogs.map(blog =>*/}
            {/*        <li key={blog.id}>*/}
            {/*            {blog.title}*/}
            {/*        </li>*/}
            {/*    )}*/}
            {/*</ul>*/}
        </div>
    )
}

User.propTypes = {
    userBlogs: PropTypes.array
}

export default User