import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent } from "@testing-library/react"
import BlogForm from "./BlogForm"

describe("<BlogForm />", () => {
    let component
    const mockBlog = {
        title: "Title",
        author: "Author",
        url: "Url",
    }
    const mockOnSubmit = jest.fn()

    beforeEach(() => {
        component = render(
            <BlogForm
                onSubmit={mockOnSubmit}
            />
        )
    })

    test("updates input fields and calls onSubmit with correct data", () => {
        const form = component.container.querySelector("form")
        const inputTitle = component.container.querySelector("#title")
        const inputAuthor = component.container.querySelector("#author")
        const inputUrl = component.container.querySelector("#url")

        fireEvent.change(inputTitle, {
            target: { value: mockBlog.title }
        })
        fireEvent.change(inputAuthor, {
            target: { value: mockBlog.author }
        })
        fireEvent.change(inputUrl, {
            target: { value: mockBlog.url }
        })
        fireEvent.submit(form)

        expect(mockOnSubmit.mock.calls).toHaveLength(1)
        expect(mockOnSubmit.mock.calls[0][0].title).toBe(mockBlog.title)
        expect(mockOnSubmit.mock.calls[0][0].author).toBe(mockBlog.author)
        expect(mockOnSubmit.mock.calls[0][0].url).toBe(mockBlog.url)
    })
})