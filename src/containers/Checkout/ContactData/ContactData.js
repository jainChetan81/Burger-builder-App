import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Your Name",
                },
                value: "",
                validation: { required: true },
                valid: false,
                touched: false,
            },
            street: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Your Street",
                },
                value: "",
                valid: false,
                validation: { required: true },
                touched: false,
            },
            zipcode: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "ZipCode",
                },
                value: "",
                valid: false,
                validation: {
                    required: true,
                    minLength: 4,
                    maxLength: 6,
                    numeric: true,
                },
                touched: false,
            },
            email: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Your E-Mail",
                },
                value: "",
                valid: false,
                validation: { required: true, email: true },
                touched: false,
            },
            deliveryMethod: {
                elementType: "select",
                elementConfig: {
                    options: [
                        { value: "fastest", displayValue: "Fastest" },
                        { value: "cheapest", displayValue: "Cheapest" },
                    ],
                },
                value: "fastest",
                valid: true,
                validation: { required: false },
            },
        },
        formIsValid: false,
        loading: false,
    };
    orderHandler = (e) => {
        e.preventDefault();
        this.setState({ loading: true });
        const formData = {};
        for (let formIdentifier in this.state.orderForm) {
            formData[formIdentifier] = this.state.orderForm[
                formIdentifier
            ].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
        };
        axios
            .post("/orders.json", order)
            .then((res) => {
                this.setState({ loading: false });
                this.props.history.push("/");
            })
            .catch((err) => this.setState({ loading: false }));
    };

    checkValidity = (value, rules) => {
        let isValid = true;
        if (!rules) return true;
        if (rules.required) isValid = value.trim() !== "" && isValid;
        if (rules.minLength)
            isValid = value.length >= rules.minLength && isValid;
        if (rules.maxLength)
            isValid = value.length <= rules.maxLength && isValid;
        if (rules.email) {
            const pattern = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            isValid = pattern.test(value) && isValid;
        }
        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid;
        }
        return isValid;
    };

    inputChangedHandler = (e, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm,
        };
        const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
        updatedFormElement.value = e.target.value;
        updatedFormElement.valid = this.checkValidity(
            updatedFormElement.value,
            updatedFormElement.validation
        );
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            console.log(updatedOrderForm[inputIdentifier]);
            formIsValid =
                updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({
            orderForm: updatedOrderForm,
            formIsValid: formIsValid,
        });
    };
    render() {
        let formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key],
            });
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter Your Data</h4>
                {this.state.loading ? (
                    <Spinner />
                ) : (
                    <form onSubmit={this.orderHandler}>
                        {formElementsArray.map((formElement) => (
                            <Input
                                key={formElement.id}
                                elementType={formElement.config.elementType}
                                elementConfig={formElement.config.elementConfig}
                                value={formElement.config.value}
                                valid={formElement.config.valid}
                                shouldValidate={
                                    formElement.config.validation.required
                                }
                                touched={formElement.config.touched}
                                changed={(e) =>
                                    this.inputChangedHandler(e, formElement.id)
                                }
                            />
                        ))}
                        <Button
                            btnType="Success"
                            disabled={!this.state.formIsValid}>
                            Order
                        </Button>
                    </form>
                )}
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

export default connect(mapStateToProps, null)(ContactData);
