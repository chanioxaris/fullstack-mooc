const _ = require("lodash")

const dummy = () => {
    return 1
}

const totalLikes = blogs => {
    const reducer = (sumLikes, blog) => {
        return sumLikes + blog.likes
    }

    return  blogs.length === 0 ?
        0
        :
        blogs.reduce(reducer, 0)
}

const favoriteBlog = blogs => {
    const reducer = (max, blog) => max.likes > blog.likes ? max : blog

    return blogs.length === 0 ?
        null
        :
        blogs.reduce(reducer)
}

const mostBlogs = blogs => {
    const result = _(blogs)
        .groupBy("author")
        .map((v, author) => ({
            author: author,
            blogs: v.length
        }))
        .value()

    return blogs.length === 0 ?
        null
        :
        _.maxBy(result, "blogs")
}

const mostLikes = blogs => {
    const result = _(blogs)
        .groupBy("author")
        .map((v, author) => ({
            author: author,
            likes: _.sumBy(v, "likes")
        }))
        .value()

    return blogs.length === 0 ?
        null
        :
        _.maxBy(result, "likes")
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }