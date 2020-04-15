import React from "react";
import classes from "./NavigationItems.css";
import NavigationItem from "./NavigationItem/NavigationItem";
const NavigationItems = () => {
    return (
        <ul className={classes.NavigationItems}>
            <li>
                active
                <NavigationItem link="/" active>
                    Burger Builder
                </NavigationItem>
                <NavigationItem link="/">CHeckout</NavigationItem>
            </li>
        </ul>
    );
};

export default NavigationItems;
