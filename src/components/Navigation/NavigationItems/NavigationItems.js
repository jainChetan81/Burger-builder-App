import React from "react";
import classes from "./NavigationItems.css";
import NavigationItem from "./NavigationItem/NavigationItem";
const NavigationItems = () => {
    return (
        <ul className={classes.NavigationItems}>
            <li>
                <NavigationItem link="/" active>
                    Burger Builder
                </NavigationItem>
                <NavigationItem link="/">Checkout</NavigationItem>
            </li>
        </ul>
    );
};

export default NavigationItems;
