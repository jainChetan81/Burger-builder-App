import burgerLogo from "../../assets/img/burger-logo.png";
import classes from "./Logo.css";
import React from "react";

const Logo = (props) => {
    return (
        <div>
            <img src={burgerLogo} alt="myBurger" className={classes.Logo} />
        </div>
    );
};

export default Logo;
