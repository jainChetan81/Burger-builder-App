import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";

class ContactData extends Component {
    state = {
        name: "",
        address: {
            street: "",
            postalcode: "",
        },
        email: "",
    };
    render() {
        return (
            <div className={classes.ContactData}>
                <h4>Enter Your Data</h4>
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
                    <Button btnType="Success">Order</Button>
                </form>
            </div>
        );
    }
}

export default ContactData;
