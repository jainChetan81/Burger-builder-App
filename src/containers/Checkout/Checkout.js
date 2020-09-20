import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";

class Checkout extends Component {
    onCheckoutCanceled = () => {
        this.props.history.goBack();
    };
    onCheckoutContinued = () => {
        this.props.history.replace("/checkout/contact-data");
    };
    // componentWillMount() {//todo:receiving url link queryParams
    //     const query = new URLSearchParams(this.props.location.search);
    //     let ingredients = {};
    //     let price = 0;
    //     for (let param of query.entries()) {
    //         if (param[0] === "price") {
    //             price = param[1];
    //         } else {
    //             ingredients[param[0]] = +param[1];
    //         }
    //     }
    //     this.setState({ ingredients: ingredients, totalPrice: price });
    // }

    render() {
        return (
            <div>
                <CheckoutSummary
                    onCheckoutCanceled={this.onCheckoutCanceled}
                    onCheckoutContinued={this.onCheckoutContinued}
                    ingredients={this.props.ings}
                />
                <Route
                    path={this.props.match.path + "/contact-data"}
                    component={ContactData}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.ingredients,
        price: state.totalPrice,
    };
};

export default connect(mapStateToProps, null)(Checkout);
