import React from "react";
import classes from "./Burger.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients).map((igKey) => {
        return [...Array(props.ingredients[igKey])]
            .map((_, i) => {
                console.log("igKey iis : ", igKey, "is :", i);
                return <BurgerIngredient key={igKey + i} type={igKey} />;
            })
            .reduce((arr, el) => {
                return arr.concat(el); //todo: if values are zero then no array for each ingredient
            }, []);
        if (transformedIngredients.length === 0) {
            transformedIngredients = <p>Please Start Adding Ingredients</p>;
        }
    });
    console.log(
        "props in burger.js ",
        props,
        "transformed : ",
        transformedIngredients
    );
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};
export default burger;
