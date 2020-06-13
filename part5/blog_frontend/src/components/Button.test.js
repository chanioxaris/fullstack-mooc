import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent } from "@testing-library/react"
import Button from "./Button"

describe("<Button />", () => {
    let component
    const mockText = "test"
    const mockOnClick = jest.fn()

    beforeEach(() => {
        component = render(
            <Button
                text={mockText}
                onClick={mockOnClick}
            />
        )
    })

    test("renders correctly", () => {
        const button = component.getByText(mockText)
        expect(button).toBeDefined()
        expect(button).toBeVisible()
    })

    test("clicking the button calls event handler correctly", () => {
        const button = component.getByText(mockText)
        fireEvent.click(button)

        expect(mockOnClick.mock.calls).toHaveLength(1)
    })
})