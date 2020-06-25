import React from "react"
import { useSelector } from "react-redux"
import _ from "lodash"
import { Link } from "react-router-dom"

const Users = () => {
    const blogs = useSelector(state => state.blogs)
    const users = _(blogs)
        .groupBy("user.name")
        .map((v, name) => ({
            id: v[0].user.id,
            name: name,
            blogs: v.length
        }))
        .value()

    return (
        <div>
            <h2>Users</h2>

            <table>
                <tbody>
                    <tr>
                        <td><b>Name</b></td>
                        <td><b>Blogs</b></td>
                    </tr>

                    {
                        users
                            .sort((a, b) => (a.blogs < b.blogs) ? 1 : -1)
                            .map(user =>
                                <tr key={user.id}>
                                    <td>
                                        <Link to={`/users/${user.id}`}>
                                            {user.name}
                                        </Link>
                                    </td>
                                    <td>{user.blogs}</td>
                                </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Users