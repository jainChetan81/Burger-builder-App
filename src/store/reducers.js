import * as actionTypes from "./actions";
const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0,
    },
    totalPrice: 4,
};
const ingredientPrices = {
    salad: 0.5,
    bacon: 0.7,
    meat: 1.3,
    cheese: 0.4,
};
const reducers = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]:
                        state.ingredients[action.ingredientName] + 1,
                },
                totalPrice:
                    state.totalPrice + ingredientPrices[action.ingredientName],
            };
        case actionTypes.REMOVE_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]:
                        state.ingredients[action.ingredientName] - 1,
                },
                totalPrice:
                    state.totalPrice - ingredientPrices[action.ingredientName],
            };

        default:
            return initialState;
    }
};
export default reducers;
