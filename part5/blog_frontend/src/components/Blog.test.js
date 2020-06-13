import React from "react"
import { ObjectID } from "bson"
import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent } from "@testing-library/react"
import Blog from "./Blog"

describe("<Blog />", () => {
    let component
    const mockUser = {
        id: new ObjectID()
    }
    const mockBlog = {
        id: new ObjectID(),
        title: "Title",
        author: "Author",
        url: "Url",
        likes: 0,
        user: mockUser
    }
    const mockOnUpdate = jest.fn()
    const mockOnDelete = jest.fn()

    beforeEach(() => {
        component = render(
            <Blog
                blog={mockBlog}
                user={mockUser}
                onUpdate={mockOnUpdate}
                onDelete={mockOnDelete}
            />
        )
    })

    test("renders by default only title and author", () => {
        const divExpand = component.container.querySelector(".expandContent")
        expect(divExpand).toHaveStyle("display: none")

        const elementDefaultTitle = component.container.querySelector(".defaultTitle")
        expect(elementDefaultTitle).toBeVisible()

        const elementDefaultAuthor = component.container.querySelector(".defaultAuthor")
        expect(elementDefaultAuthor).toBeVisible()

        const buttonView = component.getByText("View")
        expect(buttonView).toBeDefined()
        expect(buttonView).toBeVisible()
    })

    test("renders complete blog when View clicked", () => {
        const buttonView = component.getByText("View")
        fireEvent.click(buttonView)

        const divDefault = component.container.querySelector(".defaultContent")
        expect(divDefault).toHaveStyle("display: none")

        const elementExpandTitle = component.container.querySelector(".expandTitle")
        expect(elementExpandTitle).toBeVisible()

        const elementExpandAuthor = component.container.querySelector(".expandAuthor")
        expect(elementExpandAuthor).toBeVisible()

        const elementExpandUrl = component.container.querySelector(".expandUrl")
        expect(elementExpandUrl).toBeVisible()

        const elementExpandLikes = component.container.querySelector(".expandLikes")
        expect(elementExpandLikes).toBeVisible()

        const buttonHide = component.getByText("Hide")
        expect(buttonHide).toBeDefined()
        expect(buttonHide).toBeVisible()
    })

    test("clicking the button calls event handler correctly", () => {
        const buttonLike = component.getByText("Like")
        fireEvent.click(buttonLike)
        fireEvent.click(buttonLike)

        expect(mockOnUpdate.mock.calls).toHaveLength(2)
    })
})