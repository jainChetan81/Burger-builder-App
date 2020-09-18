import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends Component {
    state = {
        name: "",
        address: {
            street: "",
            postalcode: "",
        },
        email: "",
        loading: false,
    };
    orderHandler = (e) => {
        e.preventDefault();
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: "chetan Jain",
                address: {
                    street: "old c1/36",
                    postalcode: "848125",
                    country: "India",
                },
                email: "jain.cj.chetan@gmail.com",
            },
            deliveryMethod: "fastest",
        };
        axios
            .post("/orders.json", order)
            .then((res) => {
                this.setState({ loading: false });
                this.props.history.push("/");
            })
            .catch((err) => this.setState({ loading: false }));
    };
    render() {
        return (
            <div className={classes.ContactData}>
                <h4>Enter Your Data</h4>
                {this.state.loading ? (
                    <Spinner />
                ) : (
                    <form>
                        <input
                            className={classes.Input}
                            type="text"
                            name="name"
                            placeholder="Your Name"
                        />
                        <input
                            className={classes.Input}
                            type="email"
                            name="email"
                            placeholder="Your Email"
                        />
                        <input
                            className={classes.Input}
                            type="text"
                            name="street"
                            placeholder="Your Street"
                        />
                        <input
                            className={classes.Input}
                            type="text"
                            name="postalcode"
                            placeholder="Postal Code"
                        />
                        <Button btnType="Success" clicked={this.orderHandler}>
                            Order
                        </Button>
                    </form>
                )}
            </div>
        );
    }
}

export default ContactData;
