import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import classes from "./Checkout.css";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
    state = {
        ingredients: {
            salad: 0,
            meat: 0,
            cheese: 0,
            bacon: 0,
        },
    };
    onCheckoutCanceled = () => {
        this.props.history.goBack();
    };
    onCheckoutContinued = () => {
        this.props.history.replace("/checkout/contact-data");
    };
    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for (let param of query.entries()) {
            ingredients[param[0]] = +param[1];
        }
        this.setState({ ingredients: ingredients });
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    onCheckoutCanceled={this.onCheckoutCanceled}
                    onCheckoutContinued={this.onCheckoutContinued}
                    ingredients={this.state.ingredients}
                />
                <Route
                    path={this.props.match.path + "/contact-data"}
                    component={ContactData}
                />
            </div>
        );
    }
}

export default Checkout;
