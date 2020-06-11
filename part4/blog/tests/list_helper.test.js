const listHelper = require("../utils/list_helper")
const testHelper = require("./test_helper")

test("dummy returns 1", () => {
    const result = listHelper.dummy()
    expect(result).toBe(1)
})

describe("total likes", () => {
    test("of empty list is zero", () => {
        const result = listHelper.totalLikes([])
        expect(result).toBe(0)
    })

    test("when list has only one blog equals the likes of that", () => {
        const result = listHelper.totalLikes(testHelper.initialBlogs.slice(0, 1))
        expect(result).toBe(7)
    })

    test("of a bigger list is calculated right", () => {
        const result = listHelper.totalLikes(testHelper.initialBlogs)
        expect(result).toBe(36)
    })
})

describe("favorite blog", () => {
    test("of empty list is null", () => {
        const result = listHelper.favoriteBlog([])
        expect(result).toBeNull()
    })

    test("when list has only one blog equals that", () => {
        const result = listHelper.favoriteBlog(testHelper.initialBlogs.slice(0, 1))
        expect(result).toEqual(testHelper.initialBlogs[0])
    })

    test("of a bigger list is calculated right", () => {
        const result = listHelper.favoriteBlog(testHelper.initialBlogs)
        expect(result).toEqual(testHelper.initialBlogs[2])
    })
})

describe("most blogs", () => {
    test("of empty list is null", () => {
        const result = listHelper.mostBlogs([])
        expect(result).toBeNull()
    })

    test("when list has only one blog equals that", () => {
        const result = listHelper.mostBlogs(testHelper.initialBlogs.slice(0, 1))
        expect(result).toEqual({ author: "Michael Chan", blogs: 1 })
    })

    test("of a bigger list is calculated right", () => {
        const result = listHelper.mostBlogs(testHelper.initialBlogs)
        expect(result).toEqual({ author: "Robert C. Martin", blogs: 3 })
    })
})

describe("most likes", () => {
    test("of empty list is null", () => {
        const result = listHelper.mostLikes([])
        expect(result).toBeNull()
    })

    test("when list has only one blog equals that", () => {
        const result = listHelper.mostLikes(testHelper.initialBlogs.slice(0, 1))
        expect(result).toEqual({ author: "Michael Chan", likes: 7 })
    })

    test("of a bigger list is calculated right", () => {
        const result = listHelper.mostLikes(testHelper.initialBlogs)
        expect(result).toEqual({ author: "Edsger W. Dijkstra", likes: 17 })
    })
})