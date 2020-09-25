import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actions from "../../../store/actions";

class Logout extends Component {
    componentDidMount() {
        this.props.onAuthLogout();
    }

    render() {
        return <Redirect to="/" />;
    }
}
// const mapStateToProps = (state) => {
//     return {
//         isAuthenticated: state.auth.token != null,
//     };
// };
const mapDispatchToProps = (dispatch) => {
    return {
        onAuthLogout: () => dispatch(actions.authLogout()),
    };
};

export default connect(null, mapDispatchToProps)(Logout);
