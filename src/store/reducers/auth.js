import * as actionTypes from "../actions/actionTypes";
const initialState = {
    token: null,
    userId: null,
    loading: false,
    error: null,
    authRedirect: "/",
};
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return {
                ...state,
                error: null,
                loading: true,
            };
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                error: null,
                token: action.idToken,
                userId: action.userId,
                loading: false,
            };
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                error: action.error,
                loading: false,
            };
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                error: null,
                token: null,
                userId: null,
            };
        case actionTypes.SET_AUTH_REDIRECT:
            return {
                ...state,
                authRedirect: action.path,
            };

        default:
            return state;
    }
};
export default authReducer;
