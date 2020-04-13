import React from "react";
import Auxillary from "../../hoc/Auxillary";
import classes from "./Layout.css";
import ToolBar from "../Navigation/ToolBar/ToolBar";

export const Layout = (props) => {
    console.log(props);
    return (
        <Auxillary>
            <ToolBar />
            <main className={classes.content}>{props.children}</main>
        </Auxillary>
    );
};
