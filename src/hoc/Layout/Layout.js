import React, { Component } from "react";
import Auxillary from "../Auxillary/Auxillary";
import classes from "./Layout.css";
import ToolBar from "../../components/Navigation/ToolBar/ToolBar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

export class Layout extends Component {
    state = {
        showSideDrawer: false,
    };
    sideDrawerClosedHandler = () => {
        this.setState({
            showSideDrawer: false,
        });
    };
    sideDrawerToggleHandler = () => {
        console.log("clicked");
        this.setState((prevState) => {
            return {
                showSideDrawer: !prevState.showSideDrawer,
            };
        });
    };
    render() {
        console.log("this.props in layout", this.prps);
        return (
            <Auxillary>
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler}
                />
                <ToolBar drawerToggleClicked={this.sideDrawerToggleHandler} />
                <main className={classes.content}>{this.props.children}</main>
            </Auxillary>
        );
    }
}
