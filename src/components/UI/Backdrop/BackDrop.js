import React from "react";
import classes from "./BackDrop.css";

const backDrop = (props) => {
    console.log("props in backdrop.js :", props);
    return props.show ? (
        <div className={classes.BackDrop} onClick={props.clicked}></div>
    ) : null;
};
export default backDrop;
