import React from "react";
import classes from "./NavigationItems.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = ({ isAuthenticated }) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" exact>
                Burger Builder
            </NavigationItem>
            {isAuthenticated ? (
                <NavigationItem link="/orders">Orders</NavigationItem>
            ) : null}
            {isAuthenticated ? (
                <NavigationItem link="/logout">Logout</NavigationItem>
            ) : (
                <NavigationItem link="/auth">Authenticate</NavigationItem>
            )}
        </ul>
    );
};

export default NavigationItems;
