import * as actionTypes from "../actions/actionTypes";
const initialState = {
    orders: [],
    loading: false,
    purchased: false,
    error: null,
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
        case actionTypes.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case actionTypes.PURCHASE_BURGER_START:
            return {
                ...state,
                loading: true,
            };
        case actionTypes.PURCHASE_INIT: //TODO:fixed this
            console.log("state", state);
            return {
                ...state,
                purchased: false,
            };
        case actionTypes.FETCH_ORDERS_START:
            return {
                ...state,
                loading: true,
            };
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.orders,
            };
        case actionTypes.FETCH_ORDERS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error,
            };

        default:
            return state;
    }
};
export default orderReducer;
