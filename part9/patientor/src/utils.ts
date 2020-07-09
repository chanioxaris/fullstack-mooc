import { Entry } from "./types";

/**
 * Helper function for exhaustive type checking
 */
export const assertNever = (value: Entry): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};