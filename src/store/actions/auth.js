import * as actionTypes from "./actionTypes";
import axios from "axios";
import { firebaseKey } from "../../key";
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    };
};
export const authSuccess = (idToken, localId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        userId: localId,
    };
};
export const authFail = (err) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: err,
    };
};
export const authLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("userId");
    return {
        type: actionTypes.AUTH_LOGOUT,
    };
};
export const checkAuthTimeout = (expiresIn) => {
    console.log("expiresIn", expiresIn);
    return (dispatch) => {
        setTimeout(() => {
            dispatch(authLogout());
        }, expiresIn * 1000);
    };
};
export const setAuthRedirect = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT,
        path: path,
    };
};
export const authCheckState = () => {
    return (dispatch) => {
        const token = localStorage.getItem("token");
        if (!token) dispatch(authLogout());
        else {
            const expirationDate = new Date(
                localStorage.getItem("expirationDate")
            );
            if (expirationDate < new Date()) dispatch(authLogout(token));
            else {
                const userId = localStorage.getItem("userId");
                dispatch(authSuccess(token, userId));
                dispatch(
                    checkAuthTimeout(
                        (expirationDate.getTime() - new Date().getTime()) / 1000
                    )
                );
            }
        }
    };
};

export const auth = (email, password, method) => (dispatch) => {
    dispatch(authStart());
    const authData = {
        email: email,
        password: password,
        returnSecureToken: true,
    };
    const urlAuth = "https://identitytoolkit.googleapis.com/v1/accounts:";
    let type = "signInWithPassword?key=";
    if (method) {
        type = "signUp?key=";
    }
    axios
        .post(
            `${urlAuth}${type}${firebaseKey}`,
            authData
        )
        .then((res) => {
            console.log("redux init: ", res.data);
            const expirationDate = new Date(
                new Date().getTime() + res.data.expiresIn * 1000
            );
            localStorage.setItem("token", res.data.idToken);
            localStorage.setItem("expirationDate", expirationDate);
            localStorage.setItem("userId", res.data.localId);
            dispatch(authSuccess(res.data.idToken, res.data.localId));
            dispatch(checkAuthTimeout(res.data.expiresIn));
        })
        .catch((err) => {
            console.log(err);
            dispatch(authFail(err.response.data.error));
        });
};
