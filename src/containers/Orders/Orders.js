import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
import { connect } from "react-redux";
import * as actions from "../../store/actions";

class Orders extends Component {
    componentWillMount() {
        this.props.onFetchOrders();
        console.log(this.props.orders, this.props.orders === []);
    }

    render() {
        return (
            <div>
                {this.props.loading ? (
                    <Spinner />
                ) : (
                    this.props.orders.map((order) => (
                        <Order
                            key={order.id}
                            price={order.price}
                            ingredients={order.ingredients}
                        />
                    ))
                )}
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        error: state.order.error,
        loading: state.order.loading,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders()),
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(Orders, axios));
