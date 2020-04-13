import React from "react";
import Auxillary from "../../../hoc/Auxillary";
import Button from "../../UI/Button/Button";

export default function orderSummary(props) {
    console.log("props in OrderSummary.js is  :", props);
    const ingredientSummary = Object.keys(props.ingredients).map((igKey) => {
        return (
            <li key={igKey}>
                <span style={{ textTransform: "capitalize" }}>{igKey} </span>:{" "}
                {props.ingredients[igKey]}
            </li>
        );
    });
    return (
        <Auxillary>
            <h2>Your Order</h2>
            <p>A deliciou sBurger with the following ingredients</p>
            <ul>{ingredientSummary}</ul>
            <p>
                <strong>Total Price: </strong>
                {props.price.toFixed(2)}
            </p>
            <p>Continue to Checkout </p>
            <Button btnType="Danger" clicked={props.purchaseCanceled}>
                CANCEL
            </Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>
                CONTINUE
            </Button>
        </Auxillary>
    );
}
