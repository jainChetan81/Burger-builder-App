import React from "react";
import classes from "./DrawerToggle.css";

const DrawerToggle = (props) => {
    return (
        <div onClick={props.clicked} className={classes.DrawerToggle}>
            <div className=""></div>
            <div className=""></div>
            <div className=""></div>{" "}
        </div>
    );
};

export default DrawerToggle;
