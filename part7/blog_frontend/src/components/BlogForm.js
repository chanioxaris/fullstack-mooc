import React from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import blogService from "../services/blogs"
import { createBlog } from "../reducers/blogReducer"
import { setNotificationError, setNotificationSuccess } from "../reducers/notificationReducer"
import { useField } from "../hooks"
import { Button, FormControl, FormLabel, Grid, TextField } from "@material-ui/core"

const BlogForm = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const title = useField("text")
    const author = useField("text")
    const url = useField("text")

    const handleCreate = async (e) => {
        e.preventDefault()

        const newBlog = {
            title: title.input.value,
            author: author.input.value,
            url: url.input.value
        }

        title.reset()
        author.reset()
        url.reset()

        try {
            const data = await blogService.createObject(newBlog)

            dispatch(createBlog(data))
            dispatch(setNotificationSuccess(`New blog added ${newBlog.title} ${newBlog.author}`, 3))
        } catch (exception) {
            dispatch(setNotificationError("Failed to create blog", 3))
        }

        history.push("/")
    }

    return (
        <div className="divForm">
            <Grid container justify="center">
                <form onSubmit={handleCreate}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Create new blog</FormLabel>

                        <TextField
                            required
                            id="title"
                            label="Title"
                            {...title.input}
                        />
                        <TextField
                            required
                            id="author"
                            label="Author"
                            {...author.input}
                        />
                        <TextField
                            required
                            id="url"
                            label="URL"
                            {...url.input}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            style={{"marginTop": 20}}
                        >
                            Create
                        </Button>
                    </FormControl>
                </form>
            </Grid>
        </div>
    )
}

export default BlogForm