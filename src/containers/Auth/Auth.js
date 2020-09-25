import React, { Component } from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import { connect } from "react-redux";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions";
import classes from "./Auth.css";
import { Redirect } from "react-router-dom";

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "Mail Address",
                },
                value: "",
                validation: { required: true, isEmail: true },
                valid: false,
                touched: false,
            },
            password: {
                elementType: "input",
                elementConfig: {
                    type: "password",
                    placeholder: "Password",
                },
                value: "",
                validation: { required: true, minLength: 6 },
                valid: false,
                touched: false,
            },
        },
        formValid: false,
        isSignUp: true,
    };
    componentDidMount() {
        if (!this.props.buildingBurger && this.props.authRedirectPath !== "/")
            this.props.onSetAuthRedirect();
    }

    switchAuthMode = () => {
        this.setState((prevState) => {
            return { isSignUp: !prevState.isSignUp };
        });
    };
    submitHandler = (e) => {
        const { email, password } = this.state.controls;
        e.preventDefault();
        this.props.onAuth(email.value, password.value, this.state.isSignUp);
    };
    checkValidity = (value, rules) => {
        let isValid = true;
        if (!rules) return true;
        if (rules.required) isValid = value.trim() !== "" && isValid;
        if (rules.minLength)
            isValid = value.length >= rules.minLength && isValid;
        if (rules.maxLength)
            isValid = value.length <= rules.maxLength && isValid;
        if (rules.isEmail) {
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
        const updatedControlForm = {
            ...this.state.controls,
        };
        const updatedFormElement = { ...updatedControlForm[inputIdentifier] };
        updatedFormElement.value = e.target.value;
        updatedFormElement.valid = this.checkValidity(
            updatedFormElement.value,
            updatedFormElement.validation
        );
        updatedFormElement.touched = true;
        updatedControlForm[inputIdentifier] = updatedFormElement;
        let formIsValid = true;
        for (let inputIdentifier in updatedControlForm) {
            formIsValid =
                updatedControlForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({
            controls: updatedControlForm,
            formIsValid: formIsValid,
        });
    };
    render() {
        let formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key],
            });
        }
        return (
            <div className={classes.Auth}>
                {this.props.isAuthenticated ? (
                    <Redirect to={this.props.authRedirectPath} />
                ) : null}
                <h4>{this.state.isSignUp ? "Sign Up" : "Sign IN"}</h4>
                {this.props.error ? (
                    <p style={{ color: "red" }}>{this.props.error.message}</p>
                ) : null}
                {this.props.loading ? (
                    <Spinner />
                ) : (
                    <form onSubmit={this.submitHandler}>
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
                            Submit
                        </Button>
                    </form>
                )}
                <Button clicked={this.switchAuthMode} btnType="Danger">
                    Switch To {this.state.isSignUp ? "Sign IN" : "Sign Up"}
                </Button>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        error: state.auth.error,
        loading: state.auth.loading,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirect,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password, isSignUp) =>
            dispatch(actions.auth(email, password, isSignUp)),
        onSetAuthRedirect: () => dispatch(actions.setAuthRedirect("/")),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(Auth, axios));
