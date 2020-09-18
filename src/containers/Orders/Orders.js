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
        axios
            .get("/orders.json")
            .then((res) => {
                let fetchOrders = [];
                for (let key in res.data) {
                    fetchOrders.push({ ...res.data[key], id: key });
                }
                this.setState({ loading: false, orders: fetchOrders });
            })
            .catch((err) => {
                this.setState({ loading: false });
            });
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
