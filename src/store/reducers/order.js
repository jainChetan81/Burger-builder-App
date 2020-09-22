import * as actionTypes from "../actions/actionTypes";
const initialState = {
    orders: [],
    loading: false,
    purchased: false,
};
const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId,
            };
            return {
                ...state,
                loading: false,
                purchased: true,
                orders: state.orders.concat(newOrder), //TODO:try using spread operator here
            };
        case actionTypes.PURCHASE_BURGER_FAILS:
            console.log("purchase burger fails");
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case actionTypes.PURCHASE_BURGER_START:
            console.log("action PURCHASE_BURGER_START", state);
            return {
                ...state,
                loading: true,
            };
        case actionTypes.PURCHASE_INIT: //TODO:fixed this
            return {
                ...state,
                purchased: false,
            };

        default:
            return state;
    }
};
export default orderReducer;
