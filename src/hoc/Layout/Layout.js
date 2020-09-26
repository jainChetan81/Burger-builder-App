import React, { Component } from "react";
import Auxillary from "../Auxillary/Auxillary";
import classes from "./Layout.css";
import ToolBar from "../../components/Navigation/ToolBar/ToolBar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import { connect } from "react-redux";

class Layout extends Component {
    state = {
        showSideDrawer: false,
    };

    sideDrawerClosedHandler = () => {
        this.setState({
            showSideDrawer: false,
        });
    };
    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {
                showSideDrawer: !prevState.showSideDrawer,
            };
        });
    };
    render() {
        return (
            <Auxillary>
                <ToolBar
                    isAuth={this.props.isAuthenticated}
                    drawerToggleClicked={this.sideDrawerToggleHandler}
                />
                <SideDrawer
                    isAuth={this.props.isAuthenticated}
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler}
                />
                <main className={classes.content}>{this.props.children}</main>
            </Auxillary>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token != null,
    };
};

export default connect(mapStateToProps, null)(Layout);
