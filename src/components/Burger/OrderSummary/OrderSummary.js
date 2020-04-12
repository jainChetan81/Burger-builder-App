import React from "react";
import Auxillary from "../../../hoc/Auxillary";
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
            <p>Continu eto Checkout </p>
        </Auxillary>
    );
}
