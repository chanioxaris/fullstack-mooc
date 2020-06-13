describe("Blog app", function() {
    const mockUsers = [
        {
            username: "cypress-1",
            password: "test"
        },
        {
            username: "cypress-2",
            password: "test"
        }
    ]

    const mockBlogs = [
        {
            title: "cypress-title-1",
            author: "cypress-author-1",
            url: "cypress-url-1",
            likes: Math.floor(Math.random() * 100)
        },
        {
            title: "cypress-title-2",
            author: "cypress-author-2",
            url: "cypress-url-2",
            likes: Math.floor(Math.random() * 100)
        },
        {
            title: "cypress-title-3",
            author: "cypress-author-3",
            url: "cypress-url-4",
            likes: Math.floor(Math.random() * 100)
        },
        {
            title: "cypress-title-4",
            author: "cypress-author-4",
            url: "cypress-url-4",
            likes: Math.floor(Math.random() * 100)
        }
    ]

    beforeEach(function () {
        cy.request("POST", "http://localhost:3001/api/tests/reset")

        mockUsers.forEach(mockUser => {
            cy.request("POST", "http://localhost:3001/api/users", mockUser)
        })

        cy.visit("http://localhost:3000")
    })

    it("Login form is shown", function () {
        cy.contains("Login to application")
        cy.contains("Name")
        cy.contains("Password")
        cy.contains("Login")
    })

    describe("Login", function () {
        it("success with correct credentials", function () {
            const randomUserIndex = Math.floor(Math.random() * mockUsers.length)
            const randomUser = mockUsers[randomUserIndex]

            cy.get("#username").type(randomUser.username)
            cy.get("#password").type(randomUser.password)
            cy.get("#login-button").click()

            cy.contains(`${randomUser.username} logged in`)
            cy.contains("Logout")
        })

        it("fails with wrong credentials", function () {
            cy.get("#username").type("username")
            cy.get("#password").type("password")
            cy.get("#login-button").click()

            cy.get("#error-notification")
                .contains("Invalid username or password")
                .should("have.css", "color", "rgb(255, 0, 0)")

            cy.get("html")
                .should("not.contain", "username logged in")
        })
    })

    describe("When logged in", function () {
        let randomLoggedUserIndex
        let randomLoggedUser

        beforeEach(function () {
            randomLoggedUserIndex = Math.floor(Math.random() * mockUsers.length)
            randomLoggedUser = mockUsers[randomLoggedUserIndex]

            cy.login(randomLoggedUser)
        })

        it("can create a new blog", function () {
            const randomBlogIndex = Math.floor(Math.random() * mockBlogs.length)
            const randomBlog = mockBlogs[randomBlogIndex]

            cy.contains("Blogs")
            cy.contains("New blog").click()

            cy.contains("Create new blog")
            cy.get("#title").type(randomBlog.title)
            cy.get("#author").type(randomBlog.author)
            cy.get("#url").type(randomBlog.url)
            cy.get("#create-button").click()

            cy.get("#success-notification")
                .contains(`New blog added ${randomBlog.title} ${randomBlog.author}`)
                .should("have.css", "color", "rgb(0, 128, 0)")

            cy.contains(randomBlog.title)
            cy.contains(randomBlog.author)

            cy.contains("View").click()
            cy.contains(randomBlog.url)
            cy.contains(0)
            cy.contains("Like")
            cy.contains("Remove")
        })

        describe("and a blog exists", function () {
            let randomBlog

            beforeEach(function () {
                const randomBlogIndex = Math.floor(Math.random() * mockBlogs.length)
                randomBlog = mockBlogs[randomBlogIndex]

                cy.createBlog(randomBlog)
            })

            it("a user can like a blog", function () {
                cy.contains("View").click()
                cy.contains("Like").click()

                cy.get("#success-notification")
                    .contains(`Blog ${randomBlog.title} updated`)
                    .should("have.css", "color", "rgb(0, 128, 0)")

                cy.contains(randomBlog.likes + 1)
            })

            it("user who created it can deleted it", function () {
                cy.contains("View").click()
                cy.contains("Remove").click()
                cy.get("#success-notification")
                    .contains(`Blog ${randomBlog.title} deleted`)
                    .should("have.css", "color", "rgb(0, 128, 0)")

                cy.get("html")
                    .should("not.contain", randomBlog.title)
                    .and("not.contain", randomBlog.author)
            })

            it("user who didn't created it can not delete it", function () {
                let randomUserIndex
                let randomNotLoggedUser

                do {
                    randomUserIndex = Math.floor(Math.random() * mockUsers.length)
                    randomNotLoggedUser = mockUsers[randomUserIndex]
                }while (randomUserIndex === randomLoggedUserIndex)

                cy.contains("Logout").click()
                cy.login(randomNotLoggedUser)

                cy.contains("View").click()
                cy.get("html")
                    .should("not.contain", "Remove")
            })
        })
        describe("and several blogs exist", function () {
            beforeEach(function () {
                mockBlogs.forEach(mockBlog => {
                    cy.createBlog(mockBlog)
                })
            })

            it("are ordered according to likes", function () {
                cy.get(".defaultContent")
                    .should("have.length", mockBlogs.length)
                    .each(div => {
                        cy.wrap(div).contains("View").click()
                    })

                let likes = []
                cy.get(".expandLikes")
                    .should("have.length", mockBlogs.length)
                    .each(like => {
                        likes.push(like.text())
                    })

                cy.wrap(likes).should("equal", likes.sort())
            })
        })
    })
})