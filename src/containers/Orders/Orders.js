import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {
    state = {
        orders: [],
        loading: false,
    };
    componentDidMount() {
        
    }

    render() {
        return (
            <div>
                {this.state.loading ? (
                    <Spinner />
                ) : (
                    this.state.orders.map((order) => (
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
// export default Orders;
export default withErrorHandler(Orders, axios);
