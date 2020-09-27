import authReducer from "./auth";
import * as actionTypes from "../actions/actionTypes";

describe("auth reducer", () => {
    it(" should return the initial state", () => {
        expect(authReducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirect: "/",
        });
    });
});
