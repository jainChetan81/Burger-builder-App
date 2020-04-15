import React from "react";
import Auxillary from "../../hoc/Auxillary";
import classes from "./Layout.css";
import ToolBar from "../Navigation/ToolBar/ToolBar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

export const Layout = (props) => {
    console.log(props);
    return (
        <Auxillary>
            <ToolBar />
            <SideDrawer />
            <main className={classes.content}>{props.children}</main>
        </Auxillary>
    );
};
