import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";
export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENTS,
        ingredientName: name,
    };
};
export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENTS,
        ingredientName: name,
    };
};
export const setIngredient = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients,
    };
};
export const fetchIngredientsFailed = (err) => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED,
        error: err,
    };
};
export const initIngredient = () => (dispatch) => {
    console.log("initIngridients");
    axios
        .get("/ingredients.json")
        .then((res) => {
            console.log("redux init: ", res.data);
            dispatch(setIngredient(res.data)); //TODO:make it work and implement
        })
        .catch((err) => {
            console.log(err);
            dispatch(fetchIngredientsFailed(err));
        });
};
