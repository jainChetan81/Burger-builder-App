import React from "react";
import classes from "./Order.css";

const Order = (props) => {
    const ingredient = [];
    for (let ingName in props.ingredients) {
        ingredient.push({ amount: props.ingredients[ingName], name: ingName });
    }
    const ingredientOutput = ingredient.map((ig) => (
        <span
            style={{
                textTransform: "capitalize",
                display: "inline-block",
                margin: "0 8px",
                border: "1px solid #ccc",
            }}
            key={ig.name}>
            {ig.name} ({ig.amount})
        </span>
    ));
    return (
        <div className={classes.Order}>
            <p>Ingredients :{ingredientOutput}</p>
            <p>
                Price :
                <strong>INR {Number.parseFloat(props.price).toFixed(2)}</strong>
                {/* //TODO:to pass number into string */}
            </p>
        </div>
    );
};

export default Order;
