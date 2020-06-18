import deepFreeze from "deep-freeze"
import counterReducer from "./reducer"

describe("unicafe reducer", () => {
    const initialState = {
        good: 0,
        neutral: 0,
        bad: 0
    }

    test("should return a proper initial state when called with undefined state", () => {
        const action = {
            type: "INVALID"
        }

        const newState = counterReducer(undefined, action)
        expect(newState).toEqual(initialState)
    })

    test("good is incremented", () => {
        const state = initialState
        const action = {
            type: "GOOD"
        }

        deepFreeze(state)
        const newState = counterReducer(state, action)
        expect(newState).toEqual({
            good: 1,
            neutral: 0,
            bad: 0
        })
    })

    test("neutral is incremented", () => {
        const state = initialState
        const action = {
            type: "NEUTRAL"
        }

        deepFreeze(state)
        const newState = counterReducer(state, action)
        expect(newState).toEqual({
            good: 0,
            neutral: 1,
            bad: 0
        })
    })

    test("bad is incremented", () => {
        const state = initialState
        const action = {
            type: "BAD"
        }

        deepFreeze(state)
        const newState = counterReducer(state, action)
        expect(newState).toEqual({
            good: 0,
            neutral: 0,
            bad: 1
        })
    })

    test("reset is working", () => {
        const state = initialState
        const action = {
            type: "RESET"
        }

        deepFreeze(state)
        let newState = counterReducer(state, {
            type: "GOOD"
        })
        newState = counterReducer(newState, {
            type: "BAD"
        })
        newState = counterReducer(newState, {
            type: "BAD"
        })

        newState = counterReducer(newState, action)
        expect(newState).toEqual(initialState)
    })
})