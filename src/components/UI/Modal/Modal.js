import React from "react";
import classes from "./Modal.css";
import Auxillary from "../../../hoc/Auxillary/Auxillary";
import BackDrop from "../Backdrop/BackDrop";

export default class Modal extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show;
    }
    componentWillUpdate(nextProps, nextState) {
        console.log();
    }

    render() {
        console.log("props in modal ", this.props);
        return (
            <Auxillary>
                <BackDrop
                    show={this.props.show}
                    clicked={this.props.modalClosed}
                />
                <div
                    className={classes.Modal}
                    style={{
                        transform: this.props.show
                            ? "translateY(0)"
                            : "translateY(-100vh)",
                        opacity: this.props.show ? "1" : "0",
                    }}>
                    {this.props.children}
                </div>
            </Auxillary>
        );
    }
}
