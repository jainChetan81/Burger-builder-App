import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions";

class App extends Component {
    componentWillMount() {
        this.props.onAuthCheckState();
    }

    render() {
        return (
            <div>
                <Layout>
                    {this.props.isAuthenticated ? (
                        <Switch>
                            <Route exact path="/" component={BurgerBuilder} />
                            <Route path="/checkout" component={Checkout} />
                            <Route exact path="/orders" component={Orders} />
                            <Route exact path="/logout" component={Logout} />
                            <Redirect to="/" />
                        </Switch>
                    ) : (
                        <Switch>
                            <Route exact path="/" component={BurgerBuilder} />
                            <Route exact path="/auth" component={Auth} />
                            <Redirect to="/" />
                        </Switch>
                    )}
                </Layout>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onAuthCheckState: () => dispatch(actions.authCheckState()),
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
