import React from "react";
import Auxillary from "../../hoc/Auxillary";
import classes from "./Layout.css";

export const Layout = (props) => {
    console.log(props);
    return (
        <Auxillary>
            <div className="">Toolbar,Sidebar,Backdrop </div>
            <main className={classes.content}>{props.children}</main>
        </Auxillary>
    );
};
